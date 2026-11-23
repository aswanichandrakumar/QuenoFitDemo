'use client';

import React from 'react';
import { payments, gyms } from '@/data';
import StatusBadge from '@/components/ui/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/utils';
import StatsCard from '@/components/ui/StatsCard';

export default function BillingPage() {
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const recentPayments = [...payments].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 15);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Billing & Transactions</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Revenue" value={formatCurrency(totalRevenue)} icon="DollarSign" color="green" change={18} changeLabel="vs last month" />
        <StatsCard label="Pending Amount" value={formatCurrency(pendingAmount)} icon="Clock" color="yellow" />
        <StatsCard label="Total Transactions" value={payments.length} icon="CreditCard" color="blue" />
        <StatsCard label="Active Gyms" value={gyms.filter(g => g.status === 'active').length} icon="Building2" color="purple" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Invoice</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Member</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Amount</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Method</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map(p => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-600">{p.invoiceNumber}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{p.memberName}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(p.amount)}</td>
                <td className="px-4 py-3 capitalize text-gray-600">{p.method.replace('_', ' ')}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(p.date)}</td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
