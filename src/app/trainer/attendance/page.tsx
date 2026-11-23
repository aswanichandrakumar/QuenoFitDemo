'use client';

import React, { useState } from 'react';
import { attendance, members } from '@/data';
import { formatDate } from '@/lib/utils';
import { Search, CalendarCheck, CheckCircle2, Clock } from 'lucide-react';

export default function TrainerAttendancePage() {
  const [search, setSearch] = useState('');

  const myMembers = members.filter(m => m.assignedTrainerId === 'tr-001' || m.assignedTrainer === 'Arjun Patel');
  const myMemberIds = new Set(myMembers.map(m => m.id));

  const trainerAttendance = attendance.filter(a => myMemberIds.has(a.memberId));
  const filtered = trainerAttendance.filter(a =>
    a.memberName.toLowerCase().includes(search.toLowerCase()) ||
    a.date.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trainee Gym Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">Verify training consistency and workout check-ins</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Filter by member name or date (YYYY-MM)..."
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
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Check In</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Check Out</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Method</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 20).map(a => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{a.memberName}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(a.date)}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">{a.checkIn}</td>
                  <td className="px-4 py-3 text-gray-600">{a.checkOut || 'In Workout'}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {a.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Attended
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
