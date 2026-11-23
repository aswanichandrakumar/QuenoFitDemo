'use client';

import React from 'react';
import { monthlyRevenue, attendanceWeekly, membershipDistribution } from '@/data';
import { formatCurrency } from '@/lib/utils';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

const memberGrowth = [
  { name: 'Jan', count: 80 }, { name: 'Feb', count: 95 }, { name: 'Mar', count: 108 },
  { name: 'Apr', count: 115 }, { name: 'May', count: 125 }, { name: 'Jun', count: 130 },
  { name: 'Jul', count: 138 }, { name: 'Aug', count: 142 }, { name: 'Sep', count: 148 },
  { name: 'Oct', count: 150 }, { name: 'Nov', count: 155 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6"><h3 className="font-semibold text-gray-900 mb-4">Revenue Report</h3><div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={monthlyRevenue}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000)}k`} /><Tooltip formatter={(v: unknown) => [formatCurrency(Number(v) || 0), 'Revenue']} /><Area type="monotone" dataKey="revenue" stroke="#16A34A" fill="#16A34A" fillOpacity={0.1} strokeWidth={2} /></AreaChart></ResponsiveContainer></div></div>
        <div className="bg-white rounded-xl border border-gray-200 p-6"><h3 className="font-semibold text-gray-900 mb-4">Attendance Report</h3><div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={attendanceWeekly}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey="count" fill="#064E3B" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></div>
        <div className="bg-white rounded-xl border border-gray-200 p-6"><h3 className="font-semibold text-gray-900 mb-4">Member Growth</h3><div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={memberGrowth}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Line type="monotone" dataKey="count" stroke="#16A34A" strokeWidth={2} dot={{ fill: '#16A34A' }} /></LineChart></ResponsiveContainer></div></div>
        <div className="bg-white rounded-xl border border-gray-200 p-6"><h3 className="font-semibold text-gray-900 mb-4">Membership Distribution</h3><div className="h-52"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={membershipDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={5} dataKey="value">{membershipDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div><div className="flex flex-wrap justify-center gap-3 mt-2">{membershipDistribution.map((s, i) => (<div key={i} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} /><span className="text-xs text-gray-600">{s.name} ({s.value})</span></div>))}</div></div>
      </div>
    </div>
  );
}
