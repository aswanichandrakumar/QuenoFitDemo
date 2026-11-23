'use client';

import React, { useState } from 'react';
import { gyms } from '@/data';
import { useToast } from '@/lib/toast';
import { Building2, MapPin, Phone, Mail, Save } from 'lucide-react';

export default function GymProfilePage() {
  const gym = gyms[0];
  const [form, setForm] = useState({ name: gym.name, email: gym.email, phone: gym.phone, address: gym.address, city: gym.city, state: gym.state });
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gym Profile</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center"><Building2 className="w-8 h-8 text-green-600" /></div>
          <div><h2 className="text-xl font-bold text-gray-900">{form.name}</h2><p className="text-sm text-gray-500 capitalize">{gym.plan} Plan • {gym.status}</p></div>
        </div>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Gym Name</label><input type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><input type="text" value={form.address} onChange={e => setForm(p => ({...p, address: e.target.value}))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label><input type="text" value={form.city} onChange={e => setForm(p => ({...p, city: e.target.value}))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">State</label><input type="text" value={form.state} onChange={e => setForm(p => ({...p, state: e.target.value}))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>
          </div>
          <button onClick={() => addToast('Profile updated successfully', 'success')} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"><Save className="w-4 h-4" />Save Profile</button>
        </div>
      </div>
    </div>
  );
}
