'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  LayoutDashboard, Users, ClipboardCheck, Dumbbell, BookOpen,
  Apple, TrendingUp, CalendarCheck, Calendar, BarChart3
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/trainer', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'My Members', href: '/trainer/members', icon: <Users className="w-5 h-5" /> },
  { label: 'Assessment', href: '/trainer/assessments', icon: <ClipboardCheck className="w-5 h-5" /> },
  { label: 'Workouts', href: '/trainer/workouts', icon: <Dumbbell className="w-5 h-5" /> },
  { label: 'Exercise Library', href: '/trainer/exercises', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Diet Plans', href: '/trainer/diets', icon: <Apple className="w-5 h-5" /> },
  { label: 'Progress', href: '/trainer/progress', icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Attendance', href: '/trainer/attendance', icon: <CalendarCheck className="w-5 h-5" /> },
  { label: 'Schedule', href: '/trainer/schedule', icon: <Calendar className="w-5 h-5" /> },
  { label: 'Reports', href: '/trainer/reports', icon: <BarChart3 className="w-5 h-5" /> },
];

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'trainer')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'trainer') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F8F6]">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout navItems={navItems} portalName="Trainer Portal">
      {children}
    </DashboardLayout>
  );
}
