import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, User, Phone, MapPin, School, Calendar, BookOpen, Users, Heart, Clipboard, Search } from 'lucide-react';

interface Props {
  whatsapp?: string;
  schoolName?: string;
}

export default function SPMBForm({ whatsapp = "62812345678", schoolName = "Sekolah" }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [regNumber, setRegNumber] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Save to Database
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save to database');
      
      const result = await response.json();
      setRegNumber(result.regNumber);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm"
      >
        <div className="w-20 h-20 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={40} />
        </div>
        
        <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4 tracking-tight">Pendaftaran Berhasil!</h2>
        <p className="text-stone-600 dark:text-stone-400 mb-10 max-w-md mx-auto leading-relaxed">
          Terima kasih telah mendaftar di <strong>{schoolName}</strong>. Data Anda telah kami terima dan sedang dalam proses verifikasi.
        </p>

        <div className="bg-stone-50 dark:bg-stone-950 p-8 rounded-xl border border-dashed border-stone-200 dark:border-stone-800 mb-10 max-w-sm mx-auto">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Nomor Pendaftaran Anda</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-mono font-bold text-stone-900 dark:text-stone-100 tracking-wider">
              {regNumber}
            </span>
            <button 
              onClick={() => {
                if (regNumber) navigator.clipboard.writeText(regNumber);
                alert('Nomor pendaftaran berhasil disalin!');
              }}
              className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg text-stone-400 transition-colors"
              title="Salin Nomor"
            >
              <Clipboard size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="/pendaftaran/status"
            className="w-full sm:w-auto px-8 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <Search size={16} /> Cek Status Pendaftaran
          </a>
          <button 
            onClick={() => setStatus('idle')}
            className="w-full sm:w-auto px-8 py-4 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 font-bold text-sm uppercase tracking-widest transition-all"
          >
            Kembali ke Form
          </button>
        </div>

        <p className="mt-12 text-xs text-stone-400 italic">
          * Harap simpan nomor pendaftaran di atas untuk mengecek status penerimaan Anda secara berkala.
        </p>
      </motion.div>
    );
  }

  const inputClasses = "w-full px-4 py-3.5 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100 focus:border-stone-900 outline-none transition-all dark:text-white placeholder:text-stone-300 text-sm";
  const labelClasses = "text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2 px-1 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-20">
      {/* SECTION 1: INFORMASI */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-5">
          <BookOpen size={18} className="text-stone-400" />
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-[0.2em]">Informasi Pendaftaran</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Tahun Pelajaran</label>
            <select name="tahun" required className={inputClasses}>
              <option value="2025/2026">2025/2026</option>
              <option value="2026/2027">2026/2027</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Jurusan Pilihan</label>
            <select name="jurusan" required className={inputClasses}>
              <option value="">Pilih Jurusan</option>
              <option value="IPA (MIPA)">IPA (MIPA)</option>
              <option value="IPS (IIS)">IPS (IIS)</option>
              <option value="Bahasa & Budaya">Bahasa & Budaya</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 2: DATA SISWA */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-5">
          <User size={18} className="text-stone-400" />
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-[0.2em]">Identitas Calon Siswa</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClasses}>Nama Lengkap</label>
            <input type="text" name="nama" required className={inputClasses} placeholder="Sesuai Ijazah" />
          </div>
          <div>
            <label className={labelClasses}>Nama Panggilan</label>
            <input type="text" name="panggilan" required className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Jenis Kelamin</label>
            <select name="jk" required className={inputClasses}>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Tempat Lahir</label>
            <input type="text" name="tempatLahir" required className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Tanggal Lahir</label>
            <input type="date" name="tglLahir" required className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Agama</label>
            <select name="agama" required className={inputClasses}>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Katolik">Katolik</option>
              <option value="Hindu">Hindu</option>
              <option value="Budha">Budha</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>No. WhatsApp Siswa</label>
            <input type="tel" name="waSiswa" required className={inputClasses} placeholder="08..." />
          </div>
        </div>
      </div>

      {/* SECTION 3: ASAL SEKOLAH */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-5">
          <School size={18} className="text-stone-400" />
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-[0.2em]">Riwayat Sekolah & Domisili</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Nama Sekolah Asal</label>
            <input type="text" name="asalSekolah" required className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Alamat Sekolah Asal</label>
            <input type="text" name="alamatSekolah" required className={inputClasses} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>Alamat Domisili Siswa</label>
            <textarea name="alamat" required rows={2} className={`${inputClasses} resize-none`}></textarea>
          </div>
        </div>
      </div>

      {/* PARENTS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
         {/* DATA AYAH */}
         <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-5">
              <Users size={18} className="text-stone-400" />
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-[0.2em]">Ayah Kandung</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className={labelClasses}>Nama Ayah</label>
                <input type="text" name="namaAyah" required className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Pekerjaan</label>
                <input type="text" name="kerjaAyah" required className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>No. Telp/WA</label>
                <input type="tel" name="telpAyah" required className={inputClasses} />
              </div>
            </div>
         </div>

         {/* DATA IBU */}
         <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-5">
              <Heart size={18} className="text-stone-400" />
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-[0.2em]">Ibu Kandung</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className={labelClasses}>Nama Ibu</label>
                <input type="text" name="namaIbu" required className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Pekerjaan</label>
                <input type="text" name="kerjaIbu" required className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>No. Telp/WA</label>
                <input type="tel" name="telpIbu" required className={inputClasses} />
              </div>
            </div>
         </div>
      </div>

      <div className="pt-10 flex flex-col items-center border-t border-stone-100 dark:border-stone-800">
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full md:w-auto md:px-16 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 py-4 rounded-lg font-bold text-base hover:bg-stone-800 dark:hover:bg-white transition-all shadow-md disabled:opacity-70"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} /> Memproses...
            </span>
          ) : (
            'Kirim Pendaftaran'
          )}
        </button>
        <p className="mt-4 text-[10px] text-stone-400 uppercase tracking-widest font-medium">
          * Seluruh data yang dikirim akan diproses oleh panitia PPDB
        </p>
      </div>
    </form>
  );
}
