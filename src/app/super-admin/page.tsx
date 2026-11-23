'use client';

import React from 'react';
import StatsCard from '@/components/ui/StatsCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { gyms, monthlyRevenue, gymRegistrationGrowth, subscriptionDistribution } from '@/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function SuperAdminDashboard() {
  const totalMembers = gyms.reduce((s, g) => s + g.memberCount, 0);
  const totalTrainers = gyms.reduce((s, g) => s + g.trainerCount, 0);
  const activeGyms = gyms.filter(g => g.status === 'active').length;
  const pendingGyms = gyms.filter(g => g.status === 'pending').length;

  const stats = [
    { label: 'Total Registered Gyms', value: gyms.length, change: 12, changeLabel: 'vs last month', icon: 'Building2', color: 'green' },
    { label: 'Active Gyms', value: activeGyms, change: 8, changeLabel: 'vs last month', icon: 'Building2', color: 'blue' },
    { label: 'Total Members', value: totalMembers.toLocaleString(), change: 15, changeLabel: 'vs last month', icon: 'Users', color: 'purple' },
    { label: 'Total Trainers', value: totalTrainers, change: 5, changeLabel: 'vs last month', icon: 'UserCheck', color: 'orange' },
    { label: 'Monthly Revenue', value: formatCurrency(350000), change: 18, changeLabel: 'vs last month', icon: 'DollarSign', color: 'green' },
    { label: 'Pending Approvals', value: pendingGyms, icon: 'Clock', color: 'yellow' },
  ];

  const recentGyms = [...gyms].sort((a, b) => b.registeredAt.localeCompare(a.registeredAt)).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of the entire GymOS platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={i} {...s} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" tickFormatter={v => `₹${(v/1000)}k`} />
                <Tooltip formatter={(value: unknown) => [formatCurrency(Number(value) || 0), 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#16A34A" fill="#16A34A" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gym Registration Growth */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Gym Registration Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gymRegistrationGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="gyms" fill="#064E3B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Subscription Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Subscription Distribution</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={subscriptionDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {subscriptionDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {subscriptionDistribution.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-gray-600">{s.name} ({s.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Gym Registrations</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 font-medium text-gray-500">Gym Name</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-500">Owner</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-500">City</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-500">Plan</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-500">Status</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentGyms.map(gym => (
                  <tr key={gym.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-medium text-gray-900">{gym.name}</td>
                    <td className="py-2.5 px-3 text-gray-600">{gym.owner}</td>
                    <td className="py-2.5 px-3 text-gray-600">{gym.city}</td>
                    <td className="py-2.5 px-3"><span className="capitalize text-gray-600">{gym.plan}</span></td>
                    <td className="py-2.5 px-3"><StatusBadge status={gym.status} /></td>
                    <td className="py-2.5 px-3 text-gray-600">{formatDate(gym.registeredAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
