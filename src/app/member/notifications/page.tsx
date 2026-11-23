'use client';

import React, { useState } from 'react';
import { notifications as initialNotifications } from '@/data';
import { Bell, CheckCircle, AlertTriangle, Info, Check } from 'lucide-react';
import { useToast } from '@/lib/toast';

export default function MemberNotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifications);
  const { addToast } = useToast();

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'success');
  };

  const icons: Record<string, React.ReactNode> = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications & Alerts</h1>
          <p className="text-sm text-gray-500 mt-1">Gym broadcasts, workout updates and expiry reminders</p>
        </div>
        <button
          onClick={markAllRead}
          className="flex items-center gap-1 text-sm text-green-600 font-medium hover:text-green-700"
        >
          <Check className="w-4 h-4" /> Mark all read
        </button>
      </div>

      <div className="space-y-3">
        {notifs.map(n => (
          <div
            key={n.id}
            onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
            className={`bg-white rounded-xl border p-4 flex items-start gap-3.5 transition-colors cursor-pointer ${
              n.read ? 'border-gray-200 opacity-80' : 'border-green-200 bg-green-50/20 shadow-sm'
            }`}
          >
            {icons[n.type] || <Bell className="w-5 h-5 text-green-600" />}
            <div className="flex-1">
              <h3 className={`text-sm font-semibold ${n.read ? 'text-gray-800' : 'text-gray-900'}`}>{n.title}</h3>
              <p className="text-sm text-gray-600 mt-0.5">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{n.createdAt}</p>
            </div>
            {!n.read && <div className="w-2.5 h-2.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}
