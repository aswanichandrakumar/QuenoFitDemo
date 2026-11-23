'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  LayoutDashboard, Building2, GitBranch, Users, CreditCard, Receipt,
  QrCode, UserCheck, Dumbbell, Apple, Calendar, BarChart3, MessageSquare, Settings
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/gym-admin', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Gym Profile', href: '/gym-admin/profile', icon: <Building2 className="w-5 h-5" /> },
  { label: 'Branches', href: '/gym-admin/branches', icon: <GitBranch className="w-5 h-5" /> },
  { label: 'Members', href: '/gym-admin/members', icon: <Users className="w-5 h-5" /> },
  { label: 'Memberships', href: '/gym-admin/memberships', icon: <CreditCard className="w-5 h-5" /> },
  { label: 'Payments', href: '/gym-admin/payments', icon: <Receipt className="w-5 h-5" /> },
  { label: 'Attendance', href: '/gym-admin/attendance', icon: <QrCode className="w-5 h-5" /> },
  { label: 'Trainers', href: '/gym-admin/trainers', icon: <UserCheck className="w-5 h-5" /> },
  { label: 'Workout Plans', href: '/gym-admin/workouts', icon: <Dumbbell className="w-5 h-5" /> },
  { label: 'Diet Plans', href: '/gym-admin/diets', icon: <Apple className="w-5 h-5" /> },
  { label: 'Classes', href: '/gym-admin/classes', icon: <Calendar className="w-5 h-5" /> },
  { label: 'Reports', href: '/gym-admin/reports', icon: <BarChart3 className="w-5 h-5" /> },
  { label: 'WhatsApp', href: '/gym-admin/whatsapp', icon: <MessageSquare className="w-5 h-5" /> },
  { label: 'Settings', href: '/gym-admin/settings', icon: <Settings className="w-5 h-5" /> },
];

export default function GymAdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'gym-admin')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'gym-admin') {
    return <div className="min-h-screen flex items-center justify-center bg-[#F5F8F6]"><div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return <DashboardLayout navItems={navItems} portalName="Gym Admin">{children}</DashboardLayout>;
}
