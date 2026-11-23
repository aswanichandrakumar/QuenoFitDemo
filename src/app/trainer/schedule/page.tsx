'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Plus } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/lib/toast';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const INITIAL_SCHEDULE = [
  { id: '1', day: 'Monday', time: '06:30 AM - 07:30 AM', member: 'Ananya Verma', type: 'Weight Loss & Core' },
  { id: '2', day: 'Monday', time: '08:00 AM - 09:00 AM', member: 'Rohan Singh', type: 'Strength & Hypertrophy' },
  { id: '3', day: 'Monday', time: '05:00 PM - 06:00 PM', member: 'Kavya Sharma', type: 'HIIT Conditioning' },
  { id: '4', day: 'Tuesday', time: '07:00 AM - 08:00 AM', member: 'Arjun Kumar', type: 'Deadlift & Squat Form' },
  { id: '5', day: 'Tuesday', time: '06:00 PM - 07:00 PM', member: 'Varun Patel', type: 'Endurance Program' },
  { id: '6', day: 'Wednesday', time: '06:30 AM - 07:30 AM', member: 'Ananya Verma', type: 'Upper Body Tone' },
  { id: '7', day: 'Wednesday', time: '08:00 AM - 09:00 AM', member: 'Rohan Singh', type: 'Push Day Routine' },
  { id: '8', day: 'Thursday', time: '07:00 AM - 08:00 AM', member: 'Arjun Kumar', type: 'Bench & Overhead Press' },
  { id: '9', day: 'Friday', time: '06:30 AM - 07:30 AM', member: 'Ananya Verma', type: 'Cardio & Circuit' },
  { id: '10', day: 'Friday', time: '05:00 PM - 06:00 PM', member: 'Kavya Sharma', type: 'Full Body Burn' },
  { id: '11', day: 'Saturday', time: '09:00 AM - 10:00 AM', member: 'Open Slot', type: 'Group Mobility Session' },
];

export default function TrainerSchedulePage() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAdd, setShowAdd] = useState(false);
  const { addToast } = useToast();

  const [form, setForm] = useState({
    day: 'Monday',
    time: '07:00 AM - 08:00 AM',
    member: '',
    type: 'Personal Training',
  });

  const handleAdd = () => {
    if (!form.member.trim()) {
      addToast('Member name is required', 'error');
      return;
    }
    setSchedule(prev => [...prev, { id: Date.now().toString(), ...form }]);
    setShowAdd(false);
    addToast('Training slot scheduled successfully', 'success');
  };

  const daySessions = schedule.filter(s => s.day === selectedDay);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Weekly Training Timetable</h1>
          <p className="text-sm text-gray-500 mt-1">Manage personal coaching slots and recurring member appointments</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
        >
          <Plus className="w-4 h-4" /> Book Session Slot
        </button>
      </div>

      {/* Week Day Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {WEEK_DAYS.map(day => {
          const count = schedule.filter(s => s.day === day).length;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedDay === day
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {day}
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                selectedDay === day ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sessions for Selected Day */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {daySessions.map(slot => (
          <div key={slot.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-green-300 transition-colors">
            <div className="flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full w-fit mb-3">
              <Clock className="w-3.5 h-3.5 text-green-600" />
              {slot.time}
            </div>
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              {slot.member}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{slot.type}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Book Training Slot">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Day of Week</label>
            <select
              value={form.day}
              onChange={e => setForm(p => ({ ...p, day: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            >
              {WEEK_DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
            <input
              type="text"
              value={form.time}
              onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
              placeholder="e.g. 06:30 AM - 07:30 AM"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Member Name *</label>
            <input
              type="text"
              value={form.member}
              onChange={e => setForm(p => ({ ...p, member: e.target.value }))}
              placeholder="e.g. Ananya Verma"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Target / Type</label>
            <input
              type="text"
              value={form.type}
              onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
              placeholder="e.g. Squat & Mobility Form"
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
              Confirm Slot
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
