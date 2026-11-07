import React, { useState } from 'react';
import './index.css';

// Tipe data untuk navigasi modul
type ActiveTab = 'dashboard' | 'ssi_case' | 'ai_assistant' | 'reflection';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<string>('Faktor yang Memengaruhi Pergeseran Kesetimbangan');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Header Navigasi */}
      <header className="bg-indigo-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <span className="bg-indigo-600 p-2 rounded-lg text-xl font-bold">⚖️</span>
            <div>
              <h1 className="text-xl font-extrabold tracking-wide">EQUILIBRAIN</h1>
              <p className="text-xs text-indigo-200">AI-Integrated Chemical Equilibrium & SSI Learning Platform</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 sm:space-x-2 bg-indigo-950/50 p-1.5 rounded-xl border border-indigo-700/50">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-200 hover:text-white hover:bg-indigo-800/50'}`}
            >
              Modul
            </button>
            <button 
              onClick={() => setActiveTab('ssi_case')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'ssi_case' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-200 hover:text-white hover:bg-indigo-800/50'}`}
            >
              Isu Sosiosaintifik
            </button>
            <button 
              onClick={() => setActiveTab('ai_assistant')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'ai_assistant' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-200 hover:text-white hover:bg-indigo-800/50'}`}
            >
              Equilibra AI Guide
            </button>
            <button 
              onClick={() => setActiveTab('reflection')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'reflection' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-200 hover:text-white hover:bg-indigo-800/50'}`}
            >
              Refleksi Argumen
            </button>
          </nav>
        </div>
      </header>

      {/* Konten Utama Berdasarkan Tab */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Selamat Datang di Ruang Belajar EQUILIBRAIN</h2>
              <p className="text-slate-600">
                Pilih topik kesetimbangan kimia di bawah ini untuk memulai eksplorasi konsep berbasis masalah nyata dan panduan kecerdasan buatan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Konsep Dasar & Hukum Kesetimbangan", desc: "Memahami tetapan kesetimbangan (Kc dan Kp) melalui sistem dinamis.", status: "Selesai" },
                { title: "Faktor Pergeseran Kesetimbangan", desc: "Menganalisis pengaruh suhu, tekanan, volume, dan konsentrasi (Asas Le Chatelier).", status: "Sedang Dipelajari" },
                { title: "Aplikasi Industri & Lingkungan", desc: "Studi kasus pembuatan amonia (Proses Haber-Bosch) dan siklus karbon global.", status: "Belum Dimulai" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:border-indigo-500 transition-all">
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                      {item.status}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-3 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => { setSelectedTopic(item.title); setActiveTab('ssi_case'); }}
                    className="mt-6 w-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white font-medium py-2 rounded-xl transition-colors text-sm"
                  >
                    Mulai Belajar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ssi_case' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="border-b pb-4">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">Studi Kasus Kontekstual (SSI)</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">Dilema Lingkungan: Emisi Karbon & Siklus Karbon Global</h2>
            </div>
            <div className="prose text-slate-700 space-y-4">
              <p>
                Peningkatan kadar karbon dioksida ($CO_2$) di atmosfer berdampak langsung pada keseimbangan kimia lautan (pengasaman air laut). Bagaimana penerapan prinsip pergeseran kesetimbangan dapat menjelaskan fenomena larutnya gas $CO_2$ ke dalam air laut?
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm">
                $$CO_2(g) + H_2O(l) \rightleftharpoons H_2CO_3(aq) \rightleftharpoons H^+(aq) + HCO_3^-(aq)$$
              </div>
              <p>
                Diskusikan atau evaluasi argumen ilmiah Anda menggunakan pola argumentasi Toulmin (Claim, Data, Warrant, Backing) dengan bantuan fitur AI pendamping.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab('ai_assistant')}
                className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Konsultasi dengan Equilibra AI
              </button>
            </div>
          </div>
        )}

        {activeTab === 'ai_assistant' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[600px]">
            <div className="border-b pb-4 mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Equilibra AI Assistant</h2>
                <p className="text-xs text-slate-500">Tanyakan konsep kesetimbangan atau verifikasi argumen ilmiah Anda di sini.</p>
              </div>
              <span className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse" title="AI Ready"></span>
            </div>
            
            {/* Area Chat / Ruang Interaksi AI */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm shrink-0">AI</div>
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 max-w-[80%]">
                  Halo! Saya Equilibra AI. Ada bagian dari materi kesetimbangan kimia atau argumen sosiosaintifik yang ingin kita diskusikan hari ini?
                </div>
              </div>
            </div>

            {/* Input Chat */}
            <div className="mt-4 pt-4 border-t flex gap-2">
              <input 
                type="text" 
                placeholder="Ketik pertanyaan atau argumen Anda di sini..." 
                className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors text-sm">
                Kirim
              </button>
            </div>
          </div>
        )}

        {activeTab === 'reflection' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Refleksi Argumen (Toulmin's Pattern)</h2>
              <p className="text-slate-600 text-sm">Susun analisis argumen ilmiah Anda terkait isu kesetimbangan kimia.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">1. Klaim (Claim)</label>
                <input type="text" placeholder="Pernyataan kesimpulan Anda..." className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">2. Data / Bukti (Data)</label>
                <textarea rows={2} placeholder="Data atau fakta pendukung dari eksperimen / literatur..." className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">3. Jaminan (Warrant)</label>
                <textarea rows={2} placeholder="Alasan yang menghubungkan data dengan klaim..." className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"></textarea>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors text-sm shadow-sm">
                Simpan & Evaluasi dengan AI
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        EQUILIBRAIN &copy; 2026 &bull; Pembelajaran Kesetimbangan Kimia Berbasis AI & SSI
      </footer>
    </div>
  );
}
