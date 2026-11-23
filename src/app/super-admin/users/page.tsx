'use client';

import React, { useState } from 'react';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/lib/toast';
import { Search, UserPlus, Edit2, Shield, Users as UsersIcon, UserCheck, User } from 'lucide-react';

const initialUsers = [
  { id: 'sa-001', name: 'Rajesh Kumar', email: 'admin@gymos.demo', role: 'super-admin', status: 'active', lastLogin: '2024-11-21' },
  { id: 'ga-001', name: 'Priya Sharma', email: 'owner@gymos.demo', role: 'gym-admin', status: 'active', lastLogin: '2024-11-21' },
  { id: 'ga-002', name: 'Vikram Singh', email: 'vikram@ironparadise.com', role: 'gym-admin', status: 'active', lastLogin: '2024-11-20' },
  { id: 'ga-003', name: 'Anil Kapoor', email: 'anil@powerhouse.com', role: 'gym-admin', status: 'active', lastLogin: '2024-11-19' },
  { id: 'tr-001', name: 'Arjun Patel', email: 'trainer@gymos.demo', role: 'trainer', status: 'active', lastLogin: '2024-11-21' },
  { id: 'tr-002', name: 'Deepika Nair', email: 'deepika@fitzone.com', role: 'trainer', status: 'active', lastLogin: '2024-11-20' },
  { id: 'mb-001', name: 'Ananya Verma', email: 'member@gymos.demo', role: 'member', status: 'active', lastLogin: '2024-11-21' },
  { id: 'mb-002', name: 'Rohan Singh', email: 'rohan.singh@email.com', role: 'member', status: 'active', lastLogin: '2024-11-20' },
];

const roleIcons: Record<string, React.ReactNode> = {
  'super-admin': <Shield className="w-4 h-4 text-purple-600" />,
  'gym-admin': <UsersIcon className="w-4 h-4 text-blue-600" />,
  trainer: <UserCheck className="w-4 h-4 text-orange-600" />,
  member: <User className="w-4 h-4 text-green-600" />,
};

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const { addToast } = useToast();

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'super-admin', 'gym-admin', 'trainer', 'member'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${roleFilter === r ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{r.replace('-', ' ')}</button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">User</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Email</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Role</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Last Login</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                <td className="px-4 py-3 text-gray-600">{u.email}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-1.5">{roleIcons[u.role]}<span className="capitalize text-gray-600">{u.role.replace('-', ' ')}</span></div></td>
                <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                <td className="px-4 py-3 text-gray-600">{u.lastLogin}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => { setUsers(prev => prev.map(usr => usr.id === u.id ? { ...usr, status: usr.status === 'active' ? 'inactive' : 'active' } : usr)); addToast('User status updated', 'success'); }} className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600">
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
