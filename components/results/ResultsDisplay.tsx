'use client';

/**
 * 结果展示主组件
 * 整合所有结果展示相关的组件
 */

import type { CalculationResult } from '@/types';
import ResultsSummary from './ResultsSummary';
import ResultsCharts from './ResultsCharts';
import AmortizationTable from './AmortizationTable';
import ExportButtons from './ExportButtons';
import { useState, useEffect } from 'react';

interface ResultsDisplayProps {
  result: CalculationResult;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'charts' | 'table'>('summary');
  const [showOriginalTable, setShowOriginalTable] = useState(false);
  const [showAllForExport, setShowAllForExport] = useState(false);

  const hasExtraPayments = result.savings.interestSaved > 0;

  // 监听导出模式
  useEffect(() => {
    const container = document.getElementById('results-container');
    if (!container) return;

    const observer = new MutationObserver(() => {
      const shouldShowAll = container.getAttribute('data-export-all') === 'true';
      setShowAllForExport(shouldShowAll);
    });

    observer.observe(container, {
      attributes: true,
      attributeFilter: ['data-export-all'],
    });

    return () => observer.disconnect();
  }, []);

  const shouldShowAll = showAllForExport;

  return (
    <div id="results-container" className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Calculation Results
        </h2>
        {!shouldShowAll && <ExportButtons result={result} containerId="results-container" />}
      </div>

      {/* 标签页导航 */}
      {!shouldShowAll && (
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex flex-wrap gap-4 sm:gap-8">
            <button
              onClick={() => setActiveTab('summary')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'summary'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'charts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Charts
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'table'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Amortization Table
            </button>
          </nav>
        </div>
      )}

      {/* 内容区域 */}
      <div>
        {(shouldShowAll || activeTab === 'summary') && (
          <div className={shouldShowAll ? 'mb-8' : ''}>
            {shouldShowAll && <h3 className="text-xl font-semibold text-gray-900 mb-4">Summary</h3>}
            <ResultsSummary result={result} />
          </div>
        )}

        {(shouldShowAll || activeTab === 'charts') && (
          <div className={shouldShowAll ? 'mb-8' : ''}>
            {shouldShowAll && <h3 className="text-xl font-semibold text-gray-900 mb-4">Charts</h3>}
            <ResultsCharts result={result} />
          </div>
        )}

        {(shouldShowAll || activeTab === 'table') && (
          <div className="space-y-6">
            {shouldShowAll && <h3 className="text-xl font-semibold text-gray-900 mb-4">Amortization Table</h3>}
            {hasExtraPayments && !shouldShowAll && (
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showOriginalTable}
                    onChange={(e) => setShowOriginalTable(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Show original plan table (without extra payments)
                  </span>
                </label>
              </div>
            )}

            {(shouldShowAll || showOriginalTable) && hasExtraPayments && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Original Plan (Without Extra Payments)
                </h3>
                <AmortizationTable schedule={result.original.schedule} isExportMode={shouldShowAll} />
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {hasExtraPayments
                  ? 'New Plan (With Extra Payments)'
                  : 'Payment Schedule'}
              </h3>
              <AmortizationTable
                schedule={result.new.schedule}
                showExtraPayments={hasExtraPayments}
                isExportMode={shouldShowAll}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

