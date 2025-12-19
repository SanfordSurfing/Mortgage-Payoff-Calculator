'use client';

/**
 * 图表组件
 * 使用 Recharts 显示各种可视化图表
 */

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { CalculationResult, PaymentDetail } from '@/types';

interface ResultsChartsProps {
  result: CalculationResult;
}

export default function ResultsCharts({ result }: ResultsChartsProps) {
  const { original, new: newPlan, savings } = result;

  // 格式化货币用于图表（保留两位小数）
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // 准备余额变化数据（每年取一个点，避免数据过多）
  const prepareBalanceData = (schedule: PaymentDetail[]) => {
    const data: { year: number; original: number; new: number }[] = [];
    const yearlyData: { [year: number]: { original: number; new: number } } = {};

    // 处理原始方案
    original.schedule.forEach((payment) => {
      const year = payment.date.getFullYear();
      if (!yearlyData[year]) {
        yearlyData[year] = { original: payment.endingBalance, new: 0 };
      } else {
        yearlyData[year].original = payment.endingBalance;
      }
    });

    // 处理新方案
    newPlan.schedule.forEach((payment) => {
      const year = payment.date.getFullYear();
      if (!yearlyData[year]) {
        yearlyData[year] = { original: 0, new: payment.endingBalance };
      } else {
        yearlyData[year].new = payment.endingBalance;
      }
    });

    // 转换为数组
    Object.keys(yearlyData)
      .sort()
      .forEach((yearStr) => {
        const year = Number(yearStr);
        data.push({
          year,
          original: yearlyData[year].original || 0,
          new: yearlyData[year].new || 0,
        });
      });

    return data;
  };

  const balanceData = prepareBalanceData(original.schedule);

  // 利息对比数据
  const interestComparison = [
    { name: 'Original Plan', value: original.totalInterest, color: '#3b82f6' },
    { name: 'With Extra Payments', value: newPlan.totalInterest, color: '#10b981' },
  ];

  // 本金和利息占比数据（使用第一个还款期的期初余额作为本金）
  const principalAmount = original.schedule[0]?.beginningBalance || 0;
  const principalInterestData = [
    { name: 'Principal', value: principalAmount, color: '#8b5cf6' },
    { name: 'Interest', value: original.totalInterest, color: '#f59e0b' },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8">
      {/* 余额变化趋势图 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Balance Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={balanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={formatCurrency}
              width={80}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="original"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Original Plan"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="new"
              stroke="#10b981"
              strokeWidth={2}
              name="With Extra Payments"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 利息对比柱状图 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Total Interest Comparison
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={interestComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={formatCurrency}
                width={80}
              />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]}>
                {interestComparison.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 本金和利息占比饼图 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Principal vs Interest (Original Plan)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={principalInterestData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {principalInterestData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

