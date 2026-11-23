'use client';

import React, { useState } from 'react';
import { subscriptions } from '@/data';
import StatusBadge from '@/components/ui/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Search, CreditCard, RefreshCw } from 'lucide-react';
import { useToast } from '@/lib/toast';

export default function SubscriptionManagement() {
  const [subs, setSubs] = useState(subscriptions);
  const [filter, setFilter] = useState('all');
  const { addToast } = useToast();

  const filtered = subs.filter(s => filter === 'all' || s.status === filter);
  const totalRevenue = subs.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
          <p className="text-sm text-gray-500 mt-1">Active MRR: {formatCurrency(totalRevenue)}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', 'active', 'expired', 'cancelled'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filter === s ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Gym</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Plan</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Amount</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Start Date</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">End Date</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Auto Renew</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(sub => (
              <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{sub.gymName}</td>
                <td className="px-4 py-3 capitalize text-gray-600">{sub.plan}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(sub.amount)}/mo</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(sub.startDate)}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(sub.endDate)}</td>
                <td className="px-4 py-3">{sub.autoRenew ? <span className="text-green-600 font-medium">Yes</span> : <span className="text-gray-400">No</span>}</td>
                <td className="px-4 py-3"><StatusBadge status={sub.status} /></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => { setSubs(prev => prev.map(s => s.id === sub.id ? { ...s, autoRenew: !s.autoRenew } : s)); addToast('Auto-renew toggled', 'success'); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="Toggle Renew">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
