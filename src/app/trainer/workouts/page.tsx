'use client';

import React, { useState } from 'react';
import { workoutPlans as initialPlans, members } from '@/data';
import type { WorkoutPlan, Exercise } from '@/types';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/lib/toast';
import { generateId } from '@/lib/utils';
import { Plus, Dumbbell, User, CheckCircle2, Circle, Trash2 } from 'lucide-react';

export default function TrainerWorkoutsPage() {
  const [plans, setPlans] = useState<WorkoutPlan[]>(initialPlans);
  const [showAdd, setShowAdd] = useState(false);
  const { addToast } = useToast();

  const myMembers = members.filter(m => m.assignedTrainerId === 'tr-001' || m.assignedTrainer === 'Arjun Patel');

  const [form, setForm] = useState({
    name: '',
    memberId: myMembers[0]?.id || 'mb-001',
    exercises: [
      { name: 'Barbell Squats', sets: 4, reps: 10, duration: '12 min', category: 'Legs' },
      { name: 'Dumbbell Bench Press', sets: 3, reps: 12, duration: '10 min', category: 'Chest' },
    ],
  });

  const addExerciseRow = () => {
    setForm(p => ({
      ...p,
      exercises: [...p.exercises, { name: '', sets: 3, reps: 10, duration: '8 min', category: 'General' }],
    }));
  };

  const removeExerciseRow = (index: number) => {
    setForm(p => ({
      ...p,
      exercises: p.exercises.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      addToast('Workout plan name is required', 'error');
      return;
    }
    const member = members.find(m => m.id === form.memberId) || myMembers[0];

    const newPlan: WorkoutPlan = {
      id: `wp-${generateId()}`,
      gymId: 'gym-001',
      name: form.name,
      trainerId: 'tr-001',
      trainerName: 'Arjun Patel',
      memberId: member.id,
      memberName: member.name,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      exercises: form.exercises.map((ex, i) => ({
        id: `ex-${generateId()}-${i}`,
        name: ex.name || 'Exercise',
        sets: Number(ex.sets) || 3,
        reps: Number(ex.reps) || 10,
        duration: ex.duration || '8 min',
        category: ex.category || 'General',
        completed: false,
      })),
    };

    setPlans(prev => [newPlan, ...prev]);
    setShowAdd(false);
    addToast('Workout plan created & assigned to ' + member.name, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assigned Workout Routines</h1>
          <p className="text-sm text-gray-500 mt-1">Design daily regimens and track completion</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
        >
          <Plus className="w-4 h-4" /> Create Routine
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {plans.map(wp => (
          <div key={wp.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{wp.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <User className="w-3.5 h-3.5" /> Assigned to: <span className="font-medium text-gray-700">{wp.memberName}</span>
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 rounded-full capitalize">
                {wp.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {wp.exercises.map(ex => (
                <div key={ex.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-800">{ex.name}</p>
                      <p className="text-xs text-gray-400">{ex.category}</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-600 font-medium">
                    {ex.sets} sets × {ex.reps} reps
                    <span className="text-gray-400 block font-normal">{ex.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Create New Workout Plan" size="lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Title *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Upper Body Hypertrophy"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Member</label>
            <select
              value={form.memberId}
              onChange={e => setForm(p => ({ ...p, memberId: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            >
              {myMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.fitnessGoal || 'Fitness'})</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Exercises</label>
              <button
                type="button"
                onClick={addExerciseRow}
                className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Exercise
              </button>
            </div>

            <div className="space-y-2">
              {form.exercises.map((ex, i) => (
                <div key={i} className="flex gap-2 items-center bg-gray-50 p-2 rounded-lg">
                  <input
                    type="text"
                    value={ex.name}
                    placeholder="Exercise name"
                    onChange={e => {
                      const val = e.target.value;
                      setForm(p => {
                        const copy = [...p.exercises];
                        copy[i].name = val;
                        return { ...p, exercises: copy };
                      });
                    }}
                    className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded text-xs bg-white"
                  />
                  <input
                    type="number"
                    value={ex.sets}
                    placeholder="Sets"
                    onChange={e => {
                      const val = Number(e.target.value);
                      setForm(p => {
                        const copy = [...p.exercises];
                        copy[i].sets = val;
                        return { ...p, exercises: copy };
                      });
                    }}
                    className="w-16 px-2 py-1.5 border border-gray-200 rounded text-xs bg-white"
                  />
                  <input
                    type="number"
                    value={ex.reps}
                    placeholder="Reps"
                    onChange={e => {
                      const val = Number(e.target.value);
                      setForm(p => {
                        const copy = [...p.exercises];
                        copy[i].reps = val;
                        return { ...p, exercises: copy };
                      });
                    }}
                    className="w-16 px-2 py-1.5 border border-gray-200 rounded text-xs bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeExerciseRow(i)}
                    className="p-1.5 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Assign Routine
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
