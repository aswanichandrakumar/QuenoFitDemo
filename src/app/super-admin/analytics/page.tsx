'use client';

import React from 'react';
import { monthlyRevenue, gymRegistrationGrowth, subscriptionDistribution, gyms } from '@/data';
import { formatCurrency } from '@/lib/utils';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

const memberGrowth = [
  { name: 'Jan', members: 450 }, { name: 'Feb', members: 520 }, { name: 'Mar', members: 610 },
  { name: 'Apr', members: 720 }, { name: 'May', members: 850 }, { name: 'Jun', members: 920 },
  { name: 'Jul', members: 980 }, { name: 'Aug', members: 1050 }, { name: 'Sep', members: 1120 },
  { name: 'Oct', members: 1200 }, { name: 'Nov', members: 1310 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000)}k`} />
                <Tooltip formatter={(value: unknown) => [formatCurrency(Number(value) || 0), 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#16A34A" fill="#16A34A" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Member Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memberGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="members" stroke="#064E3B" strokeWidth={2} dot={{ fill: '#064E3B' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Gym Registrations by Month</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gymRegistrationGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="gyms" fill="#16A34A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Subscription Distribution</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={subscriptionDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {subscriptionDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {subscriptionDistribution.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} /><span className="text-xs text-gray-600">{s.name} ({s.value})</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* Gym Performance Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Gym Performance Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Gym</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">City</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Members</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Trainers</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Branches</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Plan</th>
              </tr>
            </thead>
            <tbody>
              {gyms.filter(g => g.status === 'active').map(g => (
                <tr key={g.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{g.name}</td>
                  <td className="px-4 py-3 text-gray-600">{g.city}</td>
                  <td className="px-4 py-3 text-gray-600">{g.memberCount}</td>
                  <td className="px-4 py-3 text-gray-600">{g.trainerCount}</td>
                  <td className="px-4 py-3 text-gray-600">{g.branches.length}</td>
                  <td className="px-4 py-3 capitalize text-gray-600">{g.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
