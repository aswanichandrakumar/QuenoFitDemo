'use client';

import React, { useState } from 'react';
import { members } from '@/data';
import { useToast } from '@/lib/toast';
import { User, Mail, Phone, MapPin, Save, Calendar, Target } from 'lucide-react';

export default function MemberProfilePage() {
  const member = members[0];
  const { addToast } = useToast();

  const [form, setForm] = useState({
    name: member.name,
    email: member.email,
    phone: member.phone,
    address: member.address,
    fitnessGoal: member.fitnessGoal || 'Weight Loss',
    emergencyContact: '+91 98765 00000',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Profile information updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Personal Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your contact info, preferences, and emergency contact</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center font-bold text-xl text-green-700">
              {form.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{form.name}</h2>
              <p className="text-xs text-gray-400 font-mono">Member ID: {member.memberId}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input
                type="tel"
                value={form.emergencyContact}
                onChange={e => setForm(p => ({ ...p, emergencyContact: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Fitness Goal</label>
            <select
              value={form.fitnessGoal}
              onChange={e => setForm(p => ({ ...p, fitnessGoal: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            >
              {['Weight Loss', 'Muscle Gain', 'General Fitness', 'Endurance', 'Flexibility'].map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={form.address}
              onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
