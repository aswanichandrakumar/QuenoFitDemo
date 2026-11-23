'use client';

import React, { useState } from 'react';
import { supportTickets } from '@/data';
import StatusBadge from '@/components/ui/StatusBadge';
import { useToast } from '@/lib/toast';
import { formatDate } from '@/lib/utils';

export default function SupportPage() {
  const [tickets, setTickets] = useState(supportTickets);
  const { addToast } = useToast();

  const updateStatus = (id: string, status: 'in-progress' | 'resolved' | 'closed') => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    addToast(`Ticket marked as ${status}`, 'success');
  };

  const priorityColor: Record<string, string> = { low: 'text-green-600', medium: 'text-yellow-600', high: 'text-red-600' };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
      <div className="space-y-4">
        {tickets.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{t.subject}</h3>
                <p className="text-sm text-gray-500 mt-1">by {t.userName} • {formatDate(t.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium capitalize ${priorityColor[t.priority]}`}>{t.priority}</span>
                <StatusBadge status={t.status} />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{t.message}</p>
            <div className="flex gap-2">
              {t.status === 'open' && <button onClick={() => updateStatus(t.id, 'in-progress')} className="px-3 py-1.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">Mark In Progress</button>}
              {(t.status === 'open' || t.status === 'in-progress') && <button onClick={() => updateStatus(t.id, 'resolved')} className="px-3 py-1.5 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200">Resolve</button>}
              {t.status !== 'closed' && <button onClick={() => updateStatus(t.id, 'closed')} className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Close</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
