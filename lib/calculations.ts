/**
 * 房贷计算核心逻辑
 * 这个文件包含了所有计算房贷还款的函数
 */

import type {
  MortgageParams,
  PaymentDetail,
  CalculationResult,
  PaymentFrequency,
} from '@/types';

/**
 * 计算月利率
 * @param annualRate 年利率（百分比，例如 5.5）
 * @returns 月利率（小数，例如 0.00458）
 */
export function getMonthlyRate(annualRate: number): number {
  return annualRate / 100 / 12;
}

/**
 * 计算标准月供（无额外还款）
 * @param principal 本金
 * @param monthlyRate 月利率
 * @param numberOfPayments 还款期数
 * @returns 月供金额
 */
export function calculateMonthlyPayment(
  principal: number,
  monthlyRate: number,
  numberOfPayments: number
): number {
  if (monthlyRate === 0) {
    // 如果利率为0，直接平均分配
    return principal / numberOfPayments;
  }
  
  // 使用标准房贷计算公式
  // P * [r(1+r)^n] / [(1+r)^n - 1]
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
  const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
  
  return principal * (numerator / denominator);
}

/**
 * 生成还款明细表（无额外还款）
 */
export function generatePaymentSchedule(
  principal: number,
  rate: number,
  paymentAmount: number,
  numberOfPayments: number,
  frequency: PaymentFrequency,
  startDate?: Date
): PaymentDetail[] {
  const schedule: PaymentDetail[] = [];
  let balance = principal;
  const currentDate = startDate || new Date();

  for (let period = 1; period <= numberOfPayments; period++) {
    // 计算利息
    const interest = balance * rate;
    
    // 计算本金（月供减去利息）
    const principalPayment = Math.min(paymentAmount - interest, balance);
    
    // 更新余额
    balance -= principalPayment;
    
    // 计算日期（月付）
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + period - 1);

    // 实际还款金额 = 利息 + 本金还款（当余额不足时，实际还款会小于月供）
    const actualPayment = interest + principalPayment;
    
    schedule.push({
      period,
      date,
      beginningBalance: balance + principalPayment,
      payment: actualPayment,
      principal: principalPayment,
      interest,
      extraPayment: 0,
      endingBalance: balance,
    });

    // 如果余额为0，提前结束
    if (balance <= 0.01) {
      break;
    }
  }

  return schedule;
}

/**
 * 生成带额外还款的还款明细表
 */
export function generateScheduleWithExtraPayments(
  principal: number,
  rate: number,
  basePayment: number,
  numberOfPayments: number,
  frequency: PaymentFrequency,
  extraPayments?: { perMonth?: number; perYear?: number; oneTime?: number },
  startDate?: Date
): PaymentDetail[] {
  const schedule: PaymentDetail[] = [];
  let balance = principal;
  const currentDate = startDate || new Date();

  for (let period = 1; period <= numberOfPayments; period++) {
    const beginningBalance = balance;
    
    // 计算利息
    const interest = balance * rate;
    
    // 计算基础本金还款
    let principalPayment = Math.min(basePayment - interest, balance);
    
    // 处理额外还款（可以同时有多个类型）
    let extraPaymentAmount = 0;
    if (extraPayments) {
      // 一次性额外还款（只在第一期）
      if (extraPayments.oneTime && period === 1) {
        extraPaymentAmount += extraPayments.oneTime;
      }
      
      // 每月额外还款
      if (extraPayments.perMonth) {
        extraPaymentAmount += extraPayments.perMonth;
      }
      
      // 每年额外还款（在每年的第12个月添加）
      if (extraPayments.perYear) {
        // 月付：在每年的第12个月添加额外还款
        // period % 12 === 0 表示第12、24、36...个月（每年的最后一个月）
        if (period % 12 === 0 && period > 0) {
          extraPaymentAmount += extraPayments.perYear;
        }
      }
    }
    
    // 额外还款直接减少本金
    principalPayment += extraPaymentAmount;
    balance -= principalPayment;
    
    // 如果余额为负，调整还款额
    if (balance < 0) {
      principalPayment += balance;
      balance = 0;
    }
    
    // 实际还款金额 = 利息 + 本金还款（包括额外还款）
    // 当余额不足时，实际还款会小于 basePayment + extraPaymentAmount
    const actualPayment = interest + principalPayment;
    
    // 计算日期（月付）
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + period - 1);

    schedule.push({
      period,
      date,
      beginningBalance,
      payment: actualPayment,
      principal: principalPayment,
      interest,
      extraPayment: extraPaymentAmount,
      endingBalance: balance,
    });

    // 如果余额为0，提前结束
    if (balance <= 0.01) {
      break;
    }
  }

  return schedule;
}

/**
 * 主计算函数：计算房贷还款结果
 * 支持两种计算器模式
 */
export function calculateMortgage(params: MortgageParams): CalculationResult {
  let principal: number;
  let rate: number;
  let numberOfPayments: number;
  let basePayment: number;
  let paymentFrequency: PaymentFrequency;
  let monthlyPayment: number | undefined; // 用于 Calculator 2
  let extraPayments = params.extraPayments;
  const startDate = new Date();

  if (params.calculatorType === 'known-term') {
    // 计算器1：已知剩余期限
    const {
      originalLoanAmount,
      originalLoanTermYears,
      annualInterestRate,
      remainingTermYears,
      remainingTermMonths,
    } = params;

    paymentFrequency = 'monthly'; // 始终是月付

    // 计算剩余期限（月）
    const remainingTermMonthsTotal = remainingTermYears * 12 + remainingTermMonths;
    
    // 计算当前余额（基于原始贷款和剩余期限）
    // 使用原始贷款参数计算当前应该剩余的本金
    const originalRate = getMonthlyRate(annualInterestRate);
    const originalTotalMonths = originalLoanTermYears * 12;
    const originalMonthlyPayment = calculateMonthlyPayment(
      originalLoanAmount,
      originalRate,
      originalTotalMonths
    );
    
    // 计算已还期数
    const paidPeriods = originalTotalMonths - remainingTermMonthsTotal;
    
    // 计算当前余额（通过模拟已还期数）
    let currentBalance = originalLoanAmount;
    for (let i = 0; i < paidPeriods && currentBalance > 0.01; i++) {
      const interest = currentBalance * originalRate;
      const principalPaid = originalMonthlyPayment - interest;
      currentBalance -= principalPaid;
      if (currentBalance < 0) currentBalance = 0;
    }
    
    principal = Math.max(0, currentBalance);

    // 月付计算
    rate = getMonthlyRate(annualInterestRate);
    numberOfPayments = remainingTermMonthsTotal;
    basePayment = calculateMonthlyPayment(principal, rate, numberOfPayments);
  } else {
    // 计算器2：未知剩余期限
    const {
      unpaidPrincipalBalance,
      monthlyPayment: inputMonthlyPayment,
      annualInterestRate,
      paymentFrequency: freq,
    } = params;

    principal = unpaidPrincipalBalance;
    paymentFrequency = 'monthly'; // 始终是月付
    basePayment = inputMonthlyPayment;
    monthlyPayment = inputMonthlyPayment; // 保存用于原始方案计算

    // 月付计算
    rate = getMonthlyRate(annualInterestRate);
    // 根据月供和本金计算剩余期数
    // 使用公式反推：P = M * [(1+r)^n - 1] / [r(1+r)^n]
    // 需要迭代计算 numberOfPayments
    numberOfPayments = calculateRemainingPeriods(principal, rate, monthlyPayment);
  }

  // 计算原始方案（无额外还款）
  // 原始方案始终是月付，用于对比
  const originalMonthlyRate = getMonthlyRate(params.annualInterestRate);
  let originalNumberOfPayments: number;
  let originalMonthlyPayment: number;
  
  // 根据计算器类型确定原始方案的期数和月供
  if (params.calculatorType === 'known-term') {
    // 计算器1：使用剩余期限（月），重新计算月供
    const remainingTermMonthsTotal = params.remainingTermYears * 12 + params.remainingTermMonths;
    originalNumberOfPayments = remainingTermMonthsTotal;
    originalMonthlyPayment = calculateMonthlyPayment(
      principal,
      originalMonthlyRate,
      originalNumberOfPayments
    );
  } else {
    // 计算器2：使用用户输入的月供，使用计算出的期数
    originalNumberOfPayments = numberOfPayments;
    // 在计算器2中，monthlyPayment 一定已经被设置（第247行）
    if (monthlyPayment === undefined) {
      throw new Error('Monthly payment is required for calculator type 2');
    }
    originalMonthlyPayment = monthlyPayment; // 直接使用用户输入的月供
  }
  
  const originalSchedule = generatePaymentSchedule(
    principal,
    originalMonthlyRate,
    originalMonthlyPayment,
    originalNumberOfPayments,
    'monthly',
    startDate
  );

  const originalTotalPayment = originalSchedule.reduce(
    (sum, p) => sum + p.payment,
    0
  );
  const originalTotalInterest = originalSchedule.reduce(
    (sum, p) => sum + p.interest,
    0
  );

  // 计算新方案（有额外还款）
  let newSchedule: PaymentDetail[];
  if (extraPayments && (extraPayments.perMonth || extraPayments.perYear || extraPayments.oneTime)) {
    newSchedule = generateScheduleWithExtraPayments(
      principal,
      rate,
      basePayment,
      numberOfPayments,
      paymentFrequency,
      extraPayments,
      startDate
    );
  } else {
    // 如果没有额外还款，新方案和原始方案相同
    newSchedule = originalSchedule;
  }

  const newTotalPayment = newSchedule.reduce(
    (sum, p) => sum + p.payment,
    0
  );
  const newTotalInterest = newSchedule.reduce(
    (sum, p) => sum + p.interest,
    0
  );

  // 计算节省情况
  // 原始方案和新方案都是月付，直接比较月数
  const timeSavedMonths = originalSchedule.length - newSchedule.length;
  const interestSaved = originalTotalInterest - newTotalInterest;
  const interestSavedPercent =
    originalTotalInterest > 0
      ? (interestSaved / originalTotalInterest) * 100
      : 0;

  return {
    paymentFrequency,
    repaymentOption: 'normal' as const, // 默认值，会在组件中更新
    original: {
      totalPeriods: originalSchedule.length,
      totalPayment: originalTotalPayment,
      totalInterest: originalTotalInterest,
      monthlyPayment: originalMonthlyPayment,
      schedule: originalSchedule,
    },
    new: {
      totalPeriods: newSchedule.length,
      totalPayment: newTotalPayment,
      totalInterest: newTotalInterest,
      monthlyPayment: basePayment,
      schedule: newSchedule,
    },
    savings: {
      timeSavedMonths,
      interestSaved,
      interestSavedPercent,
    },
  };
}

/**
 * 根据本金、利率和月供计算剩余期数
 */
function calculateRemainingPeriods(
  principal: number,
  rate: number,
  payment: number
): number {
  if (rate === 0) {
    return Math.ceil(principal / payment);
  }

  // 使用公式反推期数
  // P = M * [(1+r)^n - 1] / [r(1+r)^n]
  // 需要迭代求解 n
  let n = 1;
  let maxIterations = 1000; // 最多1000期（约83年）
  
  while (n < maxIterations) {
    const numerator = rate * Math.pow(1 + rate, n);
    const denominator = Math.pow(1 + rate, n) - 1;
    const calculatedPrincipal = payment * (denominator / numerator);
    
    if (Math.abs(calculatedPrincipal - principal) < 1) {
      return n;
    }
    
    if (calculatedPrincipal > principal) {
      break;
    }
    
    n++;
  }
  
  // 如果找不到精确值，使用近似计算
  // n ≈ -ln(1 - P*r/M) / ln(1+r)
  const nApprox = -Math.log(1 - (principal * rate) / payment) / Math.log(1 + rate);
  return Math.ceil(nApprox);
}

