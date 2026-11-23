'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  LayoutDashboard, CreditCard, QrCode, CalendarCheck, Dumbbell,
  Apple, TrendingUp, Receipt, Bell, User, HeadphonesIcon
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/member', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Membership', href: '/member/membership', icon: <CreditCard className="w-5 h-5" /> },
  { label: 'QR Code', href: '/member/qr-code', icon: <QrCode className="w-5 h-5" /> },
  { label: 'Attendance', href: '/member/attendance', icon: <CalendarCheck className="w-5 h-5" /> },
  { label: 'Workout', href: '/member/workout', icon: <Dumbbell className="w-5 h-5" /> },
  { label: 'Diet', href: '/member/diet', icon: <Apple className="w-5 h-5" /> },
  { label: 'Progress', href: '/member/progress', icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Payments', href: '/member/payments', icon: <Receipt className="w-5 h-5" /> },
  { label: 'Notifications', href: '/member/notifications', icon: <Bell className="w-5 h-5" /> },
  { label: 'Profile', href: '/member/profile', icon: <User className="w-5 h-5" /> },
  { label: 'Support', href: '/member/support', icon: <HeadphonesIcon className="w-5 h-5" /> },
];

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'member')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'member') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F8F6]">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout navItems={navItems} portalName="Member Portal">
      {children}
    </DashboardLayout>
  );
}
