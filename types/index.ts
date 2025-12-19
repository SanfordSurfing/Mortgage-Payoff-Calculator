/**
 * 房贷计算相关的类型定义
 */

// 还款频率类型（只支持月付）
export type PaymentFrequency = 'monthly';

// 额外还款类型（按照竞品要求）
export type ExtraPaymentType = 'per-month' | 'per-year' | 'one-time';

// 计算器类型
export type CalculatorType = 'known-term' | 'unknown-term';

// 房贷参数 - 计算器1（已知剩余期限）
export interface KnownTermParams {
  calculatorType: 'known-term';
  // 原始贷款金额
  originalLoanAmount: number;
  // 原始贷款期限（年）
  originalLoanTermYears: number;
  // 年利率（百分比）
  annualInterestRate: number;
  // 剩余期限（年）
  remainingTermYears: number;
  // 剩余期限（月）
  remainingTermMonths: number;
  // 还款频率（始终是月付）
  paymentFrequency: PaymentFrequency;
  // 额外还款（可以同时有多个）
  extraPayments?: {
    perMonth?: number;
    perYear?: number;
    oneTime?: number;
  };
}

// 房贷参数 - 计算器2（未知剩余期限）
export interface UnknownTermParams {
  calculatorType: 'unknown-term';
  // 未偿还本金余额
  unpaidPrincipalBalance: number;
  // 月供
  monthlyPayment: number;
  // 年利率（百分比）
  annualInterestRate: number;
  // 还款频率（始终是月付）
  paymentFrequency: PaymentFrequency;
  // 额外还款（可以同时有多个）
  extraPayments?: {
    perMonth?: number;
    perYear?: number;
    oneTime?: number;
  };
}

// 统一的房贷参数类型
export type MortgageParams = KnownTermParams | UnknownTermParams;

// 每月还款明细
export interface PaymentDetail {
  // 期数（第几个月）
  period: number;
  // 日期
  date: Date;
  // 期初余额
  beginningBalance: number;
  // 月供（本金+利息）
  payment: number;
  // 本金部分
  principal: number;
  // 利息部分
  interest: number;
  // 额外还款（如果有）
  extraPayment: number;
  // 期末余额
  endingBalance: number;
}

// 还款选项类型
export type RepaymentOptionType = 'normal' | 'extra';

// 计算结果汇总
export interface CalculationResult {
  // 还款频率
  paymentFrequency: PaymentFrequency;
  // 还款选项类型
  repaymentOption: RepaymentOptionType;
  // 额外还款详情（如果有）
  extraPaymentDetails?: {
    perMonth?: number;
    perYear?: number;
    oneTime?: number;
  };
  // 原始方案（无额外还款）
  original: {
    // 总还款期数
    totalPeriods: number;
    // 总还款金额
    totalPayment: number;
    // 总利息
    totalInterest: number;
    // 每月还款额
    monthlyPayment: number;
    // 还款明细表
    schedule: PaymentDetail[];
  };
  // 新方案（有额外还款）
  new: {
    // 总还款期数
    totalPeriods: number;
    // 总还款金额
    totalPayment: number;
    // 总利息
    totalInterest: number;
    // 每月还款额（基础）
    monthlyPayment: number;
    // 还款明细表
    schedule: PaymentDetail[];
  };
  // 节省情况
  savings: {
    // 节省的时间（月）
    timeSavedMonths: number;
    // 节省的利息（美元）
    interestSaved: number;
    // 节省的百分比
    interestSavedPercent: number;
  };
}

