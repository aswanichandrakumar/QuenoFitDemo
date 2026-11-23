'use client';

import React from 'react';
import { attendance } from '@/data';
import { formatDate } from '@/lib/utils';
import StatsCard from '@/components/ui/StatsCard';
import { CalendarCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function MemberAttendancePage() {
  const memberAttendance = attendance.filter(a => a.memberId === 'mb-001' || a.memberName.includes('Ananya'));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Log</h1>
        <p className="text-sm text-gray-500 mt-1">Review check-in history, duration, and monthly streak</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatsCard label="Check-ins This Month" value="18 Days" icon="CalendarCheck" color="green" change={10} changeLabel="streak active" />
        <StatsCard label="Average Time in Gym" value="65 mins" icon="Clock" color="blue" />
        <StatsCard label="Check-in Success Rate" value="100%" icon="Award" color="purple" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Recent Check-In History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Check In Time</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Check Out Time</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Verification Method</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {memberAttendance.slice(0, 15).map(a => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{formatDate(a.date)}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">{a.checkIn}</td>
                  <td className="px-4 py-3 text-gray-600">{a.checkOut || '08:15 AM'}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                      Turnstile QR
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Completed
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
