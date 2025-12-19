'use client';

/**
 * 还款明细表组件
 * 显示每期的还款详情
 */

import type { PaymentDetail } from '@/types';

interface AmortizationTableProps {
  schedule: PaymentDetail[];
  showExtraPayments?: boolean;
  isExportMode?: boolean;
}

export default function AmortizationTable({
  schedule,
  showExtraPayments = false,
  isExportMode = false,
}: AmortizationTableProps) {
  // 格式化货币（保留两位小数）
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto">
      <div className={`${isExportMode ? '' : 'max-h-[600px] overflow-y-auto'} border border-gray-200 rounded-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}>
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Remaining Period
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Beginning Balance
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Payment
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Principal
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Interest
            </th>
            {showExtraPayments && (
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Extra Payment
              </th>
            )}
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Ending Balance
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {schedule.map((payment) => (
            <tr key={payment.period} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {payment.period}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                {formatCurrency(payment.beginningBalance)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                {formatCurrency(payment.payment)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                {formatCurrency(payment.principal)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 text-right">
                {formatCurrency(payment.interest)}
              </td>
              {showExtraPayments && (
                <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 text-right">
                  {payment.extraPayment > 0 ? formatCurrency(payment.extraPayment) : '-'}
                </td>
              )}
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                {formatCurrency(payment.endingBalance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

