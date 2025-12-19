'use client';

/**
 * 房贷计算器主组件
 * 根据用户是否知道剩余期限，显示不同的参数输入界面
 */

import { useState, useRef, useEffect } from 'react';
import type { MortgageParams, PaymentFrequency, ExtraPaymentType, CalculatorType } from '@/types';
import { calculateMortgage } from '@/lib/calculations';
import type { CalculationResult } from '@/types';
import ResultsDisplay from '@/components/results/ResultsDisplay';

export default function MortgageCalculator() {
  // 计算器类型选择（第一步）
  const [calculatorType, setCalculatorType] = useState<CalculatorType | null>(null);

  // 计算器1的参数（已知剩余期限）
  const [knownTermParams, setKnownTermParams] = useState({
    originalLoanAmount: 0,
    originalLoanTermYears: 0,
    annualInterestRate: 0,
    remainingTermYears: 0,
    remainingTermMonths: 0,
    paymentFrequency: 'monthly' as PaymentFrequency,
  });

  // 计算器2的参数（未知剩余期限）
  const [unknownTermParams, setUnknownTermParams] = useState({
    unpaidPrincipalBalance: 0,
    monthlyPayment: 0,
    annualInterestRate: 0,
    paymentFrequency: 'monthly' as PaymentFrequency,
  });

  // 还款选项状态（两种互斥选项）
  const [repaymentOption, setRepaymentOption] = useState<'normal' | 'extra'>('normal');
  
  // 额外还款金额（三个输入框）
  const [extraPaymentPerMonth, setExtraPaymentPerMonth] = useState(0);
  const [extraPaymentPerYear, setExtraPaymentPerYear] = useState(0);
  const [extraPaymentOneTime, setExtraPaymentOneTime] = useState(0);

  // 计算结果状态
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  // 结果区域的引用，用于自动滚动
  const resultsRef = useRef<HTMLDivElement>(null);

  // 当结果更新时，自动滚动到结果区域
  useEffect(() => {
    if (result && resultsRef.current) {
      // 使用 setTimeout 确保 DOM 已更新
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [result]);

  // 执行计算
  const handleCalculate = () => {
    let calculationParams: MortgageParams;

    // 确定额外还款（始终是月付）
    let extraPayments: { perMonth?: number; perYear?: number; oneTime?: number } | undefined = undefined;

    if (repaymentOption === 'extra') {
      // 支持同时有多个额外还款类型
      extraPayments = {};
      if (extraPaymentPerMonth > 0) {
        extraPayments.perMonth = extraPaymentPerMonth;
      }
      if (extraPaymentPerYear > 0) {
        extraPayments.perYear = extraPaymentPerYear;
      }
      if (extraPaymentOneTime > 0) {
        extraPayments.oneTime = extraPaymentOneTime;
      }
      // 如果没有任何额外还款，设为 undefined
      if (Object.keys(extraPayments).length === 0) {
        extraPayments = undefined;
      }
    }

    if (calculatorType === 'known-term') {
      // 验证计算器1的必填字段
      if (
        !knownTermParams.originalLoanAmount ||
        !knownTermParams.originalLoanTermYears ||
        !knownTermParams.annualInterestRate ||
        (!knownTermParams.remainingTermYears && !knownTermParams.remainingTermMonths)
      ) {
        alert('Please fill in all required fields for Calculator 1.');
        return;
      }

      calculationParams = {
        calculatorType: 'known-term',
        ...knownTermParams,
        paymentFrequency: 'monthly',
        extraPayments,
      };
    } else {
      // 验证计算器2的必填字段
      if (
        !unknownTermParams.unpaidPrincipalBalance ||
        !unknownTermParams.monthlyPayment ||
        !unknownTermParams.annualInterestRate
      ) {
        alert('Please fill in all required fields for Calculator 2.');
        return;
      }

      calculationParams = {
        calculatorType: 'unknown-term',
        ...unknownTermParams,
        paymentFrequency: 'monthly',
        extraPayments,
      };
    }

    const calculatedResult = calculateMortgage(calculationParams);
    
    // 添加还款选项和额外还款详情信息
    const resultWithOptions: CalculationResult = {
      ...calculatedResult,
      repaymentOption,
      extraPaymentDetails: repaymentOption === 'extra' ? {
        perMonth: extraPaymentPerMonth > 0 ? extraPaymentPerMonth : undefined,
        perYear: extraPaymentPerYear > 0 ? extraPaymentPerYear : undefined,
        oneTime: extraPaymentOneTime > 0 ? extraPaymentOneTime : undefined,
      } : undefined,
    };
    
    setResult(resultWithOptions);
  };

  // 如果还没有选择计算器类型，显示选择界面
  if (!calculatorType) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 border border-gray-100/50">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            Choose Calculator Type
          </h2>
          <p className="text-gray-600 mb-6">
            Do you know the remaining loan term?
          </p>

          <div className="space-y-4">
            {/* 计算器1选项 */}
            <button
              onClick={() => setCalculatorType('known-term')}
              className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Calculator 1: If you know the remaining loan term
              </h3>
              <p className="text-sm text-gray-600">
                Use this calculator if the term length of the remaining loan is known and there is information on the original loan – good for new loans or preexisting loans that have never been supplemented with any external payments.
              </p>
            </button>

            {/* 计算器2选项 */}
            <button
              onClick={() => setCalculatorType('unknown-term')}
              className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Calculator 2: If you don't know the remaining loan term
              </h3>
              <p className="text-sm text-gray-600">
                Use this calculator if the term length of the remaining loan is not known. The unpaid principal balance, interest rate, and monthly payment values can be found in the monthly or quarterly mortgage statement.
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 border border-gray-100/50">
        {/* 返回按钮 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {calculatorType === 'known-term' 
              ? 'Calculator 1: Known Remaining Term'
              : 'Calculator 2: Unknown Remaining Term'}
          </h2>
          <button
            onClick={() => {
              setCalculatorType(null);
              setResult(null);
            }}
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Change Calculator
          </button>
        </div>

        {/* 计算器1的参数输入 */}
        {calculatorType === 'known-term' && (
          <>
            {/* 原始贷款金额 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Loan Amount ($)
              </label>
              <input
                type="number"
                value={knownTermParams.originalLoanAmount || ''}
                onChange={(e) => setKnownTermParams({
                  ...knownTermParams,
                  originalLoanAmount: Number(e.target.value) || 0,
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50 focus:bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="Enter original loan amount"
              />
            </div>

            {/* 原始贷款期限 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Loan Term (Years)
              </label>
              <input
                type="number"
                value={knownTermParams.originalLoanTermYears || ''}
                onChange={(e) => setKnownTermParams({
                  ...knownTermParams,
                  originalLoanTermYears: Number(e.target.value) || 0,
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50 focus:bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="Enter original loan term in years"
              />
            </div>

            {/* 年利率 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={knownTermParams.annualInterestRate || ''}
                onChange={(e) => setKnownTermParams({
                  ...knownTermParams,
                  annualInterestRate: Number(e.target.value) || 0,
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50 focus:bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="Enter interest rate"
              />
            </div>

            {/* 剩余期限 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remaining Term (Years)
                </label>
                <input
                  type="number"
                  value={knownTermParams.remainingTermYears || ''}
                  onChange={(e) => setKnownTermParams({
                    ...knownTermParams,
                    remainingTermYears: Number(e.target.value) || 0,
                  })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50 focus:bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="Years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remaining Term (Months)
                </label>
                <input
                  type="number"
                  value={knownTermParams.remainingTermMonths || ''}
                  onChange={(e) => setKnownTermParams({
                    ...knownTermParams,
                    remainingTermMonths: Number(e.target.value) || 0,
                  })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50 focus:bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="Months"
                />
              </div>
            </div>
          </>
        )}

        {/* 计算器2的参数输入 */}
        {calculatorType === 'unknown-term' && (
          <>
            {/* 未偿还本金余额 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unpaid Principal Balance ($)
              </label>
              <input
                type="number"
                value={unknownTermParams.unpaidPrincipalBalance || ''}
                onChange={(e) => setUnknownTermParams({
                  ...unknownTermParams,
                  unpaidPrincipalBalance: Number(e.target.value) || 0,
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50 focus:bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="Enter unpaid principal balance"
              />
            </div>

            {/* 月供 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Payment ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={unknownTermParams.monthlyPayment || ''}
                onChange={(e) => setUnknownTermParams({
                  ...unknownTermParams,
                  monthlyPayment: Number(e.target.value) || 0,
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50 focus:bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="Enter monthly payment"
              />
            </div>

            {/* 年利率 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={unknownTermParams.annualInterestRate || ''}
                onChange={(e) => setUnknownTermParams({
                  ...unknownTermParams,
                  annualInterestRate: Number(e.target.value) || 0,
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50 focus:bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="Enter interest rate"
              />
            </div>
          </>
        )}

        {/* 还款选项（两种计算器共用） */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <strong>Repayment options:</strong>
          </label>
          <div className="space-y-4">
            {/* 选项1：额外还款 */}
            <div>
              <label className="flex items-center cursor-pointer mb-3">
                <input
                  type="radio"
                  name="repayment-option"
                  checked={repaymentOption === 'extra'}
                  onChange={() => setRepaymentOption('extra')}
                  className="mr-2"
                />
                <span className="text-gray-700 font-medium">Repayment with extra payments</span>
              </label>
              {repaymentOption === 'extra' && (
                <div className="ml-6 space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600 whitespace-nowrap">$</label>
                    <input
                      type="number"
                      value={extraPaymentPerMonth || ''}
                      onChange={(e) => setExtraPaymentPerMonth(Number(e.target.value) || 0)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                      placeholder="0"
                    />
                    <span className="text-sm text-gray-600 whitespace-nowrap">per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600 whitespace-nowrap">$</label>
                    <input
                      type="number"
                      value={extraPaymentPerYear || ''}
                      onChange={(e) => setExtraPaymentPerYear(Number(e.target.value) || 0)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                      placeholder="0"
                    />
                    <span className="text-sm text-gray-600 whitespace-nowrap">per year</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600 whitespace-nowrap">$</label>
                    <input
                      type="number"
                      value={extraPaymentOneTime || ''}
                      onChange={(e) => setExtraPaymentOneTime(Number(e.target.value) || 0)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                      placeholder="0"
                    />
                    <span className="text-sm text-gray-600 whitespace-nowrap">one time</span>
                  </div>
                </div>
              )}
            </div>

            {/* 选项2：正常还款 */}
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="repayment-option"
                checked={repaymentOption === 'normal'}
                onChange={() => setRepaymentOption('normal')}
                className="mr-2"
              />
              <span className="text-gray-700">Normal repayment</span>
            </label>
          </div>
        </div>

        {/* 计算按钮 */}
        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl text-lg"
        >
          Calculate
        </button>
      </div>

      {/* 结果显示区域 */}
      {result && (
        <div ref={resultsRef} className="mt-8" id="results-container">
          <ResultsDisplay result={result} />
        </div>
      )}
    </div>
  );
}
