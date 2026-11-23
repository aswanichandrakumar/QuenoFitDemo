'use client';

import React, { useState } from 'react';
import { payments } from '@/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';
import { Printer, Eye, Receipt } from 'lucide-react';

export default function MemberPaymentsPage() {
  const memberPayments = payments.filter(p => p.memberId === 'mb-001' || p.memberName.includes('Ananya'));
  const [selectedReceipt, setSelectedReceipt] = useState<typeof payments[0] | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Payment Invoices</h1>
        <p className="text-sm text-gray-500 mt-1">Download and print official gym fee receipts</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Invoice No</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Description</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Amount Paid</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Method</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {memberPayments.map(p => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{p.invoiceNumber}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{p.description}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{formatCurrency(p.amount)}</td>
                  <td className="px-4 py-3 uppercase text-xs text-gray-600">{p.method.replace('_', ' ')}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(p.date)}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedReceipt(p)}
                      className="p-1.5 rounded-lg hover:bg-green-50 text-green-600"
                      title="View Receipt"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selectedReceipt} onClose={() => setSelectedReceipt(null)} title="Official Payment Receipt" size="md">
        {selectedReceipt && (
          <div>
            <div className="text-center border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-bold text-gray-900">FitZone Premium</h3>
              <p className="text-xs text-gray-500">45 MG Road, Indiranagar, Bangalore • GSTIN: 29AABCU9603R1ZM</p>
              <span className="inline-block mt-2 text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
                PAID INVOICE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div><p className="text-gray-400">Invoice Number</p><p className="font-semibold text-gray-800">{selectedReceipt.invoiceNumber}</p></div>
              <div><p className="text-gray-400">Date</p><p className="font-semibold text-gray-800">{formatDate(selectedReceipt.date)}</p></div>
              <div><p className="text-gray-400">Billed To</p><p className="font-semibold text-gray-800">{selectedReceipt.memberName}</p></div>
              <div><p className="text-gray-400">Payment Gateway</p><p className="font-semibold text-gray-800 uppercase">{selectedReceipt.method}</p></div>
            </div>

            <div className="border-t border-b border-gray-100 py-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{selectedReceipt.description}</span>
                <span className="font-bold text-gray-900">{formatCurrency(selectedReceipt.amount)}</span>
              </div>
            </div>

            <div className="flex justify-between text-base font-bold mb-6">
              <span>Total Paid</span>
              <span className="text-green-600">{formatCurrency(selectedReceipt.amount)}</span>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 no-print"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
