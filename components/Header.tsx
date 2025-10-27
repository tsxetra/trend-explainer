import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center my-12 md:my-16">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-stone-900 font-serif">
        Trend Explainer
      </h1>
      <p className="mt-4 text-lg text-stone-600">
        AI-powered briefs on what's now, new, and next.
      </p>
    </header>
  );
};

export default Header;