'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast';
import { Save } from 'lucide-react';

export default function GymSettingsPage() {
  const { addToast } = useToast();
  const [settings, setSettings] = useState({ gymHours: '6:00 AM - 10:00 PM', enableQR: true, enableWhatsApp: true, autoReminder: true, reminderDays: '7' });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gym Settings</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl space-y-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label><input type="text" value={settings.gymHours} onChange={e => setSettings(p => ({...p, gymHours: e.target.value}))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.enableQR} onChange={e => setSettings(p => ({...p, enableQR: e.target.checked}))} className="w-4 h-4 rounded border-gray-300 text-green-600" /><span className="text-sm text-gray-700">Enable QR Code Attendance</span></label>
          <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.enableWhatsApp} onChange={e => setSettings(p => ({...p, enableWhatsApp: e.target.checked}))} className="w-4 h-4 rounded border-gray-300 text-green-600" /><span className="text-sm text-gray-700">Enable WhatsApp Notifications</span></label>
          <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.autoReminder} onChange={e => setSettings(p => ({...p, autoReminder: e.target.checked}))} className="w-4 h-4 rounded border-gray-300 text-green-600" /><span className="text-sm text-gray-700">Auto Membership Renewal Reminders</span></label>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Remind before (days)</label><input type="number" value={settings.reminderDays} onChange={e => setSettings(p => ({...p, reminderDays: e.target.value}))} className="w-32 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>
        <button onClick={() => addToast('Settings saved successfully', 'success')} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"><Save className="w-4 h-4" />Save Settings</button>
      </div>
    </div>
  );
}
