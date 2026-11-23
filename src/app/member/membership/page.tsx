'use client';

import React from 'react';
import { members, membershipPlans } from '@/data';
import { formatDate, formatCurrency } from '@/lib/utils';
import StatusBadge from '@/components/ui/StatusBadge';
import { CreditCard, CheckCircle, ShieldCheck, Calendar } from 'lucide-react';
import { useToast } from '@/lib/toast';

export default function MemberMembershipPage() {
  const member = members[0];
  const plan = membershipPlans.find(p => p.name === member.membershipPlan) || membershipPlans[0];
  const { addToast } = useToast();

  const handleRenew = () => {
    addToast('Renewal request submitted! Front desk will confirm your payment.', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Subscription & Plan</h1>
        <p className="text-sm text-gray-500 mt-1">Review active gym pass benefits and renewal dates</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Plan Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#064E3B] to-[#090D0B] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <span className="text-xs text-green-300 font-semibold tracking-wider uppercase">FitZone Premium Pass</span>
                <h2 className="text-2xl font-bold">{member.membershipPlan}</h2>
              </div>
            </div>
            <StatusBadge status={member.status} />
          </div>

          <div className="grid sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-xs text-white/60">Subscription Start</p>
              <p className="text-sm font-semibold mt-0.5">{formatDate(member.membershipStart)}</p>
            </div>
            <div>
              <p className="text-xs text-white/60">Valid Until</p>
              <p className="text-sm font-semibold text-green-300 mt-0.5">{formatDate(member.membershipExpiry)}</p>
            </div>
            <div>
              <p className="text-xs text-white/60">Assigned Branch</p>
              <p className="text-sm font-semibold mt-0.5">Indiranagar (HQ)</p>
            </div>
          </div>
        </div>

        {/* Quick Renewal Box */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-base">Plan Renewal</h3>
            <p className="text-xs text-gray-500 mt-1">
              Keep your gym access uninterrupted. Extend by 3, 6 or 12 months with current member discount.
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500">Plan Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{formatCurrency(plan.price)}</p>
            </div>
          </div>

          <button
            onClick={handleRenew}
            className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Request Instant Renewal
          </button>
        </div>
      </div>

      {/* Benefits Included */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Included Plan Perks & Amenities</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plan.features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-800">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
