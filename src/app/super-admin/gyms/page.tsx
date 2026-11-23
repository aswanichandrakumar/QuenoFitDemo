'use client';

import React, { useState } from 'react';
import { gyms as initialGyms } from '@/data';
import type { Gym } from '@/types';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/lib/toast';
import { formatDate } from '@/lib/utils';
import { Search, Eye, CheckCircle, XCircle, Building2, MapPin, Users, Filter } from 'lucide-react';

export default function GymManagement() {
  const [gymsList, setGymsList] = useState<Gym[]>(initialGyms);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const { addToast } = useToast();

  const filtered = gymsList.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.owner.toLowerCase().includes(search.toLowerCase()) || g.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (gymId: string, action: 'active' | 'suspended') => {
    setGymsList(prev => prev.map(g => g.id === gymId ? { ...g, status: action } : g));
    addToast(`Gym ${action === 'active' ? 'activated' : 'suspended'} successfully`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gym Management</h1>
          <p className="text-sm text-gray-500 mt-1">{gymsList.length} registered gyms</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search gyms by name, owner or city..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          {['all', 'active', 'pending', 'suspended'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${statusFilter === s ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Gym Name</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Owner</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">City</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Members</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Plan</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Registered</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(gym => (
                <tr key={gym.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{gym.name}</td>
                  <td className="px-4 py-3 text-gray-600">{gym.owner}</td>
                  <td className="px-4 py-3 text-gray-600">{gym.city}</td>
                  <td className="px-4 py-3 text-gray-600">{gym.memberCount}</td>
                  <td className="px-4 py-3"><span className="capitalize text-gray-600">{gym.plan}</span></td>
                  <td className="px-4 py-3"><StatusBadge status={gym.status} /></td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(gym.registeredAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelectedGym(gym)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="View"><Eye className="w-4 h-4" /></button>
                      {gym.status === 'pending' && <button onClick={() => handleAction(gym.id, 'active')} className="p-1.5 rounded-lg hover:bg-green-50 text-green-600" title="Approve"><CheckCircle className="w-4 h-4" /></button>}
                      {gym.status === 'active' && <button onClick={() => handleAction(gym.id, 'suspended')} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600" title="Suspend"><XCircle className="w-4 h-4" /></button>}
                      {gym.status === 'suspended' && <button onClick={() => handleAction(gym.id, 'active')} className="p-1.5 rounded-lg hover:bg-green-50 text-green-600" title="Activate"><CheckCircle className="w-4 h-4" /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selectedGym} onClose={() => setSelectedGym(null)} title="Gym Details" size="lg">
        {selectedGym && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedGym.name}</h3>
                <p className="text-sm text-gray-500">{selectedGym.email}</p>
                <StatusBadge status={selectedGym.status} className="mt-1" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-500">Owner</p><p className="font-medium">{selectedGym.owner}</p></div>
              <div><p className="text-xs text-gray-500">Phone</p><p className="font-medium">{selectedGym.phone}</p></div>
              <div><p className="text-xs text-gray-500">Address</p><p className="font-medium flex items-center gap-1"><MapPin className="w-3 h-3" />{selectedGym.address}, {selectedGym.city}</p></div>
              <div><p className="text-xs text-gray-500">Plan</p><p className="font-medium capitalize">{selectedGym.plan}</p></div>
              <div><p className="text-xs text-gray-500">Members</p><p className="font-medium flex items-center gap-1"><Users className="w-3 h-3" />{selectedGym.memberCount}</p></div>
              <div><p className="text-xs text-gray-500">Trainers</p><p className="font-medium">{selectedGym.trainerCount}</p></div>
              <div><p className="text-xs text-gray-500">Registered</p><p className="font-medium">{formatDate(selectedGym.registeredAt)}</p></div>
              <div><p className="text-xs text-gray-500">Branches</p><p className="font-medium">{selectedGym.branches.length}</p></div>
            </div>
            {selectedGym.branches.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Branches</h4>
                <div className="space-y-2">
                  {selectedGym.branches.map(b => (
                    <div key={b.id} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{b.name}</p>
                        <p className="text-xs text-gray-500">{b.address}, {b.city} • Manager: {b.managerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{b.memberCount} members</p>
                        <StatusBadge status={b.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
