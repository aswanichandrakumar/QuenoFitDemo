'use client';

import React, { useState } from 'react';
import { progressRecords as initialProgress } from '@/data';
import type { ProgressRecord } from '@/types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useToast } from '@/lib/toast';
import { calculateBMI, generateId } from '@/lib/utils';
import { TrendingUp, Plus, Target, Award } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function MemberProgressPage() {
  const [records, setRecords] = useState<ProgressRecord[]>(initialProgress);
  const [showAdd, setShowAdd] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const { addToast } = useToast();

  const handleAdd = () => {
    const w = parseFloat(newWeight);
    if (!w || isNaN(w)) {
      addToast('Please enter a valid weight in kg', 'error');
      return;
    }
    const bmi = calculateBMI(w, 165); // 165cm height
    const newRecord: ProgressRecord = {
      id: `pr-${generateId()}`,
      memberId: 'mb-001',
      date: new Date().toISOString().split('T')[0],
      weight: w,
      bmi,
      notes: newNotes || 'Self log',
    };
    setRecords(prev => [...prev, newRecord]);
    setShowAdd(false);
    setNewWeight('');
    setNewNotes('');
    addToast('Weight entry logged successfully!', 'success');
  };

  const latest = records[records.length - 1];
  const initial = records[0];
  const delta = (initial.weight - latest.weight).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transformation Progress</h1>
          <p className="text-sm text-gray-500 mt-1">Track body weight, BMI trends, and fitness checkpoints</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
        >
          <Plus className="w-4 h-4" /> Log Current Weight
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500 font-medium">Starting Weight</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{initial.weight} kg</p>
          <span className="text-xs text-gray-400 mt-1 block">July 1, 2024</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500 font-medium">Current Weight</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{latest.weight} kg</p>
          <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium inline-block mt-1">
            -{delta} kg total change
          </span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500 font-medium">Current BMI</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{latest.bmi}</p>
          <span className="text-xs text-gray-400 mt-1 block">Normal Healthy Range (18.5 - 24.9)</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Weight Progression Curve (kg)
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={records}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#16A34A" strokeWidth={3} dot={{ fill: '#16A34A', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Log Daily Weight">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Weight (kg) *</label>
            <input
              type="number"
              step="0.1"
              value={newWeight}
              onChange={e => setNewWeight(e.target.value)}
              placeholder="e.g. 59.2"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Reflection</label>
            <input
              type="text"
              value={newNotes}
              onChange={e => setNewNotes(e.target.value)}
              placeholder="e.g. Post morning cardio session"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
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
              onClick={handleAdd}
              className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Record Weight
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
