'use client';

import React, { useState } from 'react';
import { members as initialMembers, trainers, membershipPlans } from '@/data';
import type { Member } from '@/types';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import StatusBadge from '@/components/ui/StatusBadge';
import { useToast } from '@/lib/toast';
import { formatDate, generateId } from '@/lib/utils';
import { Search, UserPlus, Edit2, Trash2, Eye, Filter, X } from 'lucide-react';

export default function MemberManagement() {
  const [membersList, setMembersList] = useState<Member[]>(initialMembers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [viewMember, setViewMember] = useState<Member | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { addToast } = useToast();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: string;
    address: string;
    membershipPlan: string;
    assignedTrainerId: string;
    fitnessGoal: string;
  }>({ name: '', email: '', phone: '', gender: 'male', dateOfBirth: '', address: '', membershipPlan: 'Monthly Plan', assignedTrainerId: 'tr-001', fitnessGoal: 'General Fitness' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filtered = membersList.filter(m => {
    const q = search.toLowerCase();
    const matchSearch = m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.phone.includes(q) || m.memberId.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Invalid email';
    if (!form.phone.trim()) errors.phone = 'Phone is required';
    if (!form.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = () => {
    if (!validateForm()) return;
    const trainer = trainers.find(t => t.id === form.assignedTrainerId)!;
    const now = new Date().toISOString().split('T')[0];
    const plan = membershipPlans.find(p => p.name === form.membershipPlan);
    const duration = plan?.duration || 1;
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + duration);

    const newMember: Member = {
      id: `mb-${generateId()}`,
      memberId: `FZ-${Date.now().toString().slice(-7)}`,
      gymId: 'gym-001',
      name: form.name,
      email: form.email,
      phone: form.phone,
      gender: form.gender,
      dateOfBirth: form.dateOfBirth,
      address: form.address,
      joiningDate: now,
      membershipPlan: form.membershipPlan,
      membershipStart: now,
      membershipExpiry: expiry.toISOString().split('T')[0],
      assignedTrainer: trainer.name,
      assignedTrainerId: trainer.id,
      status: 'active',
      weight: 70,
      height: 170,
      bmi: 24.2,
      fitnessGoal: form.fitnessGoal,
    };
    setMembersList(prev => [newMember, ...prev]);
    setShowAddModal(false);
    setForm({ name: '', email: '', phone: '', gender: 'male', dateOfBirth: '', address: '', membershipPlan: 'Monthly Plan', assignedTrainerId: 'tr-001', fitnessGoal: 'General Fitness' });
    addToast('Member added successfully', 'success');
  };

  const handleEdit = () => {
    if (!editMember || !validateForm()) return;
    const trainer = trainers.find(t => t.id === form.assignedTrainerId)!;
    setMembersList(prev => prev.map(m => m.id === editMember.id ? { ...m, name: form.name, email: form.email, phone: form.phone, gender: form.gender, dateOfBirth: form.dateOfBirth, address: form.address, membershipPlan: form.membershipPlan, assignedTrainer: trainer.name, assignedTrainerId: trainer.id, fitnessGoal: form.fitnessGoal } : m));
    setEditMember(null);
    addToast('Member updated successfully', 'success');
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setMembersList(prev => prev.filter(m => m.id !== deleteId));
    setDeleteId(null);
    addToast('Member deleted', 'success');
  };

  const openEdit = (m: Member) => {
    setForm({ name: m.name, email: m.email, phone: m.phone, gender: m.gender, dateOfBirth: m.dateOfBirth, address: m.address, membershipPlan: m.membershipPlan, assignedTrainerId: m.assignedTrainerId, fitnessGoal: m.fitnessGoal || 'General Fitness' });
    setEditMember(m);
  };

  const FormFields = () => (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 ${formErrors.name ? 'border-red-400' : 'border-gray-200'}`} />
          {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 ${formErrors.email ? 'border-red-400' : 'border-gray-200'}`} />
          {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input type="tel" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 ${formErrors.phone ? 'border-red-400' : 'border-gray-200'}`} />
          {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select value={form.gender} onChange={e => setForm(p => ({...p, gender: e.target.value as 'male'|'female'|'other'}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
          <input type="date" value={form.dateOfBirth} onChange={e => setForm(p => ({...p, dateOfBirth: e.target.value}))} className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 ${formErrors.dateOfBirth ? 'border-red-400' : 'border-gray-200'}`} />
          {formErrors.dateOfBirth && <p className="text-xs text-red-500 mt-1">{formErrors.dateOfBirth}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Membership Plan</label>
          <select value={form.membershipPlan} onChange={e => setForm(p => ({...p, membershipPlan: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
            {membershipPlans.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Trainer</label>
          <select value={form.assignedTrainerId} onChange={e => setForm(p => ({...p, assignedTrainerId: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
            {trainers.filter(t => t.status === 'active').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Goal</label>
          <select value={form.fitnessGoal} onChange={e => setForm(p => ({...p, fitnessGoal: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
            {['Weight Loss','Muscle Gain','General Fitness','Endurance','Flexibility','Body Recomposition'].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input type="text" value={form.address} onChange={e => setForm(p => ({...p, address: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-sm text-gray-500 mt-1">{membersList.length} total members</p>
        </div>
        <button onClick={() => { setForm({ name: '', email: '', phone: '', gender: 'male', dateOfBirth: '', address: '', membershipPlan: 'Monthly Plan', assignedTrainerId: 'tr-001', fitnessGoal: 'General Fitness' }); setFormErrors({}); setShowAddModal(true); }} className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
          <UserPlus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by name, email, phone, ID..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all','active','expired','frozen'].map(s => (
            <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }} className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${statusFilter === s ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Member ID</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">Phone</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">Plan</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">Expiry</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Actions</th>
            </tr></thead>
            <tbody>
              {paged.map(m => (
                <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{m.memberId}</td>
                  <td className="px-4 py-3"><div><p className="font-medium text-gray-900">{m.name}</p><p className="text-xs text-gray-500">{m.email}</p></div></td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{m.phone}</td>
                  <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{m.membershipPlan}</td>
                  <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{formatDate(m.membershipExpiry)}</td>
                  <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setViewMember(m)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteId(m.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <span className="text-sm text-gray-600">Page {page} of {totalPages} ({filtered.length} results)</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50">Prev</button>
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages} className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Member" size="lg">
        <FormFields />
        <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button><button onClick={handleAdd} className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700">Add Member</button></div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editMember} onClose={() => setEditMember(null)} title="Edit Member" size="lg">
        <FormFields />
        <div className="flex justify-end gap-3 mt-6"><button onClick={() => setEditMember(null)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button><button onClick={handleEdit} className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700">Save Changes</button></div>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={!!viewMember} onClose={() => setViewMember(null)} title="Member Profile" size="lg">
        {viewMember && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-500">Member ID</p><p className="font-medium font-mono">{viewMember.memberId}</p></div>
              <div><p className="text-xs text-gray-500">Name</p><p className="font-medium">{viewMember.name}</p></div>
              <div><p className="text-xs text-gray-500">Email</p><p className="font-medium">{viewMember.email}</p></div>
              <div><p className="text-xs text-gray-500">Phone</p><p className="font-medium">{viewMember.phone}</p></div>
              <div><p className="text-xs text-gray-500">Gender</p><p className="font-medium capitalize">{viewMember.gender}</p></div>
              <div><p className="text-xs text-gray-500">Date of Birth</p><p className="font-medium">{formatDate(viewMember.dateOfBirth)}</p></div>
              <div><p className="text-xs text-gray-500">Joining Date</p><p className="font-medium">{formatDate(viewMember.joiningDate)}</p></div>
              <div><p className="text-xs text-gray-500">Status</p><StatusBadge status={viewMember.status} /></div>
              <div><p className="text-xs text-gray-500">Membership Plan</p><p className="font-medium">{viewMember.membershipPlan}</p></div>
              <div><p className="text-xs text-gray-500">Expiry Date</p><p className="font-medium">{formatDate(viewMember.membershipExpiry)}</p></div>
              <div><p className="text-xs text-gray-500">Assigned Trainer</p><p className="font-medium">{viewMember.assignedTrainer}</p></div>
              <div><p className="text-xs text-gray-500">Fitness Goal</p><p className="font-medium">{viewMember.fitnessGoal}</p></div>
              <div><p className="text-xs text-gray-500">Weight</p><p className="font-medium">{viewMember.weight} kg</p></div>
              <div><p className="text-xs text-gray-500">Height</p><p className="font-medium">{viewMember.height} cm</p></div>
              <div><p className="text-xs text-gray-500">BMI</p><p className="font-medium">{viewMember.bmi}</p></div>
              <div><p className="text-xs text-gray-500">Address</p><p className="font-medium">{viewMember.address}</p></div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Member" message="Are you sure you want to delete this member? This action cannot be undone." confirmText="Delete" />
    </div>
  );
}
