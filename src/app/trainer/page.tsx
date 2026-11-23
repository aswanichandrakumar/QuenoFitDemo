'use client';

import React from 'react';
import Link from 'next/link';
import StatsCard from '@/components/ui/StatsCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { members, assessments, workoutPlans } from '@/data';
import { formatDate } from '@/lib/utils';
import { Dumbbell, Users, ClipboardCheck, Calendar, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export default function TrainerDashboard() {
  const myMembers = members.filter(m => m.assignedTrainerId === 'tr-001');
  const myAssessments = assessments.filter(a => a.trainerId === 'tr-001');

  const todaySessions = [
    { time: '07:00 AM', member: 'Ananya Verma', type: 'Personal Training (Weight Loss)', status: 'completed' },
    { time: '09:00 AM', member: 'Rohan Singh', type: 'Hypertrophy & Strength', status: 'completed' },
    { time: '04:00 PM', member: 'Kavya Sharma', type: 'HIIT Conditioning', status: 'upcoming' },
    { time: '05:30 PM', member: 'Arjun Kumar', type: 'Deadlift & Squat Form Check', status: 'upcoming' },
    { time: '07:00 PM', member: 'Varun Patel', type: 'Endurance & Mobility', status: 'upcoming' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trainer Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Arjun Patel • Indiranagar Branch</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/trainer/assessments"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
          >
            <ClipboardCheck className="w-4 h-4" /> New Assessment
          </Link>
          <Link
            href="/trainer/workouts"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            <Dumbbell className="w-4 h-4" /> Plan Workout
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Assigned Members" value={myMembers.length || 18} icon="Users" color="green" change={5} changeLabel="this month" />
        <StatsCard label="Today's Sessions" value={5} icon="Calendar" color="blue" />
        <StatsCard label="Completed Sessions" value={2} icon="Award" color="purple" />
        <StatsCard label="Assessments Due" value={3} icon="ClipboardList" color="orange" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Today&apos;s Training Schedule</h3>
            <span className="text-xs bg-green-50 text-green-700 font-medium px-2.5 py-1 rounded-full">
              5 Sessions Scheduled
            </span>
          </div>
          <div className="space-y-3">
            {todaySessions.map((session, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center font-semibold text-xs text-green-700">
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-gray-900">{session.member}</p>
                      <span className="text-xs text-gray-500 font-medium">{session.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{session.type}</p>
                  </div>
                </div>
                <div>
                  {session.status === 'completed' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Done
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> Up Next
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Active Members Quick List */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Active Trainees</h3>
            <Link href="/trainer/members" className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-0.5">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {myMembers.slice(0, 5).map(m => (
              <div key={m.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.fitnessGoal || 'General Fitness'}</p>
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
