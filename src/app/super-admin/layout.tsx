'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  LayoutDashboard, Building2, GitBranch, CreditCard, Receipt,
  Users, BarChart3, HeadphonesIcon, Bell, Settings, FileText
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/super-admin', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Gym Management', href: '/super-admin/gyms', icon: <Building2 className="w-5 h-5" /> },
  { label: 'Branches', href: '/super-admin/branches', icon: <GitBranch className="w-5 h-5" /> },
  { label: 'Subscriptions', href: '/super-admin/subscriptions', icon: <CreditCard className="w-5 h-5" /> },
  { label: 'Billing', href: '/super-admin/billing', icon: <Receipt className="w-5 h-5" /> },
  { label: 'Users', href: '/super-admin/users', icon: <Users className="w-5 h-5" /> },
  { label: 'Analytics', href: '/super-admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { label: 'Support', href: '/super-admin/support', icon: <HeadphonesIcon className="w-5 h-5" /> },
  { label: 'Notifications', href: '/super-admin/notifications', icon: <Bell className="w-5 h-5" /> },
  { label: 'Settings', href: '/super-admin/settings', icon: <Settings className="w-5 h-5" /> },
  { label: 'Audit Logs', href: '/super-admin/audit-logs', icon: <FileText className="w-5 h-5" /> },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'super-admin')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'super-admin') {
    return <div className="min-h-screen flex items-center justify-center bg-[#F5F8F6]"><div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return <DashboardLayout navItems={navItems} portalName="Super Admin">{children}</DashboardLayout>;
}
