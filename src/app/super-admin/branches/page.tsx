'use client';

import React from 'react';
import { gyms } from '@/data';
import StatusBadge from '@/components/ui/StatusBadge';
import { GitBranch, MapPin, Users, Phone } from 'lucide-react';

export default function BranchManagement() {
  const allBranches = gyms.flatMap(g => g.branches.map(b => ({ ...b, gymName: g.name })));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Branch Management</h1>
        <p className="text-sm text-gray-500 mt-1">{allBranches.length} branches across all gyms</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allBranches.map(branch => (
          <div key={branch.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{branch.name}</h3>
                  <p className="text-xs text-gray-500">{branch.gymName}</p>
                </div>
              </div>
              <StatusBadge status={branch.status} />
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{branch.address}, {branch.city}</div>
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{branch.phone}</div>
              <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" />{branch.memberCount} members</div>
              <div className="text-xs text-gray-400">Manager: {branch.managerName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
