import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, Check, X, Clock, ExternalLink, Search, Users } from 'lucide-react';

interface Registration {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  data: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reg_number?: string;
}

export default function RegistrationTable() {
  const [data, setData] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/registrations');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRecord = async (id: number) => {
    if (!confirm('Hapus data ini selamanya?')) return;
    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    (item.whatsapp && item.whatsapp.includes(search))
  );

  const stats = {
    total: data.length,
    pending: data.filter(d => d.status === 'pending').length,
    approved: data.filter(d => d.status === 'approved').length,
    rejected: data.filter(d => d.status === 'rejected').length,
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 text-stone-400">
      <Loader2 className="animate-spin mb-4" />
      <p className="text-sm font-medium">Memuat data pendaftaran...</p>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-600 dark:bg-blue-700 p-6 rounded-xl border-none shadow-lg shadow-blue-500/20 flex items-center gap-4 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Users className="text-white" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest opacity-80">Total Pendaftar</p>
            <p className="text-3xl font-bold leading-none mt-1">{stats.total}</p>
          </div>
        </div>

        <div className="bg-amber-500 dark:bg-amber-600 p-6 rounded-xl border-none shadow-lg shadow-amber-500/20 flex items-center gap-4 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Clock className="text-white" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-100 uppercase tracking-widest opacity-80">Pending</p>
            <p className="text-3xl font-bold leading-none mt-1">{stats.pending}</p>
          </div>
        </div>

        <div className="bg-emerald-600 dark:bg-emerald-700 p-6 rounded-xl border-none shadow-lg shadow-emerald-500/20 flex items-center gap-4 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Check className="text-white" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest opacity-80">Diterima</p>
            <p className="text-3xl font-bold leading-none mt-1">{stats.approved}</p>
          </div>
        </div>

        <div className="bg-rose-600 dark:bg-rose-700 p-6 rounded-xl border-none shadow-lg shadow-rose-500/20 flex items-center gap-4 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <X className="text-white" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-rose-100 uppercase tracking-widest opacity-80">Ditolak</p>
            <p className="text-3xl font-bold leading-none mt-1">{stats.rejected}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari nama atau WhatsApp..." 
              className="w-full pl-10 pr-4 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-sm outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-white transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={fetchData} className="text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest">Refresh Data</button>
        </div>

        <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="px-6 py-4 font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-[10px]">Tgl Masuk</th>
                  <th className="px-6 py-4 font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-[10px]">No. Reg</th>
                  <th className="px-6 py-4 font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-[10px]">Nama Lengkap</th>
                  <th className="px-6 py-4 font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-[10px]">WhatsApp</th>
                  <th className="px-6 py-4 font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-[10px]">Status</th>
                  <th className="px-6 py-4 font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-[10px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-stone-400">Tidak ada data ditemukan</td>
                  </tr>
                ) : filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-900/20 transition-colors">
                    <td className="px-6 py-4 text-stone-500 whitespace-nowrap text-xs">
                      {new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] font-bold text-stone-400">
                      {item.reg_number || '-'}
                    </td>
                    <td className="px-6 py-4 font-bold text-stone-900 dark:text-stone-100">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">
                      <a href={`https://wa.me/${item.whatsapp}`} target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                        {item.whatsapp} <ExternalLink size={10} />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                        item.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        item.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(item.id, 'approved')} className="p-1.5 hover:bg-green-100 rounded-lg text-green-600 transition-colors"><Check size={16} /></button>
                            <button onClick={() => updateStatus(item.id, 'rejected')} className="p-1.5 hover:bg-red-100 rounded-lg text-red-600 transition-colors"><X size={16} /></button>
                          </>
                        )}
                        <button onClick={() => deleteRecord(item.id)} className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
