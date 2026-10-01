import React from 'react';
import { MarketItem } from '../types/market';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistSymbols: string[];
  allSymbols: MarketItem[];
  onRemove: (symbol: string) => void;
  onSelectSymbol: (item: MarketItem) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistSymbols,
  allSymbols,
  onRemove,
  onSelectSymbol
}) => {
  if (!isOpen) return null;

  const watchlistItems = allSymbols.filter((item) =>
    watchlistSymbols.includes(item.symbol)
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#E0E3EB] animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#E0E3EB] flex items-center justify-between bg-[#faf9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 fill text-[22px]">star</span>
            <h3 className="font-bold text-[16px] text-[#131722]">My Watchlist</h3>
            <span className="text-[12px] text-[#787B86] bg-[#ebedfa] px-2 py-0.5 rounded-full font-semibold tabular-nums">
              {watchlistItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#F0F3FA] hover:bg-[#ebedfa] flex items-center justify-center text-[#131722]"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-[#E0E3EB]/50">
          {watchlistItems.length === 0 ? (
            <div className="py-16 text-center text-[#787B86] px-6">
              <span className="material-symbols-outlined text-[44px] text-[#787B86]/40 mb-2">bookmark_border</span>
              <p className="text-[15px] font-semibold text-[#131722]">Your watchlist is empty</p>
              <p className="text-[13px] text-[#787B86] mt-1">
                Click the star icon or any market card on the terminal to pin symbols for quick real-time tracking.
              </p>
            </div>
          ) : (
            watchlistItems.map((item) => {
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
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ebedfa] text-[#131722] font-bold text-[12px] flex items-center justify-center shrink-0 uppercase">
                      {item.badge || item.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-[14px] text-[#131722] group-hover:text-[#0049db] transition-colors">
                        {item.symbol}
                      </div>
                      <div className="text-[11px] text-[#787B86] truncate max-w-[150px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-semibold text-[14px] text-[#131722] tabular-nums">
                        {item.type === 'crypto' || item.type === 'stock' || item.type === 'commodity' ? '$' : ''}
                        {item.price.toLocaleString(undefined, { minimumFractionDigits: item.price < 2 ? 4 : 2 })}
                      </div>
                      <div className={`text-[12px] font-semibold tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {isUp ? '+' : ''}{item.pctChange.toFixed(2)}%
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item.symbol);
                      }}
                      className="text-[#787B86] hover:text-[#f23645] p-1 rounded-full opacity-60 hover:opacity-100 transition-opacity"
                      title="Remove from Watchlist"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F0F3FA] border-t border-[#E0E3EB] text-[12px] text-[#787B86] flex items-center justify-between">
          <span>Synced with local storage</span>
          <button
            onClick={() => watchlistItems.forEach(item => onRemove(item.symbol))}
            disabled={watchlistItems.length === 0}
            className="text-[#f23645] hover:underline disabled:opacity-40 disabled:no-underline font-medium"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};
