'use client';

import React, { useState } from 'react';
import { assessments as initialAssessments, members } from '@/data';
import type { Assessment } from '@/types';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/lib/toast';
import { formatDate, calculateBMI, generateId } from '@/lib/utils';
import { Plus, ClipboardCheck, Activity, Target } from 'lucide-react';

export default function TrainerAssessmentsPage() {
  const [assessmentsList, setAssessments] = useState<Assessment[]>(initialAssessments);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const { addToast } = useToast();

  const myMembers = members.filter(m => m.assignedTrainerId === 'tr-001' || m.assignedTrainer === 'Arjun Patel');

  const [form, setForm] = useState({
    memberId: myMembers[0]?.id || 'mb-001',
    weight: '62',
    height: '165',
    chest: '86',
    waist: '68',
    hips: '94',
    biceps: '28',
    thighs: '54',
    fitnessGoal: 'Weight Loss',
    notes: '',
  });

  const handleSave = () => {
    const member = members.find(m => m.id === form.memberId) || myMembers[0];
    const w = parseFloat(form.weight) || 60;
    const h = parseFloat(form.height) || 165;
    const bmi = calculateBMI(w, h);

    const newAssessment: Assessment = {
      id: `as-${generateId()}`,
      memberId: member.id,
      memberName: member.name,
      trainerId: 'tr-001',
      date: new Date().toISOString().split('T')[0],
      weight: w,
      height: h,
      bmi,
      chest: parseFloat(form.chest) || 0,
      waist: parseFloat(form.waist) || 0,
      hips: parseFloat(form.hips) || 0,
      biceps: parseFloat(form.biceps) || 0,
      thighs: parseFloat(form.thighs) || 0,
      fitnessGoal: form.fitnessGoal,
      notes: form.notes || 'Routine physical fitness assessment recorded.',
    };

    setAssessments(prev => [newAssessment, ...prev]);
    setShowAdd(false);
    addToast('Assessment recorded successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Member Fitness Assessments</h1>
          <p className="text-sm text-gray-500 mt-1">Track body metrics, composition, BMI and progress</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
        >
          <Plus className="w-4 h-4" /> Record Assessment
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessmentsList.map(a => (
          <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-base">{a.memberName}</h3>
                <p className="text-xs text-gray-500">{formatDate(a.date)}</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 rounded-full">
                BMI {a.bmi}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-3 text-xs bg-gray-50 p-3 rounded-lg">
              <div><span className="text-gray-400">Weight:</span> <strong className="text-gray-700">{a.weight} kg</strong></div>
              <div><span className="text-gray-400">Height:</span> <strong className="text-gray-700">{a.height} cm</strong></div>
              <div><span className="text-gray-400">Waist:</span> <strong className="text-gray-700">{a.waist} cm</strong></div>
              <div><span className="text-gray-400">Chest:</span> <strong className="text-gray-700">{a.chest} cm</strong></div>
            </div>

            <p className="text-xs text-gray-600 mb-4 line-clamp-2 italic">&ldquo;{a.notes}&rdquo;</p>

            <button
              onClick={() => setSelectedAssessment(a)}
              className="w-full py-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              View Full Measurements
            </button>
          </div>
        ))}
      </div>

      {/* Record Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="New Fitness Assessment" size="lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Member *</label>
            <select
              value={form.memberId}
              onChange={e => setForm(p => ({ ...p, memberId: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            >
              {myMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.memberId})</option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
              <input
                type="number"
                step="0.1"
                value={form.weight}
                onChange={e => setForm(p => ({ ...p, weight: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm) *</label>
              <input
                type="number"
                value={form.height}
                onChange={e => setForm(p => ({ ...p, height: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Chest (cm)</label>
              <input
                type="number"
                value={form.chest}
                onChange={e => setForm(p => ({ ...p, chest: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Waist (cm)</label>
              <input
                type="number"
                value={form.waist}
                onChange={e => setForm(p => ({ ...p, waist: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Hips (cm)</label>
              <input
                type="number"
                value={form.hips}
                onChange={e => setForm(p => ({ ...p, hips: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Biceps (cm)</label>
              <input
                type="number"
                value={form.biceps}
                onChange={e => setForm(p => ({ ...p, biceps: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Goal</label>
            <input
              type="text"
              value={form.fitnessGoal}
              onChange={e => setForm(p => ({ ...p, fitnessGoal: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trainer Assessment Notes</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
              placeholder="Observation, improvements, recommendations..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
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
              Save Assessment
            </button>
          </div>
        </div>
      </Modal>

      {/* View Detail Modal */}
      <Modal isOpen={!!selectedAssessment} onClose={() => setSelectedAssessment(null)} title="Assessment Breakdown" size="md">
        {selectedAssessment && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{selectedAssessment.memberName}</h3>
              <p className="text-xs text-gray-500">{formatDate(selectedAssessment.date)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 p-4 rounded-xl">
              <div><span className="text-gray-500">Weight:</span> <span className="font-semibold">{selectedAssessment.weight} kg</span></div>
              <div><span className="text-gray-500">Height:</span> <span className="font-semibold">{selectedAssessment.height} cm</span></div>
              <div><span className="text-gray-500">BMI:</span> <span className="font-semibold">{selectedAssessment.bmi}</span></div>
              <div><span className="text-gray-500">Body Fat:</span> <span className="font-semibold">{selectedAssessment.bodyFat || 22}%</span></div>
              <div><span className="text-gray-500">Chest:</span> <span className="font-semibold">{selectedAssessment.chest} cm</span></div>
              <div><span className="text-gray-500">Waist:</span> <span className="font-semibold">{selectedAssessment.waist} cm</span></div>
              <div><span className="text-gray-500">Hips:</span> <span className="font-semibold">{selectedAssessment.hips} cm</span></div>
              <div><span className="text-gray-500">Biceps:</span> <span className="font-semibold">{selectedAssessment.biceps} cm</span></div>
              <div><span className="text-gray-500">Thighs:</span> <span className="font-semibold">{selectedAssessment.thighs} cm</span></div>
              <div><span className="text-gray-500">Goal:</span> <span className="font-semibold">{selectedAssessment.fitnessGoal}</span></div>
            </div>
            <div className="p-3 border border-gray-100 rounded-lg bg-green-50/50">
              <p className="text-xs font-semibold text-green-900 mb-1">Trainer Remarks</p>
              <p className="text-sm text-gray-700">{selectedAssessment.notes}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
