'use client';

import React, { useState } from 'react';
import { trainers as initialTrainers } from '@/data';
import Modal from '@/components/ui/Modal';
import StatusBadge from '@/components/ui/StatusBadge';
import { useToast } from '@/lib/toast';
import { formatCurrency, generateId } from '@/lib/utils';
import { Search, UserPlus, Edit2, Eye, Star, Users, Award } from 'lucide-react';

export default function TrainersPage() {
  const [trainersList, setTrainers] = useState(initialTrainers);
  const [search, setSearch] = useState('');
  const [viewTrainer, setViewTrainer] = useState<typeof initialTrainers[0] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', specialization: 'Weight Training', experience: '2', salary: '25000' });
  const { addToast } = useToast();

  const filtered = trainersList.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.specialization.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!form.name || !form.email) { addToast('Fill required fields', 'error'); return; }
    setTrainers(prev => [{ id: `tr-${generateId()}`, gymId: 'gym-001', name: form.name, email: form.email, phone: form.phone, specialization: form.specialization, experience: parseInt(form.experience), assignedMembers: 0, rating: 4.5, status: 'active', joiningDate: new Date().toISOString().split('T')[0], salary: parseInt(form.salary), certifications: ['Certified Personal Trainer'] }, ...prev]);
    setShowAdd(false); addToast('Trainer added', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Trainer Management</h1>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"><UserPlus className="w-4 h-4" />Add Trainer</button>
      </div>
      <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search trainers..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">{t.name.split(' ').map(n=>n[0]).join('')}</div>
                <div><h3 className="font-semibold text-gray-900">{t.name}</h3><p className="text-xs text-gray-500">{t.specialization}</p></div>
              </div>
              <StatusBadge status={t.status} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="bg-gray-50 rounded-lg p-2"><p className="text-lg font-bold text-gray-900">{t.assignedMembers}</p><p className="text-xs text-gray-500">Members</p></div>
              <div className="bg-gray-50 rounded-lg p-2"><p className="text-lg font-bold text-gray-900">{t.experience}y</p><p className="text-xs text-gray-500">Exp</p></div>
              <div className="bg-gray-50 rounded-lg p-2"><div className="flex items-center justify-center gap-0.5"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /><span className="text-lg font-bold text-gray-900">{t.rating}</span></div><p className="text-xs text-gray-500">Rating</p></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setViewTrainer(t)} className="flex-1 px-3 py-2 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-1"><Eye className="w-3.5 h-3.5" />View</button>
              <button onClick={() => { setTrainers(prev => prev.map(x => x.id === t.id ? {...x, status: x.status === 'active' ? 'inactive' : 'active'} : x)); addToast('Status updated', 'success'); }} className="flex-1 px-3 py-2 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200">Toggle Status</button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!viewTrainer} onClose={() => setViewTrainer(null)} title="Trainer Details" size="md">
        {viewTrainer && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div><p className="text-gray-500">Name</p><p className="font-medium">{viewTrainer.name}</p></div>
              <div><p className="text-gray-500">Email</p><p className="font-medium">{viewTrainer.email}</p></div>
              <div><p className="text-gray-500">Phone</p><p className="font-medium">{viewTrainer.phone}</p></div>
              <div><p className="text-gray-500">Specialization</p><p className="font-medium">{viewTrainer.specialization}</p></div>
              <div><p className="text-gray-500">Experience</p><p className="font-medium">{viewTrainer.experience} years</p></div>
              <div><p className="text-gray-500">Salary</p><p className="font-medium">{formatCurrency(viewTrainer.salary)}/mo</p></div>
              <div><p className="text-gray-500">Rating</p><p className="font-medium flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{viewTrainer.rating}</p></div>
              <div><p className="text-gray-500">Assigned Members</p><p className="font-medium">{viewTrainer.assignedMembers}</p></div>
            </div>
            <div><p className="text-sm text-gray-500 mb-1">Certifications</p><div className="flex flex-wrap gap-2">{viewTrainer.certifications.map((c,i) => <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium flex items-center gap-1"><Award className="w-3 h-3" />{c}</span>)}</div></div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Trainer">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label><select value={form.specialization} onChange={e => setForm(p => ({...p, specialization: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm">{['Weight Training','Yoga','CrossFit','Cardio','HIIT','Pilates','Boxing','Functional Training'].map(s => <option key={s}>{s}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Experience (yrs)</label><input type="number" value={form.experience} onChange={e => setForm(p => ({...p, experience: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
          </div>
          <div className="flex justify-end gap-3"><button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button><button onClick={handleAdd} className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700">Add Trainer</button></div>
        </div>
      </Modal>
    </div>
  );
}
