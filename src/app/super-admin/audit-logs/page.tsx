'use client';

import React from 'react';
import { auditLogs } from '@/data';
import { FileText, User, Clock } from 'lucide-react';

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Timestamp</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">User</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Action</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Details</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map(log => (
              <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap"><div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{log.timestamp}</div></td>
                <td className="px-4 py-3 font-medium text-gray-900"><div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-gray-400" />{log.userName}</div></td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">{log.action}</span></td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{log.details}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
