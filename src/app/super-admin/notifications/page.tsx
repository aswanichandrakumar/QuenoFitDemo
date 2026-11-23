'use client';

import React, { useState } from 'react';
import { notifications as initialNotifications } from '@/data';
import { Bell, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifications);
  const icons: Record<string, React.ReactNode> = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
  };

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <button onClick={markAllRead} className="text-sm text-green-600 font-medium hover:text-green-700">Mark all as read</button>
      </div>
      <div className="space-y-3">
        {notifs.map(n => (
          <div key={n.id} className={`bg-white rounded-xl border p-4 flex items-start gap-3 cursor-pointer hover:shadow-sm transition-shadow ${n.read ? 'border-gray-200' : 'border-green-200 bg-green-50/30'}`} onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}>
            {icons[n.type]}
            <div className="flex-1">
              <h3 className={`text-sm font-medium ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>{n.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{n.createdAt}</p>
            </div>
            {!n.read && <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />}
          </div>
        ))}
      </div>
    </div>
  );
}
