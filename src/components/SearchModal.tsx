import React, { useState, useEffect, useMemo } from 'react';
import { MarketItem } from '../types/market';
import { 
  MAJOR_INDICES, 
  WORLD_INDICES, 
  EXTENDED_STOCKS_LIST, 
  CRYPTO_LIST, 
  FOREX_LIST, 
  COMMODITIES_LIST 
} from '../data/marketsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (item: MarketItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectSymbol }) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'stock' | 'crypto' | 'forex' | 'index' | 'commodity'>('all');

  // Combined master catalog
  const allItems: MarketItem[] = useMemo(() => {
    return [
      ...MAJOR_INDICES,
      ...WORLD_INDICES,
      ...EXTENDED_STOCKS_LIST,
      ...CRYPTO_LIST,
      ...FOREX_LIST,
      ...COMMODITIES_LIST
    ];
  }, []);

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesType = filterType === 'all' || item.type === filterType;
      const q = query.trim().toLowerCase();
      if (!q) return matchesType;
      const matchesQuery = 
        item.symbol.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        (item.exchange && item.exchange.toLowerCase().includes(q));
      return matchesType && matchesQuery;
    });
  }, [allItems, query, filterType]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E0E3EB] gap-3">
          <span className="material-symbols-outlined text-[#787B86] text-[22px]">search</span>
          <input
            type="text"
            placeholder="Search symbol, stock, currency or index (e.g. NVDA, BTC, S&P 500)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-[15px] font-medium text-[#131722] placeholder:text-[#787B86] focus:outline-none bg-transparent"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-[#787B86] hover:text-[#131722] text-xs px-2 py-1 rounded bg-[#F0F3FA]"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] text-[#787B86] bg-[#F0F3FA] border border-[#E0E3EB] px-2 py-0.5 rounded font-mono">
            ESC
          </kbd>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#faf9ff] border-b border-[#E0E3EB] overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'stock', label: 'Stocks' },
            { id: 'crypto', label: 'Crypto' },
            { id: 'forex', label: 'Forex' },
            { id: 'index', label: 'Indices' },
            { id: 'commodity', label: 'Commodities' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-[#131722] text-white'
                  : 'text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-[#E0E3EB]/40 flex-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#787B86]">
              <span className="material-symbols-outlined text-[36px] text-[#787B86]/50 mb-2">sentiment_dissatisfied</span>
              <p className="text-[14px]">No markets found matching "{query}"</p>
              <p className="text-[12px] text-[#787B86]/80 mt-1">Try searching for AAPL, TSLA, Gold, or EUR / USD</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isUp = item.pctChange >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectSymbol(item);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F3FA] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Badge */}
                    <div className="w-8 h-8 rounded-full bg-[#ebedfa] text-[#131722] font-bold text-[12px] flex items-center justify-center shrink-0 uppercase">
                      {item.badge || item.countryCode || item.symbol.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] text-[#131722] group-hover:text-[#0049db] transition-colors truncate">
                          {item.symbol}
                        </span>
                        {item.exchange && (
                          <span className="text-[10px] uppercase font-semibold text-[#787B86] bg-[#ebedfa] px-1.5 py-0.2 rounded">
                            {item.exchange}
                          </span>
                        )}
                        <span className="text-[11px] uppercase text-[#787B86] hidden sm:inline">
                          {item.type}
                        </span>
                      </div>
                      <div className="text-[12px] text-[#787B86] truncate">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <div className="font-semibold text-[14px] text-[#131722] tabular-nums">
                      {item.type === 'crypto' || item.type === 'stock' || item.type === 'commodity' ? '$' : ''}
                      {item.price.toLocaleString(undefined, { minimumFractionDigits: item.price < 2 ? 4 : 2 })}
                    </div>
                    <div className={`text-[12px] font-semibold tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isUp ? '+' : ''}{item.pctChange.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 bg-[#F0F3FA] border-t border-[#E0E3EB] text-[11px] text-[#787B86] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>{filteredItems.length} markets available</span>
        </div>
      </div>
    </div>
  );
};
