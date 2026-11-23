'use client';

import React, { useState } from 'react';
import { Search, Dumbbell, PlayCircle, Filter } from 'lucide-react';

const EXERCISES = [
  { id: '1', name: 'Barbell Back Squat', category: 'Legs', difficulty: 'Intermediate', muscle: 'Quadriceps, Glutes', equipment: 'Barbell, Rack' },
  { id: '2', name: 'Romanian Deadlift', category: 'Legs', difficulty: 'Intermediate', muscle: 'Hamstrings, Glutes', equipment: 'Barbell / Dumbbells' },
  { id: '3', name: 'Barbell Bench Press', category: 'Chest', difficulty: 'Intermediate', muscle: 'Pectoralis Major, Triceps', equipment: 'Barbell, Flat Bench' },
  { id: '4', name: 'Incline Dumbbell Press', category: 'Chest', difficulty: 'Beginner', muscle: 'Upper Chest', equipment: 'Dumbbells, Incline Bench' },
  { id: '5', name: 'Pull-Ups', category: 'Back', difficulty: 'Intermediate', muscle: 'Latissimus Dorsi', equipment: 'Pull-up Bar' },
  { id: '6', name: 'Seated Cable Row', category: 'Back', difficulty: 'Beginner', muscle: 'Rhomboids, Lats', equipment: 'Cable Machine' },
  { id: '7', name: 'Overhead Barbell Press', category: 'Shoulders', difficulty: 'Advanced', muscle: 'Deltoids, Core', equipment: 'Barbell' },
  { id: '8', name: 'Dumbbell Lateral Raise', category: 'Shoulders', difficulty: 'Beginner', muscle: 'Lateral Deltoid', equipment: 'Dumbbells' },
  { id: '9', name: 'Barbell Bicep Curl', category: 'Arms', difficulty: 'Beginner', muscle: 'Biceps Brachii', equipment: 'EZ Bar / Barbell' },
  { id: '10', name: 'Triceps Rope Pushdown', category: 'Arms', difficulty: 'Beginner', muscle: 'Triceps', equipment: 'Cable Station' },
  { id: '11', name: 'Plank Holds', category: 'Core', difficulty: 'Beginner', muscle: 'Rectus Abdominis, Transverse', equipment: 'Mat' },
  { id: '12', name: 'Hanging Leg Raise', category: 'Core', difficulty: 'Intermediate', muscle: 'Lower Abs, Hip Flexors', equipment: 'Pull-up Bar' },
];

export default function ExerciseLibraryPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Legs', 'Chest', 'Back', 'Shoulders', 'Arms', 'Core'];

  const filtered = EXERCISES.filter(ex => {
    const matchCat = category === 'All' || ex.category === category;
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase()) || ex.muscle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Exercise Library</h1>
        <p className="text-sm text-gray-500 mt-1">Movement guides, anatomy tags, and form standards</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search exercise, muscle target..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === c ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ex => (
          <div key={ex.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center relative mb-4 overflow-hidden group">
              <Dumbbell className="w-12 h-12 text-gray-300" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1.5 text-xs text-white font-medium bg-green-600 px-3 py-1.5 rounded-full">
                  <PlayCircle className="w-4 h-4" /> Demo Video
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                {ex.category}
              </span>
              <span className="text-xs text-gray-400 font-medium">{ex.difficulty}</span>
            </div>

            <h3 className="font-bold text-gray-900 text-base">{ex.name}</h3>
            <p className="text-xs text-gray-500 mt-1">
              <strong>Target:</strong> {ex.muscle}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              <strong>Equipment:</strong> {ex.equipment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
