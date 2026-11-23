'use client';

import React from 'react';
import { gyms } from '@/data';
import StatusBadge from '@/components/ui/StatusBadge';
import { GitBranch, MapPin, Users, Phone } from 'lucide-react';

export default function GymBranchesPage() {
  const gym = gyms[0];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Branches</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {gym.branches.map(b => (
          <div key={b.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3"><div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center"><GitBranch className="w-5 h-5 text-green-600" /></div><div><h3 className="font-semibold text-gray-900">{b.name}</h3><p className="text-xs text-gray-500">Manager: {b.managerName}</p></div></div>
              <StatusBadge status={b.status} />
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{b.address}, {b.city}</div>
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{b.phone}</div>
              <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" />{b.memberCount} members</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
