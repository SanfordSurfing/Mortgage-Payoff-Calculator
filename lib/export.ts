/**
 * 导出功能模块
 * 支持导出为 PDF、Excel 和图片
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import type { CalculationResult, PaymentDetail } from '@/types';

/**
 * 格式化货币
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * 导出为 PDF
 */
export async function exportToPDF(
  result: CalculationResult,
  elementId: string = 'results-container'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Results container not found');
  }

  try {
    // 设置导出模式：显示所有内容
    element.setAttribute('data-export-all', 'true');
    
    // 等待 React 重新渲染
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 等待 DOM 更新和图表渲染完成
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 确保所有 SVG 元素都已渲染
    const svgElements = element.querySelectorAll('svg');
    if (svgElements.length > 0) {
      await Promise.all(
        Array.from(svgElements).map(
          (svg) =>
            new Promise<void>((resolve) => {
              const checkComplete = () => {
                // 检查 SVG 是否有内容
                if (svg.children.length > 0 || svg.innerHTML.trim().length > 0) {
                  resolve();
                } else {
                  setTimeout(checkComplete, 50);
                }
              };
              checkComplete();
            })
        )
      );
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 使用 html2canvas 将元素转换为图片
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      removeContainer: false,
      allowTaint: true,
      imageTimeout: 15000,
    });

    // 使用 JPEG 格式并压缩质量以减小文件大小
    const imgData = canvas.toDataURL('image/jpeg', 0.85);

    // 创建 PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgScaledWidth = imgWidth * ratio;
    const imgScaledHeight = imgHeight * ratio;

    // 如果内容超过一页，需要分页
    const pageHeight = pdfHeight;
    let heightLeft = imgScaledHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgScaledWidth, imgScaledHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgScaledHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgScaledWidth, imgScaledHeight);
      heightLeft -= pageHeight;
    }

    // 保存 PDF
    pdf.save('mortgage-payoff-calculation.pdf');
  } finally {
    // 恢复原始显示状态
    element.removeAttribute('data-export-all');
  }
}

/**
 * 导出为 Excel
 */
export function exportToExcel(result: CalculationResult): void {
  const workbook = XLSX.utils.book_new();

  // 创建摘要工作表
  const summaryData = [
    ['Mortgage Payoff Calculator - Summary'],
    [],
    ['Original Plan'],
    ['Total Interest', formatCurrency(result.original.totalInterest)],
    ['Total Payment', formatCurrency(result.original.totalPayment)],
    ['Total Periods', result.original.totalPeriods],
    ['Monthly Payment', formatCurrency(result.original.monthlyPayment)],
    [],
    ['New Plan'],
    ['Payment Option', result.repaymentOption === 'extra' ? 'Repayment with extra payments' : 'Normal repayment'],
  ];

  // 如果有额外还款，添加额外还款详情
  if (result.repaymentOption === 'extra' && result.extraPaymentDetails) {
    if (result.extraPaymentDetails.perMonth) {
      summaryData.push(['Extra Payment per Month', formatCurrency(result.extraPaymentDetails.perMonth)]);
    }
    if (result.extraPaymentDetails.perYear) {
      summaryData.push(['Extra Payment per Year', formatCurrency(result.extraPaymentDetails.perYear)]);
    }
    if (result.extraPaymentDetails.oneTime) {
      summaryData.push(['Extra Payment One Time', formatCurrency(result.extraPaymentDetails.oneTime)]);
    }
  }

  summaryData.push(
    [],
    ['New Plan Results'],
    ['Total Interest', formatCurrency(result.new.totalInterest)],
    ['Total Payment', formatCurrency(result.new.totalPayment)],
    ['Total Periods', result.new.totalPeriods],
    ['Monthly Payment', formatCurrency(result.new.monthlyPayment)],
    []
  );

  // 如果有节省，添加节省信息
  if (result.savings.interestSaved > 0) {
    summaryData.push(
      ['Savings'],
      ['Interest Saved', formatCurrency(result.savings.interestSaved)],
      ['Interest Saved %', `${result.savings.interestSavedPercent.toFixed(2)}%`],
      ['Time Saved (Months)', result.savings.timeSavedMonths]
    );
  }

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  
  // 设置 Summary 工作表列宽（自适应内容）
  summarySheet['!cols'] = [{ wch: 25 }, { wch: 30 }];
  
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

  // 创建原始方案还款明细表
  const originalScheduleData = [
    [
      'Remaining Period',
      'Beginning Balance',
      'Payment',
      'Principal',
      'Interest',
      'Ending Balance',
    ],
    ...result.original.schedule.map((p: PaymentDetail) => [
      p.period,
      p.beginningBalance,
      p.payment,
      p.principal,
      p.interest,
      p.endingBalance,
    ]),
  ];

  const originalSheet = XLSX.utils.aoa_to_sheet(originalScheduleData);
  
  // 设置列宽（自适应内容宽度）
  // 计算每列的最大宽度
  const originalColWidths = [15]; // Remaining Period
  for (let C = 1; C < originalScheduleData[0].length; C++) {
    let maxWidth = 18; // 默认宽度
    for (let R = 0; R < originalScheduleData.length; R++) {
      const cellValue = originalScheduleData[R][C];
      if (cellValue !== undefined && cellValue !== null) {
        // 对于数字，使用格式化后的长度
        const cellStr = typeof cellValue === 'number' 
          ? formatCurrency(cellValue) 
          : String(cellValue);
        maxWidth = Math.max(maxWidth, cellStr.length + 2);
      }
    }
    originalColWidths.push(Math.min(maxWidth, 25)); // 限制最大宽度为 25
  }
  originalSheet['!cols'] = originalColWidths.map(w => ({ wch: w }));
  
  XLSX.utils.book_append_sheet(workbook, originalSheet, 'Original Plan');

  // 创建新方案还款明细表（如果有额外还款）
  if (result.savings.interestSaved > 0) {
    const newScheduleData = [
      [
        'Remaining Period',
        'Beginning Balance',
        'Payment',
        'Principal',
        'Interest',
        'Extra Payment',
        'Ending Balance',
      ],
      ...result.new.schedule.map((p: PaymentDetail) => [
        p.period,
        p.beginningBalance,
        p.payment,
        p.principal,
        p.interest,
        p.extraPayment,
        p.endingBalance,
      ]),
    ];

    const newSheet = XLSX.utils.aoa_to_sheet(newScheduleData);
    
    // 设置列宽（自适应内容宽度）
    const newColWidths = [15]; // Remaining Period
    for (let C = 1; C < newScheduleData[0].length; C++) {
      let maxWidth = 18; // 默认宽度
      for (let R = 0; R < newScheduleData.length; R++) {
        const cellValue = newScheduleData[R][C];
        if (cellValue !== undefined && cellValue !== null) {
          const cellStr = typeof cellValue === 'number' 
            ? formatCurrency(cellValue) 
            : String(cellValue);
          maxWidth = Math.max(maxWidth, cellStr.length + 2);
        }
      }
      newColWidths.push(Math.min(maxWidth, 25)); // 限制最大宽度为 25
    }
    newSheet['!cols'] = newColWidths.map(w => ({ wch: w }));
    
    XLSX.utils.book_append_sheet(workbook, newSheet, 'With Extra Payments');
  }

  // 保存 Excel 文件
  XLSX.writeFile(workbook, 'mortgage-payoff-calculation.xlsx');
}

/**
 * 导出为图片
 */
export async function exportToImage(
  elementId: string = 'results-container',
  filename: string = 'mortgage-payoff-calculation.png'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Results container not found');
  }

  try {
    // 设置导出模式：显示所有内容
    element.setAttribute('data-export-all', 'true');
    
    // 等待 React 重新渲染
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 等待 DOM 更新和图表渲染完成
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 确保所有 SVG 元素都已渲染
    const svgElements = element.querySelectorAll('svg');
    if (svgElements.length > 0) {
      await Promise.all(
        Array.from(svgElements).map(
          (svg) =>
            new Promise<void>((resolve) => {
              const checkComplete = () => {
                // 检查 SVG 是否有内容
                if (svg.children.length > 0 || svg.innerHTML.trim().length > 0) {
                  resolve();
                } else {
                  setTimeout(checkComplete, 50);
                }
              };
              checkComplete();
            })
        )
      );
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      removeContainer: false,
      allowTaint: true,
      imageTimeout: 15000,
    });

    // 转换为图片并下载（使用 JPEG 格式并压缩）
    const link = document.createElement('a');
    link.download = filename.replace('.png', '.jpg');
    link.href = canvas.toDataURL('image/jpeg', 0.85);
    link.click();
  } finally {
    // 恢复原始显示状态
    element.removeAttribute('data-export-all');
  }
}

