import MortgageCalculator from '@/components/calculator/MortgageCalculator';
import Glossary from '@/components/glossary/Glossary';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent px-4">
          Mortgage Payoff Calculator
        </h1>
        <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
          Calculate how much time and money you can save by making extra payments on your mortgage. 
          Supports monthly and bi-weekly payments. Export your results as PDF, Excel, or image.
        </p>
        
        <MortgageCalculator />

        {/* 名词解释部分 */}
        <div className="mt-16">
          <Glossary />
        </div>
      </div>
    </main>
  );
}

