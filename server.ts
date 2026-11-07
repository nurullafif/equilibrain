import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

/**
 * Server-side endpoint for Gemini AI Tutor
 * Strictly follows @google/genai guidelines with server-side API key handling
 */
app.post('/api/ai/chat', async (req, res) => {
  const { prompt, context, scaffoldLevel } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'GEMINI_API_KEY is not configured on the server' });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `Anda adalah CHEM-AI Tutor, guru dan mitra belajar kimia virtual berorientasi Sokratik di media pembelajaran EQUILIBRAIN (Fase F Kelas XI SMA).

PEDOMAN KUNCI JAWABAN:
1. JAWAB PERTANYAAN SISWA SECARA LANGSUNG, JELAS, DAN MENDIDIK:
   - Jelaskan konsep inti, mekanisme partikel, dan hubungan sebab-akibat kimiawi secara runtut dan ilmiah. Jangan hanya bertanya balik atau mengelak; berikan pemahaman konseptual yang kokoh terlebih dahulu.
   - Cantumkan persamaan reaksi kesetimbangan dengan tanda ⇌ (\u21CC) dan fasa zat jika relevan.
2. STANDAR FORMAT PENULISAN BAKU & SESUAI (MUTLAK):
   - Gunakan **bold** (huruf tebal) untuk konsep/istilah penting (**Asas Le Chatelier**, **kesetimbangan dinamis**, **tetapan kesetimbangan**, **reaksi endoterm**, **reaksi eksoterm**).
   - Gunakan *italic* (huruf miring) untuk variabel dan simbol ilmiah (*K*<sub>c</sub>, *K*<sub>p</sub>, *Q*<sub>c</sub>, *v*<sub>maju</sub>, *v*<sub>balik</sub>, *T*, *P*, *V*, *n*, Δ*H*, *E*<sub>a</sub>).
   - Gunakan subscript baku untuk rumus kimia (H₂O, CO₂, N₂, H₂, NH₃, SO₂, SO₃, CaCO₃, H₂CO₃, HCO₃⁻, CO₃²⁻, Ca²⁺, Fe³⁺, NO₂, N₂O₄, H⁺, OH⁻, H₃O⁺).
   - Gunakan superscript baku untuk rumus tetapan kesetimbangan (*K*<sub>c</sub> = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ atau [C]<sup>c</sup>[D]<sup>d</sup> / [A]<sup>a</sup>[B]<sup>b</sup>) dan notasi ilmiah (1,8 × 10⁻⁵). JANGAN gunakan carets ^ lagi.
3. MEMANTIK SISWA UNTUK BERTANYA LEBIH JAUH:
   - Sajikan jawaban konseptual secara tuntas dan rapi. JANGAN sertakan heading '💡 Pemicu Nalar' atau '💡 Pertanyaan Pemantik Lanjutan' di dalam teks reply.
   - Sediakan 3 butir pertanyaan lanjutan singkat dalam properti 'suggestedFollowUps' yang siap diklik siswa untuk melanjutkan diskusi.

Kembalikan respon DALAM FORMAT JSON berikut:
{
  "reply": "string uraian jawaban lengkap terformat rapi dengan pemantik lanjutan di bagian akhir",
  "socraticQuestions": ["pertanyaan pemantik 1", "pertanyaan pemantik 2"],
  "suggestedFollowUps": ["pertanyaan eksplorasi lanjutan 1", "pertanyaan eksplorasi lanjutan 2", "pertanyaan eksplorasi lanjutan 3"],
  "verificationTip": "tips singkat verifikasi ilmiah"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Topik Modul: ${context?.topicTitle || 'Kesetimbangan Kimia'}.
Pertanyaan Siswa: "${prompt}".
Tingkat Bantuan (Scaffold Level): ${scaffoldLevel || 1}.
Jawablah pertanyaan siswa dengan tuntas, lalu pantik siswa untuk bertanya lebih jauh!`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text || '{}';
    try {
      const parsed = JSON.parse(jsonText);
      return res.json(parsed);
    } catch {
      return res.json({
        reply: response.text || "Terima kasih atas pertanyaan Anda. Mari kita telaah konsep kesetimbangan kimia ini bersama.",
        socraticQuestions: [
          "Bagaimana Asas Le Chatelier menerangkan fenomena ini?",
          "Bukti data empiris apa yang dapat kita amati dari reaksi tersebut?"
        ],
        suggestedFollowUps: [
          "Jelaskan pengaruh suhu terhadap kesetimbangan",
          "Bagaimana cara membaca tetapan Kc dan Kp?"
        ],
        verificationTip: "Verifikasikan kesimpulan ini dengan data eksperimen dan asas kesetimbangan kimia."
      });
    }
  } catch (error: any) {
    console.error('Gemini API execution error:', error);
    const errorStr = (error?.message || error?.toString() || '').toLowerCase();
    const isQuota =
      error?.status === 429 ||
      errorStr.includes('429') ||
      errorStr.includes('quota') ||
      errorStr.includes('resource_exhausted') ||
      errorStr.includes('rate limit');

    if (isQuota) {
      return res.status(200).json({
        quotaExceeded: true,
        reply: "Maaf, kuota layanan AI saat ini sedang penuh. Silakan coba beberapa saat lagi atau gunakan fitur kalkulator kesetimbangan mandiri.",
        socraticQuestions: [
          "Dapatkah Anda menghitung pergeseran konsentrasi menggunakan tabel ICE mandiri?",
          "Bagaimana Asas Le Chatelier memprediksi arah pergeseran reaksi secara kualitatif?"
        ],
        suggestedFollowUps: [
          "Gunakan kalkulator ICE kesetimbangan mandiri",
          "Tinjau pergeseran reaksi menurut Asas Le Chatelier"
        ],
        verificationTip: "Gunakan fitur simulasi partikel atau kalkulator kesetimbangan kimia mandiri."
      });
    }

    return res.status(200).json({
      fallback: true,
      reply: "Layanan dialog AI sedang mengalihkan ke mode panduan mandiri. Silakan eksplorasi konsep kesetimbangan kimia atau ajukan pertanyaan spesifik topik modul.",
      socraticQuestions: [
        "Bagaimana arah pergeseran reaksi jika konsentrasi salah satu zat diubah?",
        "Mengapa kesetimbangan kimia bersifat dinamis?"
      ],
      suggestedFollowUps: [
        "Eksplorasi simulasi dinamika kesetimbangan",
        "Hitung nilai tetapan kesetimbangan Kc"
      ],
      verificationTip: "Verifikasikan pemahaman Anda dengan hukum kesetimbangan kimia resmi."
    });
  }
});

// Vite middleware for dev SPA serving
async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[EquiLearn] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
