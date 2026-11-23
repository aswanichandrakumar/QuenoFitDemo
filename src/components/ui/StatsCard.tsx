'use client';

import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, Users, Building2, CreditCard, Calendar, Dumbbell, UserCheck, ClipboardList, Activity, Bell, DollarSign, Clock, Target, Heart, Zap, Award, TrendingUp as Trend } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3, Users, Building2, CreditCard, Calendar, Dumbbell, UserCheck,
  ClipboardList, Activity, Bell, DollarSign, Clock, Target, Heart, Zap, Award,
  TrendingUp: Trend,
};

interface StatsCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color?: string;
}

export default function StatsCard({ label, value, change, changeLabel, icon, color = 'green' }: StatsCardProps) {
  const IconComponent = iconMap[icon] || BarChart3;

  const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
    green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100' },
    red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-100' },
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-100' },
    teal: { bg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-100' },
    yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', border: 'border-yellow-100' },
  };

  const c = colorMap[color] || colorMap.green;

  return (
    <div className={`bg-white rounded-xl border ${c.border} p-5 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {change >= 0 ? (
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-red-500" />
              )}
              <span className={`text-xs font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && <span className="text-xs text-gray-400">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className={`${c.bg} p-3 rounded-xl`}>
          <IconComponent className={`w-6 h-6 ${c.icon}`} />
        </div>
      </div>
    </div>
  );
}
