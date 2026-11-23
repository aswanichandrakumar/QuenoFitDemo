'use client';

import React from 'react';
import Link from 'next/link';
import StatsCard from '@/components/ui/StatsCard';
import { members, payments, monthlyRevenue, membershipDistribution, attendanceWeekly } from '@/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import StatusBadge from '@/components/ui/StatusBadge';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { UserPlus, Receipt, QrCode, Dumbbell } from 'lucide-react';

export default function GymAdminDashboard() {
  const activeMembers = members.filter(m => m.status === 'active').length;
  const expiredMembers = members.filter(m => m.status === 'expired').length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const recentMembers = [...members].slice(0, 5);
  const recentPayments = [...payments].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const stats = [
    { label: 'Total Members', value: members.length, change: 12, changeLabel: 'vs last month', icon: 'Users', color: 'green' },
    { label: 'Active Members', value: activeMembers, change: 8, changeLabel: 'vs last month', icon: 'UserCheck', color: 'blue' },
    { label: 'Expired Memberships', value: expiredMembers, icon: 'Clock', color: 'orange' },
    { label: "Today's Attendance", value: 87, change: 5, changeLabel: 'vs yesterday', icon: 'Activity', color: 'purple' },
    { label: 'Monthly Revenue', value: formatCurrency(320000), change: 18, changeLabel: 'vs last month', icon: 'DollarSign', color: 'green' },
    { label: 'Pending Payments', value: pendingPayments, icon: 'CreditCard', color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gym Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">FitZone Premium — Bangalore</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href="/gym-admin/members" className="flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"><UserPlus className="w-4 h-4" />Add Member</Link>
          <Link href="/gym-admin/payments" className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"><Receipt className="w-4 h-4" />Record Payment</Link>
          <Link href="/gym-admin/attendance" className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"><QrCode className="w-4 h-4" />Attendance</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => <StatsCard key={i} {...s} />)}
      </div>

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
          <h3 className="font-semibold text-gray-900 mb-4">Weekly Attendance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceWeekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#064E3B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Membership Distribution</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={membershipDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={5} dataKey="value">
                  {membershipDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {membershipDistribution.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} /><span className="text-xs text-gray-600">{s.name} ({s.value})</span></div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Members</h3>
          <div className="space-y-3">
            {recentMembers.map(m => (
              <div key={m.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.membershipPlan}</p>
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Payments</h3>
          <div className="space-y-3">
            {recentPayments.map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{p.memberName}</p>
                  <p className="text-xs text-gray-500">{formatDate(p.date)}</p>
                </div>
                <span className="text-sm font-semibold text-green-600">{formatCurrency(p.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
