'use client';

import React, { useState } from 'react';
import { gymClasses as initialClasses } from '@/data';
import StatusBadge from '@/components/ui/StatusBadge';
import { useToast } from '@/lib/toast';
import { Calendar, Clock, Users, User } from 'lucide-react';

export default function ClassesPage() {
  const [classes, setClasses] = useState(initialClasses);
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Group Classes</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full">{cls.category}</span>
              </div>
              <StatusBadge status={cls.status} />
            </div>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2"><User className="w-3.5 h-3.5" />{cls.trainerName}</div>
              <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{cls.schedule}</div>
              <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{cls.time} • {cls.duration} min</div>
              <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" />{cls.enrolled}/{cls.capacity} enrolled</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }} />
            </div>
            <button onClick={() => { setClasses(prev => prev.map(c => c.id === cls.id ? { ...c, enrolled: Math.min(c.capacity, c.enrolled + 1) } : c)); addToast('Booking added!', 'success'); }} disabled={cls.enrolled >= cls.capacity} className="w-full py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {cls.enrolled >= cls.capacity ? 'Class Full' : 'Book Slot'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
