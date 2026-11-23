'use client';

import React, { useState } from 'react';
import { progressRecords, members } from '@/data';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, User } from 'lucide-react';

export default function TrainerProgressPage() {
  const [selectedMemberId, setSelectedMemberId] = useState('mb-001');

  const myMembers = members.filter(m => m.assignedTrainerId === 'tr-001' || m.assignedTrainer === 'Arjun Patel');
  const activeMember = members.find(m => m.id === selectedMemberId) || myMembers[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Member Progress Tracking</h1>
          <p className="text-sm text-gray-500 mt-1">Weight drop, BMI stabilization, and visual improvements</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Select Member:</label>
          <select
            value={selectedMemberId}
            onChange={e => setSelectedMemberId(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white font-medium"
          >
            {myMembers.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weight Trend Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Weight Over Time (kg) — {activeMember?.name}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressRecords}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#16A34A" strokeWidth={3} dot={{ fill: '#16A34A', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BMI Trend Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-800" />
            BMI Progression — {activeMember?.name}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressRecords}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="bmi" stroke="#064E3B" strokeWidth={3} dot={{ fill: '#064E3B', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Progress History Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Historical Checkpoints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Check Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Weight</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">BMI</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Body Fat %</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Trainer Notes</th>
              </tr>
            </thead>
            <tbody>
              {progressRecords.map(pr => (
                <tr key={pr.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{pr.date}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{pr.weight} kg</td>
                  <td className="px-4 py-3 text-gray-600">{pr.bmi}</td>
                  <td className="px-4 py-3 text-gray-600">{pr.bodyFat}%</td>
                  <td className="px-4 py-3 text-gray-500 italic">{pr.notes || 'Routine check verified'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
