import React, { useState, useCallback } from 'react';
import { Explanation } from './types';
import { explainTrend } from './services/geminiService';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import ExplanationCard from './components/ExplanationCard';
import Loader from './components/Loader';
import Footer from './components/Footer';
import { QuestionMarkIcon, SparklesIcon, UsersIcon } from './components/icons';

const App: React.FC = () => {
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialState, setIsInitialState] = useState<boolean>(true);
  const [currentTrend, setCurrentTrend] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const handleSearch = useCallback(async (trend: string) => {
    setInputValue(trend);
    setIsLoading(true);
    setError(null);
    setExplanation(null);
    setIsInitialState(false);
    setCurrentTrend(trend);

    try {
      const result = await explainTrend(trend);
      setExplanation(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleExampleClick = (trend: string) => {
      handleSearch(trend);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
            <Loader />
            <p className="text-stone-600 text-lg">AI is analyzing "{currentTrend}"...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-md max-w-xl mx-auto" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      );
    }
    
    if (isInitialState) {
        return (
            <div className="text-center text-stone-600">
                <p className="mb-4">Or try one of these examples:</p>
                <div className="flex flex-wrap justify-center gap-3">
                    {['Biohacking', 'Gamification', 'De-influencing'].map(trend => (
                        <button
                            key={trend}
                            onClick={() => handleExampleClick(trend)}
                            className="border border-stone-300 hover:border-stone-500 hover:bg-stone-50 text-stone-700 font-medium py-2 px-4 rounded-md transition-colors"
                        >
                           {trend}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (explanation) {
      return (
        <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
          <h2 className="text-3xl font-bold font-serif text-center text-stone-900 mb-8">
            {currentTrend}
          </h2>
          <ExplanationCard 
            title="What is it?" 
            content={explanation.what}
            icon={<QuestionMarkIcon />}
          />
          <ExplanationCard 
            title="Why is it trending?" 
            content={explanation.why}
            icon={<SparklesIcon />}
          />
          <ExplanationCard 
            title="Who should care?" 
            content={explanation.whoCares}
            icon={<UsersIcon />}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col text-stone-900 font-sans p-4 bg-[#FDFBF7]">
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        <main>
          <div className="mb-12">
            <SearchInput 
              onSearch={handleSearch} 
              isLoading={isLoading}
              value={inputValue}
              onChange={setInputValue}
            />
          </div>
          <div className="mt-8">
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;