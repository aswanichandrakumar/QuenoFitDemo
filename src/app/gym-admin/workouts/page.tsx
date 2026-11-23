'use client';

import React from 'react';
import { workoutPlans } from '@/data';
import StatusBadge from '@/components/ui/StatusBadge';
import { Dumbbell, User, CheckCircle, Circle } from 'lucide-react';

export default function WorkoutsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Workout Plans</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        {workoutPlans.map(wp => (
          <div key={wp.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center"><Dumbbell className="w-5 h-5 text-green-600" /></div>
                <div><h3 className="font-semibold text-gray-900">{wp.name}</h3><p className="text-xs text-gray-500">Trainer: {wp.trainerName}</p></div>
              </div>
              <StatusBadge status={wp.status} />
            </div>
            <p className="text-sm text-gray-600 mb-4 flex items-center gap-1"><User className="w-3.5 h-3.5" />Assigned to: {wp.memberName}</p>
            <div className="space-y-2">
              {wp.exercises.map(ex => (
                <div key={ex.id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-gray-50">
                  {ex.completed ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-gray-300" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{ex.name}</p>
                    <p className="text-xs text-gray-500">{ex.sets} sets × {ex.reps} reps • {ex.duration} • {ex.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
