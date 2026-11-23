'use client';

import React, { useState } from 'react';
import { members } from '@/data';
import type { Member } from '@/types';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';
import { formatDate } from '@/lib/utils';
import { Search, Eye, Dumbbell, Apple, Phone, Mail, User } from 'lucide-react';

export default function TrainerMembersPage() {
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const assigned = members.filter(m => m.assignedTrainerId === 'tr-001' || m.assignedTrainer === 'Arjun Patel');
  const filtered = assigned.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Assigned Members</h1>
          <p className="text-sm text-gray-500 mt-1">{assigned.length} members assigned to your training roster</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Member</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Contact</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Goal</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Weight & BMI</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Plan</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.memberId}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <p>{m.phone}</p>
                    <p className="text-xs text-gray-400">{m.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-medium">
                    {m.fitnessGoal || 'General Fitness'}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {m.weight} kg • BMI {m.bmi}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {m.membershipPlan}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedMember(m)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selectedMember} onClose={() => setSelectedMember(null)} title="Member Profile & Goals" size="lg">
        {selectedMember && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center font-bold text-lg text-green-700">
                {selectedMember.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedMember.name}</h3>
                <p className="text-sm text-gray-500">{selectedMember.email} • {selectedMember.phone}</p>
                <StatusBadge status={selectedMember.status} className="mt-1" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="text-xs text-gray-500">Weight</p>
                <p className="text-base font-bold text-gray-900">{selectedMember.weight} kg</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Height</p>
                <p className="text-base font-bold text-gray-900">{selectedMember.height} cm</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">BMI</p>
                <p className="text-base font-bold text-gray-900">{selectedMember.bmi}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-500">Fitness Goal</p>
                <p className="font-medium text-gray-800">{selectedMember.fitnessGoal || 'Weight Loss'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Membership Expiry</p>
                <p className="font-medium text-gray-800">{formatDate(selectedMember.membershipExpiry)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Gender</p>
                <p className="font-medium capitalize text-gray-800">{selectedMember.gender}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Joining Date</p>
                <p className="font-medium text-gray-800">{formatDate(selectedMember.joiningDate)}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
