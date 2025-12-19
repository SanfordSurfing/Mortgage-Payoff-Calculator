'use client';

/**
 * 结果摘要组件
 * 清晰地对比原计划和本计划的各项不同
 */

import type { CalculationResult } from '@/types';

interface ResultsSummaryProps {
  result: CalculationResult;
}

export default function ResultsSummary({ result }: ResultsSummaryProps) {
  const { paymentFrequency, repaymentOption, extraPaymentDetails, original, new: newPlan, savings } = result;

  // 格式化货币（保留两位小数）
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // 格式化时间
  const formatTime = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
    return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  };

  // 获取还款频率描述（始终是月付）
  const getPaymentFrequencyText = () => {
    return 'monthly';
  };

  const hasExtraPayments = savings.interestSaved > 0;
  const basePayment = newPlan.monthlyPayment;
  const extraPaymentAmount = newPlan.schedule.length > 0 ? newPlan.schedule[0].extraPayment : 0;

  return (
    <div className="space-y-6">
      {/* 本计划的 Repayment Options */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Repayment Plan</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-gray-600 font-medium min-w-[140px]">Payment Frequency:</span>
            <span className="text-gray-900 capitalize">
              {repaymentOption === 'extra' ? 'Repayment with extra payments' : 
               'Normal repayment (Monthly)'}
            </span>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-gray-600 font-medium min-w-[140px]">Base Payment:</span>
            <span className="text-gray-900">
              {formatCurrency(basePayment)} per {getPaymentFrequencyText()}
            </span>
          </div>

          {repaymentOption === 'extra' && extraPaymentDetails && (
            <div className="ml-4 pl-4 border-l-2 border-green-200">
              <div className="text-sm font-medium text-gray-700 mb-2">Extra Payments:</div>
              <div className="space-y-1 text-sm text-gray-600">
                {extraPaymentDetails.perMonth && (
                  <div>• {formatCurrency(extraPaymentDetails.perMonth)} per month</div>
                )}
                {extraPaymentDetails.perYear && (
                  <div>• {formatCurrency(extraPaymentDetails.perYear)} per year</div>
                )}
                {extraPaymentDetails.oneTime && (
                  <div>• {formatCurrency(extraPaymentDetails.oneTime)} one time</div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <span className="text-gray-600 font-medium min-w-[140px]">Total Payment:</span>
            <span className="text-gray-900">
              {formatCurrency(newPlan.totalPayment)}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-gray-600 font-medium min-w-[140px]">Payoff Time:</span>
            <span className="text-gray-900 font-semibold">
              {formatTime(newPlan.totalPeriods)}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-gray-600 font-medium min-w-[140px]">Total Interest:</span>
            <span className="text-gray-900">
              {formatCurrency(newPlan.totalInterest)}
            </span>
          </div>
        </div>
      </div>

      {/* 原计划对比 */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Original Plan Comparison</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Original Plan</div>
              <div className="text-gray-900">
                <div className="font-medium">{formatCurrency(original.monthlyPayment)} per month</div>
                <div className="text-sm mt-1">Payoff: {formatTime(original.totalPeriods)}</div>
                <div className="text-sm">Total Interest: {formatCurrency(original.totalInterest)}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Your Plan</div>
              <div className="text-gray-900">
                <div className="font-medium">
                  {formatCurrency(basePayment)} per {getPaymentFrequencyText()}
                  {extraPaymentAmount > 0 && (
                    <span className="text-green-700"> + {formatCurrency(extraPaymentAmount)} extra</span>
                  )}
                </div>
                <div className="text-sm mt-1">Payoff: {formatTime(newPlan.totalPeriods)}</div>
                <div className="text-sm">Total Interest: {formatCurrency(newPlan.totalInterest)}</div>
              </div>
            </div>
          </div>

          {hasExtraPayments && (
            <div className="mt-4 pt-4 border-t border-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Time Saved</div>
                  <div className="text-green-700 font-semibold text-lg">
                    {formatTime(savings.timeSavedMonths)} earlier
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Interest Saved</div>
                  <div className="text-green-700 font-semibold text-lg">
                    {formatCurrency(savings.interestSaved)}
                    <span className="text-sm font-normal text-gray-600 ml-2">
                      ({savings.interestSavedPercent.toFixed(1)}% reduction)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

