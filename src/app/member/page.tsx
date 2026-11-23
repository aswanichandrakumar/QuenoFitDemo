'use client';

import React from 'react';
import Link from 'next/link';
import StatsCard from '@/components/ui/StatsCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { members, workoutPlans, progressRecords } from '@/data';
import { formatDate } from '@/lib/utils';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { QrCode, Dumbbell, Apple, ArrowRight, CheckCircle2, Circle } from 'lucide-react';

export default function MemberDashboard() {
  const member = members[0]; // Ananya Verma (member@gymos.demo)
  const myWorkout = workoutPlans.find(w => w.memberId === 'mb-001') || workoutPlans[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {member.name}!</h1>
          <p className="text-sm text-gray-500 mt-1">FitZone Premium • Member ID: {member.memberId}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/member/qr-code"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
          >
            <QrCode className="w-4 h-4" /> My Pass QR
          </Link>
          <Link
            href="/member/workout"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            <Dumbbell className="w-4 h-4" /> Today&apos;s Workout
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard label="Membership Status" value="Active" icon="Award" color="green" />
        <StatsCard label="Expiry Date" value={formatDate(member.membershipExpiry)} icon="Calendar" color="blue" />
        <StatsCard label="Visits This Month" value="18 Days" icon="Activity" color="purple" change={12} changeLabel="vs last month" />
        <StatsCard label="Current Weight" value={`${member.weight || 60.5} kg`} icon="Target" color="green" change={-3.2} changeLabel="down 2kg" />
        <StatsCard label="Current BMI" value={member.bmi || 22.2} icon="Zap" color="teal" />
        <StatsCard label="Assigned Coach" value={member.assignedTrainer || 'Arjun Patel'} icon="UserCheck" color="orange" />
      </div>

      {/* Charts & Today's Schedule */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Fitness Progress Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Weight Transformation Progress</h3>
            <span className="text-xs text-green-700 bg-green-50 font-medium px-2.5 py-1 rounded-full">
              Goal: -5.5 kg Reached
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressRecords}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#16A34A" strokeWidth={3} dot={{ fill: '#16A34A', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Workout Quick Plan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Today&apos;s Workout</h3>
            <Link href="/member/workout" className="text-xs text-green-600 font-medium hover:text-green-700 flex items-center gap-0.5">
              Full Plan <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-3">{myWorkout.name}</p>

          <div className="space-y-2.5">
            {myWorkout.exercises.slice(0, 4).map(ex => (
              <div key={ex.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 text-xs">
                <div className="flex items-center gap-2">
                  {ex.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300" />
                  )}
                  <span className="font-medium text-gray-800">{ex.name}</span>
                </div>
                <span className="text-gray-500 font-medium">{ex.sets} × {ex.reps}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">Diet Target</span>
            <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
              1,800 kcal / day
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
