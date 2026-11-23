'use client';

import React, { useState } from 'react';
import { whatsappTemplates } from '@/data';
import { useToast } from '@/lib/toast';
import { MessageSquare, Send, Edit2, Eye } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function WhatsAppPage() {
  const [templates, setTemplates] = useState(whatsappTemplates);
  const [viewTemplate, setViewTemplate] = useState<typeof whatsappTemplates[0] | null>(null);
  const { addToast } = useToast();

  const categoryColors: Record<string, string> = { renewal: 'bg-blue-50 text-blue-700', payment: 'bg-yellow-50 text-yellow-700', welcome: 'bg-green-50 text-green-700', announcement: 'bg-purple-50 text-purple-700', birthday: 'bg-pink-50 text-pink-700', custom: 'bg-gray-50 text-gray-700' };

  const handleSend = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, sentCount: t.sentCount + 1, lastSent: new Date().toISOString().split('T')[0] } : t));
    addToast('Message simulated! (Demo mode — not actually sent via WhatsApp)', 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">WhatsApp Automation</h1>
        <p className="text-sm text-yellow-600 bg-yellow-50 inline-block px-3 py-1 rounded-full mt-2">⚡ Demo Mode — Messages are simulated, not delivered via WhatsApp</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2"><MessageSquare className="w-5 h-5 text-green-600" /><h3 className="font-semibold text-gray-900 text-sm">{t.name}</h3></div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${categoryColors[t.category]}`}>{t.category}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{t.message}</p>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-4"><span>Sent: {t.sentCount} times</span>{t.lastSent && <span>Last: {t.lastSent}</span>}</div>
            <div className="flex gap-2">
              <button onClick={() => setViewTemplate(t)} className="flex-1 px-3 py-2 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-1"><Eye className="w-3.5 h-3.5" />Preview</button>
              <button onClick={() => handleSend(t.id)} className="flex-1 px-3 py-2 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-1"><Send className="w-3.5 h-3.5" />Send</button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={!!viewTemplate} onClose={() => setViewTemplate(null)} title="Message Preview">
        {viewTemplate && (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="bg-white rounded-lg p-4 shadow-sm max-w-xs"><p className="text-sm text-gray-800 whitespace-pre-line">{viewTemplate.message}</p><p className="text-xs text-gray-400 text-right mt-2">12:00 PM ✓✓</p></div>
            </div>
            <p className="text-xs text-gray-500">Variables like {'{{name}}'}, {'{{expiry_date}}'} will be replaced with actual member data.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
