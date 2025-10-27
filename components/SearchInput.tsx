import React from 'react';

interface SearchInputProps {
  onSearch: (trend: string) => void;
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading, value, onChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 'Bio-hacking' or 'Cottagecore'"
        className="flex-grow w-full px-5 py-3 text-lg bg-transparent text-stone-900 border-2 border-stone-300 rounded-md focus:ring-2 focus:ring-[#E5734B] focus:border-[#E5734B] focus:outline-none transition-all duration-300 disabled:opacity-50"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="px-8 py-3 bg-[#E5734B] text-white font-bold text-lg rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#FDFBF7] focus:ring-[#E5734B] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
        disabled={isLoading}
      >
        {isLoading ? 'Decoding...' : 'Decode'}
      </button>
    </form>
  );
};

export default SearchInput;