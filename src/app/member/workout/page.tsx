'use client';

import React, { useState } from 'react';
import { workoutPlans } from '@/data';
import type { Exercise } from '@/types';
import { useToast } from '@/lib/toast';
import { Dumbbell, CheckCircle2, Circle, Clock, Flame } from 'lucide-react';

export default function MemberWorkoutPage() {
  const plan = workoutPlans[0]; // Beginner Full Body for Ananya
  const [exercises, setExercises] = useState<Exercise[]>(plan.exercises);
  const { addToast } = useToast();

  const toggleComplete = (id: string) => {
    setExercises(prev =>
      prev.map(ex => {
        if (ex.id === id) {
          const newState = !ex.completed;
          addToast(newState ? `Completed ${ex.name}! Great job! 💪` : `Marked ${ex.name} pending`, 'info');
          return { ...ex, completed: newState };
        }
        return ex;
      })
    );
  };

  const completedCount = exercises.filter(e => e.completed).length;
  const progressPercent = Math.round((completedCount / exercises.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{plan.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Assigned by Coach {plan.trainerName} • Tap exercises as you complete each set
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200">
          <div className="text-right">
            <span className="text-xs text-gray-400 block font-medium">Session Progress</span>
            <span className="text-sm font-bold text-green-700">{completedCount} of {exercises.length} Completed</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-green-100 flex items-center justify-center font-bold text-xs text-green-700">
            {progressPercent}%
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {exercises.map(ex => (
          <div
            key={ex.id}
            onClick={() => toggleComplete(ex.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              ex.completed
                ? 'bg-green-50/50 border-green-200 text-gray-700'
                : 'bg-white border-gray-200 hover:border-green-300 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              {ex.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300 flex-shrink-0" />
              )}
              <div>
                <h3 className={`font-semibold text-base ${ex.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {ex.name}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600 mt-1 inline-block">
                  {ex.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-right">
              <div>
                <span className="text-xs text-gray-400 block">Sets × Reps</span>
                <span className="text-sm font-bold text-gray-900">{ex.sets} × {ex.reps}</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs text-gray-400 block">Duration</span>
                <span className="text-sm font-medium text-gray-700">{ex.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
