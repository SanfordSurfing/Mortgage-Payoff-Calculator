'use client';

/**
 * 名词解释组件
 * 图文并茂地解释房贷相关术语
 */

export default function Glossary() {
  const terms = [
    {
      term: 'Principal',
      definition: 'The original amount of money borrowed from the lender. This is the total loan amount before any interest is added.',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      term: 'Interest',
      definition: 'The cost of borrowing money, expressed as a percentage of the principal. Interest is the fee you pay to the lender for using their money.',
      icon: (
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      term: 'Annual Interest Rate (APR)',
      definition: 'The yearly interest rate charged on your loan. For example, a 5.5% annual interest rate means you pay 5.5% of the remaining principal each year.',
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      term: 'Amortization',
      definition: 'The process of paying off a loan over time through regular payments. Each payment covers both interest and principal, with the proportion changing over time.',
      icon: (
        <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      term: 'Monthly Payment',
      definition: 'The fixed amount you pay each month, which includes both principal and interest. This amount stays the same throughout the loan term (unless you make extra payments).',
      icon: (
        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      term: 'Bi-weekly Payment',
      definition: 'Making payments every two weeks instead of monthly. This results in 26 payments per year (equivalent to 13 monthly payments), which can help you pay off your loan faster.',
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      term: 'Extra Payment',
      definition: 'Any payment made in addition to your regular monthly payment. Extra payments go directly toward reducing the principal, which saves you interest over time.',
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      term: 'Current Balance',
      definition: 'The remaining amount you still owe on your loan. This decreases with each payment you make.',
      icon: (
        <svg className="w-12 h-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-lg p-8 border border-gray-100/50">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Mortgage Terms Explained
      </h2>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
        Understanding these key terms will help you make better financial decisions.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {terms.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100/50 hover:border-gray-200"
          >
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0">{item.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {item.term}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.definition}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

