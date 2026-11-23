'use client';

import React from 'react';
import { members, assessments } from '@/data';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BarChart3, Award, TrendingUp, CheckCircle2 } from 'lucide-react';

const PERFORMANCE_DATA = [
  { name: 'Ananya Verma', sessions: 22, attendanceRate: 92, weightLoss: 5.5 },
  { name: 'Rohan Singh', sessions: 20, attendanceRate: 88, weightLoss: 2.0 },
  { name: 'Kavya Sharma', sessions: 18, attendanceRate: 85, weightLoss: 4.2 },
  { name: 'Arjun Kumar', sessions: 24, attendanceRate: 96, weightLoss: 1.5 },
  { name: 'Varun Patel', sessions: 16, attendanceRate: 78, weightLoss: 3.0 },
];

export default function TrainerReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Trainee Performance Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Review member engagement, consistency, and outcome delivery</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            Monthly Attended Sessions
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="sessions" fill="#16A34A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-800" />
            Weight Change / Milestone Achieved (kg)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="weightLoss" fill="#064E3B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Trainee Roster Summary */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Member Performance Scorecard</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Trainee</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Sessions Completed</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Attendance Rate</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Net Weight Delta</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">Coach Grade</th>
              </tr>
            </thead>
            <tbody>
              {PERFORMANCE_DATA.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{row.name}</td>
                  <td className="px-4 py-3 text-gray-700">{row.sessions} sessions</td>
                  <td className="px-4 py-3 text-green-700 font-semibold">{row.attendanceRate}%</td>
                  <td className="px-4 py-3 text-gray-600 font-medium">-{row.weightLoss} kg</td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs font-bold px-2.5 py-1 bg-green-100 text-green-800 rounded-full">
                      Exceeding Target
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
