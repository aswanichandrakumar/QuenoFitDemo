'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast';
import { HeadphonesIcon, Send, MessageCircle, Clock, MapPin, Phone } from 'lucide-react';

export default function MemberSupportPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      addToast('Please provide both subject and message', 'error');
      return;
    }
    addToast('Ticket raised! The gym front desk will attend to you shortly.', 'success');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Member Help & Gym Support</h1>
        <p className="text-sm text-gray-500 mt-1">Need locker assistance, trainer adjustments or fee inquiries?</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Send an Enquiry or Ticket</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Locker key issue / Schedule trainer change"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message Details *</label>
              <textarea
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Please describe how we can assist you..."
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 resize-none"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <Send className="w-4 h-4" /> Submit Ticket
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h4 className="font-semibold text-gray-900 text-sm mb-3">Front Desk Contact</h4>
            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" />
                <span>+91 98765 11111 (Desk)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span>06:00 AM - 10:00 PM (Daily)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>Indiranagar Branch, Bangalore</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-5 border border-green-100">
            <h4 className="font-semibold text-green-900 text-sm mb-1">WhatsApp Concierge</h4>
            <p className="text-xs text-green-700 leading-relaxed mb-3">
              Need immediate answers? Chat with our virtual gym concierge on WhatsApp.
            </p>
            <button
              onClick={() => addToast('Opening WhatsApp link in demo mode...', 'info')}
              className="text-xs font-semibold text-white bg-green-600 px-3 py-1.5 rounded-lg hover:bg-green-700"
            >
              Start WhatsApp Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
