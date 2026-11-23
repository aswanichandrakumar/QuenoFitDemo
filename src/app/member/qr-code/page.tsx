'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { members } from '@/data';
import { formatDate } from '@/lib/utils';
import StatusBadge from '@/components/ui/StatusBadge';
import { ShieldCheck, Dumbbell, Download, Sparkles } from 'lucide-react';

export default function MemberQRCodePage() {
  const member = members[0];

  return (
    <div className="space-y-6 max-w-xl mx-auto text-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Digital Gym Pass</h1>
        <p className="text-sm text-gray-500 mt-1">Scan this QR code at the turnstile or front desk kiosk</p>
      </div>

      <div className="bg-white rounded-3xl border-2 border-green-500/30 p-8 shadow-xl relative overflow-hidden">
        {/* Subtle decorative top banner */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">FitZone Premium</span>
          </div>
          <StatusBadge status={member.status} />
        </div>

        {/* QR Code Container */}
        <div className="my-8 flex justify-center">
          <div className="p-4 bg-white border-2 border-dashed border-gray-200 rounded-2xl shadow-inner">
            <QRCodeSVG
              value={`GYMOS-MEMBER:${member.memberId}:${member.id}`}
              size={220}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        {/* Member Details */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{member.name}</h2>
          <p className="font-mono text-sm text-green-700 font-semibold tracking-wider mt-0.5">
            {member.memberId}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Valid until {formatDate(member.membershipExpiry)} • Indiranagar Branch
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          Encrypted GymOS Security Token • Single Person Pass
        </div>
      </div>
    </div>
  );
}
