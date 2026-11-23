'use client';

import React, { useState } from 'react';
import { payments as initialPayments } from '@/data';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Search, Printer, Eye } from 'lucide-react';

export default function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [receipt, setReceipt] = useState<typeof initialPayments[0] | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = initialPayments.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.memberName.toLowerCase().includes(q) || p.paymentId.toLowerCase().includes(q) || p.invoiceNumber.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search by name, payment ID..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" /></div>
        <div className="flex gap-2">{['all','completed','pending','failed'].map(s => (<button key={s} onClick={() => { setStatusFilter(s); setPage(1); }} className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${statusFilter === s ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>))}</div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 font-semibold text-gray-700">Payment ID</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">Member</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">Amount</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">Method</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">Date</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
            <th className="text-right px-4 py-3 font-semibold text-gray-700">Actions</th>
          </tr></thead>
          <tbody>
            {paged.map(p => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.paymentId}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{p.memberName}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(p.amount)}</td>
                <td className="px-4 py-3 capitalize text-gray-600 hidden md:table-cell">{p.method.replace('_', ' ')}</td>
                <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{formatDate(p.date)}</td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3 text-right"><button onClick={() => setReceipt(p)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><Eye className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200"><span className="text-sm text-gray-600">Page {page} of {totalPages}</span><div className="flex gap-2"><button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50">Prev</button><button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages} className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50">Next</button></div></div>}
      </div>

      <Modal isOpen={!!receipt} onClose={() => setReceipt(null)} title="Payment Receipt" size="md">
        {receipt && (
          <div id="receipt">
            <div className="text-center border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-bold text-gray-900">FitZone Premium</h3>
              <p className="text-sm text-gray-500">45 MG Road, Indiranagar, Bangalore</p>
              <p className="text-xs text-gray-400 mt-1">PAYMENT RECEIPT</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div><p className="text-gray-500">Invoice No</p><p className="font-medium">{receipt.invoiceNumber}</p></div>
              <div><p className="text-gray-500">Date</p><p className="font-medium">{formatDate(receipt.date)}</p></div>
              <div><p className="text-gray-500">Member</p><p className="font-medium">{receipt.memberName}</p></div>
              <div><p className="text-gray-500">Payment Method</p><p className="font-medium capitalize">{receipt.method.replace('_', ' ')}</p></div>
            </div>
            <div className="border-t border-b border-gray-200 py-3 mb-4">
              <div className="flex justify-between text-sm"><span className="text-gray-600">{receipt.description}</span><span className="font-semibold">{formatCurrency(receipt.amount)}</span></div>
            </div>
            <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-green-600">{formatCurrency(receipt.amount)}</span></div>
            <div className="mt-4 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-400">This is a demo receipt generated by GymOS</p>
              <button onClick={() => window.print()} className="mt-3 flex items-center gap-1.5 mx-auto px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 no-print"><Printer className="w-4 h-4" />Print Receipt</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
