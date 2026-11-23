'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const { addToast } = useToast();
  const [settings, setSettings] = useState({
    platformName: 'GymOS',
    supportEmail: 'support@gymos.demo',
    maxGymsBasic: '1',
    maxGymsPro: '3',
    maxGymsEnterprise: '999',
    enableWhatsApp: true,
    enableEmail: true,
    maintenanceMode: false,
    defaultCurrency: 'INR',
    defaultTimezone: 'Asia/Kolkata',
  });

  const handleSave = () => {
    addToast('Settings saved successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 max-w-2xl">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">General</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
              <input type="text" value={settings.platformName} onChange={e => setSettings(p => ({ ...p, platformName: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input type="email" value={settings.supportEmail} onChange={e => setSettings(p => ({ ...p, supportEmail: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                <select value={settings.defaultCurrency} onChange={e => setSettings(p => ({ ...p, defaultCurrency: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Timezone</label>
                <select value={settings.defaultTimezone} onChange={e => setSettings(p => ({ ...p, defaultTimezone: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">US Eastern</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={settings.enableWhatsApp} onChange={e => setSettings(p => ({ ...p, enableWhatsApp: e.target.checked }))} className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <span className="text-sm text-gray-700">Enable WhatsApp Notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={settings.enableEmail} onChange={e => setSettings(p => ({ ...p, enableEmail: e.target.checked }))} className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <span className="text-sm text-gray-700">Enable Email Notifications</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Maintenance</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={settings.maintenanceMode} onChange={e => setSettings(p => ({ ...p, maintenanceMode: e.target.checked }))} className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
            <span className="text-sm text-gray-700">Enable Maintenance Mode</span>
          </label>
          <p className="text-xs text-gray-500 ml-7 mt-1">When enabled, only super admins can access the platform.</p>
        </div>

        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}
