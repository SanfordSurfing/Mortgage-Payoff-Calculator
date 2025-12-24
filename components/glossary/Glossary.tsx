'use client';

/**
 * 概念解释组件
 * 围绕"how to pay off a mortgage faster"主题，帮助用户理解计算器结果
 * 每个概念150-300字，服务SEO优化
 */

export default function Glossary() {
  const concepts = [
    {
      term: 'Principal',
      explanation: `The principal is the original amount of money you borrowed to purchase your home. When you look at your calculator results, the principal is the foundation of everything—it's what you actually owe, separate from the interest charges.

Understanding your principal is crucial for paying off your mortgage faster because every extra dollar you pay goes directly toward reducing this amount. In your amortization table, you'll see that each monthly payment is split between principal and interest. Early in your loan term, most of your payment goes to interest, but as time passes, more goes toward principal.

When you make extra payments, they reduce your principal balance immediately. This creates a powerful compounding effect: a lower principal means less interest charged each month, which means more of your regular payment goes toward principal, accelerating your payoff timeline. The calculator shows you exactly how much faster you can pay off your mortgage by reducing the principal through extra payments.`,
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      term: 'Interest and How It Works',
      explanation: `Interest is the cost of borrowing money, calculated as a percentage of your remaining principal balance. In your calculator results, you'll see interest charges in two key places: the monthly interest amount in your amortization table, and the total interest paid over the life of your loan.

Here's why understanding interest matters for paying off your mortgage faster: interest is calculated monthly based on your current principal balance. The higher your balance, the more interest you pay. This is why the first few years of your mortgage feel like you're barely making progress—most of your payment is going to interest, not reducing what you actually owe.

When you make extra payments, you're directly attacking this interest problem. By reducing your principal balance, you immediately lower the amount of interest charged in future months. The calculator's "Interest Saved" metric shows you exactly how much money you'll keep in your pocket by making extra payments. This isn't just theoretical savings—it's real money that stays with you instead of going to the bank.`,
      icon: (
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      term: 'Amortization Schedule',
      explanation: `The amortization schedule is the detailed breakdown of every payment you'll make over the life of your loan. In your calculator results, this appears as the "Amortization Table," showing month by month how each payment is split between principal and interest.

Understanding amortization is key to seeing why extra payments are so powerful. In a standard amortization schedule, your monthly payment stays the same, but the proportion going to principal vs. interest changes dramatically over time. Early payments are mostly interest (sometimes 70-80%), while later payments are mostly principal. This is why it feels like you're not making progress in the first few years.

When you make extra payments, you're essentially jumping ahead in the amortization schedule. Each extra dollar reduces your principal, which means future payments will have a higher principal-to-interest ratio sooner. The calculator shows you two schedules side-by-side: your original plan and your accelerated plan with extra payments. Compare them to see exactly how much time and money you're saving.`,
      icon: (
        <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      term: 'Extra Payments Strategy',
      explanation: `Extra payments are any payments you make beyond your required monthly payment. The calculator allows you to model three types: monthly extra payments, annual extra payments, and one-time lump sum payments. Each type has different impacts on your payoff timeline.

Monthly extra payments are the most powerful because they compound month after month. Even $100 extra per month can shave years off your mortgage and save tens of thousands in interest. The calculator shows you exactly how this works: each extra payment immediately reduces your principal, which reduces next month's interest charge, which means more of your regular payment goes to principal.

Annual extra payments (like a tax refund or bonus) are also effective, especially if you can't commit to monthly extras. A one-time payment can make a significant dent, but regular extra payments create more consistent acceleration. The key insight from your calculator results is the "Time Saved" metric—this shows you how many months or years earlier you'll be mortgage-free. Compare this to the "Interest Saved" to see the full financial picture of your extra payment strategy.`,
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      term: 'Total Interest Paid',
      explanation: `Total interest is the cumulative amount of interest you'll pay over the entire life of your mortgage. In your calculator results, you'll see this displayed prominently in the summary section, showing both your original plan's total interest and your new plan's total interest with extra payments.

This number can be shocking—on a 30-year mortgage, you might pay more in interest than the original loan amount. Understanding total interest is crucial because it shows the true cost of borrowing. When you see "Total Interest" in your results, remember that this is money going to the bank, not building equity in your home.

The calculator's "Interest Saved" metric is one of the most important numbers to understand. It shows you exactly how much money stays in your pocket by making extra payments. This isn't just a theoretical savings—it's real money you can use for other goals. The percentage reduction shows you the relative impact: even a 20-30% reduction in total interest can represent tens of thousands of dollars saved. Compare the original and new plan's total interest to see the dramatic difference extra payments make.`,
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      term: 'Payoff Time and Time Saved',
      explanation: `Payoff time is how long it will take to completely pay off your mortgage. In your calculator results, you'll see this displayed as "Payoff Time" for both your original plan and your accelerated plan with extra payments.

Understanding payoff time is essential because it shows you the timeline to financial freedom. Every month you're paying a mortgage is a month you're not building wealth in other ways. The calculator's "Time Saved" metric is perhaps the most motivating number—it shows you exactly how many months or years earlier you'll be mortgage-free.

This time savings compounds in powerful ways. Not only do you stop making mortgage payments earlier, but you also start building wealth with that money sooner. If you're saving 5 years on a 30-year mortgage, that's 60 months of payments you can redirect to investments, retirement savings, or other goals. The calculator makes this tangible by showing you side-by-side comparisons: your original payoff date versus your accelerated payoff date. Use this to set realistic goals and track your progress toward mortgage freedom.`,
      icon: (
        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      term: 'Monthly Payment Breakdown',
      explanation: `Your monthly payment is the fixed amount you pay each month, which includes both principal and interest. In the calculator results, you'll see this displayed as your "Base Payment" in the repayment plan section.

Understanding your monthly payment breakdown is crucial because it shows you where your money is actually going. In the amortization table, you can see exactly how each payment is split: X dollars to principal, Y dollars to interest, and Z dollars in extra payments (if applicable). This transparency helps you see the impact of extra payments in real-time.

When you make extra payments, your base monthly payment doesn't change, but the extra amount goes directly to principal. This means you're paying down your loan faster without increasing your required monthly obligation. The calculator shows you the total payment (base + extra) so you can see the full picture. The key insight is that even small extra payments can significantly accelerate your payoff because they reduce the principal, which reduces future interest charges. Use the amortization table to see how your payment breakdown changes month by month as you make progress.`,
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-lg p-6 sm:p-8 border border-gray-100/50">
      <header className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Understanding Your Mortgage Payoff Results: How to Pay Off Your Mortgage Faster
        </h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          The calculator results show you exactly how extra payments can accelerate your mortgage payoff and save thousands in interest. Below, we explain each key concept so you can fully understand what the numbers mean and how to use them to pay off your mortgage faster.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {concepts.map((item, index) => (
          <article
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100/50 hover:border-gray-200"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
              <div className="flex-shrink-0">{item.icon}</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                {item.term}
              </h3>
            </div>
            <div className="prose prose-sm sm:prose-base max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.explanation}
              </p>
            </div>
          </article>
        ))}
      </div>

      <footer className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-gray-600 text-sm sm:text-base text-center">
          Use these explanations to better understand your calculator results and make informed decisions about how to pay off your mortgage faster. Every extra payment brings you closer to financial freedom.
        </p>
      </footer>
    </section>
  );
}

