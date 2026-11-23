'use client';

import React, { useState } from 'react';
import { attendance as initialAttendance, members } from '@/data';
import { useToast } from '@/lib/toast';
import { formatDate, generateId } from '@/lib/utils';
import StatsCard from '@/components/ui/StatsCard';
import { QrCode, Search, UserCheck, Clock, Users, CalendarCheck } from 'lucide-react';

export default function AttendancePage() {
  const [records, setRecords] = useState(initialAttendance);
  const [scanInput, setScanInput] = useState('');
  const [search, setSearch] = useState('');
  const { addToast } = useToast();

  const today = new Date().toISOString().split('T')[0];
  const todayRecords = records.filter(r => r.date === today || r.date === '2024-11-21');

  const handleScan = () => {
    const member = members.find(m => m.memberId === scanInput || m.name.toLowerCase().includes(scanInput.toLowerCase()));
    if (!member) { addToast('Member not found', 'error'); return; }
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const existing = records.find(r => r.memberId === member.id && r.date === today && !r.checkOut);
    if (existing) {
      setRecords(prev => prev.map(r => r.id === existing.id ? { ...r, checkOut: timeStr } : r));
      addToast(`${member.name} checked out at ${timeStr}`, 'success');
    } else {
      setRecords(prev => [{ id: `att-${generateId()}`, gymId: 'gym-001', memberId: member.id, memberName: member.name, date: today, checkIn: timeStr, method: 'qr' }, ...prev]);
      addToast(`${member.name} checked in at ${timeStr}`, 'success');
    }
    setScanInput('');
  };

  const recentRecords = records.filter(r => {
    if (!search) return true;
    return r.memberName.toLowerCase().includes(search.toLowerCase());
  }).slice(0, 20);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Today's Check-ins" value={todayRecords.length} icon="UserCheck" color="green" />
        <StatsCard label="Currently In Gym" value={todayRecords.filter(r => !r.checkOut).length} icon="Users" color="blue" />
        <StatsCard label="Checked Out" value={todayRecords.filter(r => r.checkOut).length} icon="Clock" color="purple" />
        <StatsCard label="Total Records" value={records.length} icon="CalendarCheck" color="orange" />
      </div>

      {/* QR Scanner Simulation */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center"><QrCode className="w-5 h-5 text-green-600" /></div>
          <div><h3 className="font-semibold text-gray-900">QR Scanner / Manual Entry</h3><p className="text-xs text-gray-500">Enter member ID or name to simulate check-in/out</p></div>
        </div>
        <div className="flex gap-3">
          <input type="text" value={scanInput} onChange={e => setScanInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleScan()} placeholder="Enter member ID (e.g. FZ-2024001) or name..." className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
          <button onClick={handleScan} className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2"><UserCheck className="w-4 h-4" />Scan</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-gray-400">Quick test:</span>
          {['FZ-2024001', 'FZ-2024002', 'Ananya'].map(v => (
            <button key={v} onClick={() => { setScanInput(v); }} className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-600">{v}</button>
          ))}
        </div>
      </div>

      {/* Attendance Log */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Recent Attendance</h3>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-48" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Member</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Check In</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Check Out</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Method</th>
            </tr></thead>
            <tbody>
              {recentRecords.map(r => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{r.memberName}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(r.date)}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">{r.checkIn}</td>
                  <td className="px-4 py-3 text-gray-600">{r.checkOut || <span className="text-orange-500 font-medium">In Gym</span>}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.method === 'qr' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{r.method.toUpperCase()}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
