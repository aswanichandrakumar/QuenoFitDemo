'use client';

import React, { useState } from 'react';
import { membershipPlans as initialPlans } from '@/data';
import type { MembershipPlan } from '@/types';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/lib/toast';
import { formatCurrency, generateId } from '@/lib/utils';
import { Plus, Edit2, CheckCircle } from 'lucide-react';

export default function MembershipsPage() {
  const [plans, setPlans] = useState<MembershipPlan[]>(initialPlans);
  const [showModal, setShowModal] = useState(false);
  const [editPlan, setEditPlan] = useState<MembershipPlan | null>(null);
  const [form, setForm] = useState({ name: '', duration: '1', price: '', features: '' });
  const { addToast } = useToast();

  const handleSave = () => {
    if (!form.name || !form.price) { addToast('Fill required fields', 'error'); return; }
    const planData = { name: form.name, duration: parseInt(form.duration), price: parseInt(form.price), features: form.features.split('\n').filter(Boolean), status: 'active' as const, memberCount: 0 };
    if (editPlan) {
      setPlans(prev => prev.map(p => p.id === editPlan.id ? { ...p, ...planData } : p));
      addToast('Plan updated', 'success');
    } else {
      setPlans(prev => [...prev, { id: `plan-${generateId()}`, gymId: 'gym-001', ...planData }]);
      addToast('Plan created', 'success');
    }
    setShowModal(false); setEditPlan(null);
  };

  const openEdit = (p: MembershipPlan) => { setForm({ name: p.name, duration: String(p.duration), price: String(p.price), features: p.features.join('\n') }); setEditPlan(p); setShowModal(true); };
  const openAdd = () => { setForm({ name: '', duration: '1', price: '', features: '' }); setEditPlan(null); setShowModal(true); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Membership Plans</h1>
        <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"><Plus className="w-4 h-4" />Create Plan</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{plan.name}</h3>
              <button onClick={() => openEdit(plan)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><Edit2 className="w-4 h-4" /></button>
            </div>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(plan.price)}</p>
            <p className="text-sm text-gray-500 mb-4">{plan.duration} month{plan.duration > 1 ? 's' : ''}</p>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />{f}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">{plan.memberCount} active members</p>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditPlan(null); }} title={editPlan ? 'Edit Plan' : 'Create Plan'}>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Plan Name *</label><input type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label><select value={form.duration} onChange={e => setForm(p => ({...p, duration: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"><option value="1">1 Month</option><option value="3">3 Months</option><option value="6">6 Months</option><option value="12">12 Months</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label><input type="number" value={form.price} onChange={e => setForm(p => ({...p, price: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label><textarea rows={4} value={form.features} onChange={e => setForm(p => ({...p, features: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 resize-none" /></div>
          <div className="flex justify-end gap-3"><button onClick={() => { setShowModal(false); setEditPlan(null); }} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button><button onClick={handleSave} className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700">Save</button></div>
        </div>
      </Modal>
    </div>
  );
}
