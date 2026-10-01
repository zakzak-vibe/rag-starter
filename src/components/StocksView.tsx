import React, { useState } from 'react';
import { MarketItem } from '../types/market';
import { EXTENDED_STOCKS_LIST } from '../data/marketsData';

interface StocksViewProps {
  onSelectSymbol: (item: MarketItem) => void;
  onOpenChartModal: (item?: MarketItem) => void;
}

export const StocksView: React.FC<StocksViewProps> = ({ onSelectSymbol, onOpenChartModal }) => {
  const [sectorFilter, setSectorFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'volume' | 'pctChange' | 'price'>('volume');
  const [search, setSearch] = useState('');

  const sectors = ['All', 'Technology', 'Semiconductors', 'Automotive', 'Healthcare', 'Financials'];

  const filteredStocks = EXTENDED_STOCKS_LIST.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(search.toLowerCase()) || stock.symbol.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'pctChange') return Math.abs(b.pctChange) - Math.abs(a.pctChange);
    if (sortBy === 'price') return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 py-8">
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#131722] tracking-tight">
            US Stocks Screener
          </h1>
          <p className="text-[13px] text-[#787B86] mt-1">
            Real-time equity quotes, volume leaders, technical momentum, and financial fundamentals.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenChartModal(EXTENDED_STOCKS_LIST[0])}
            className="px-4 py-2 rounded-full bg-[#131722] text-white text-[13px] font-semibold flex items-center gap-1.5 hover:bg-black transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">show_chart</span>
            <span>Launch Full Chart</span>
          </button>
        </div>
      </div>

      {/* Sector Pill Strip & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-[#F0F3FA] p-3 rounded-2xl border border-[#E0E3EB]">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {sectors.map(sec => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors whitespace-nowrap ${
                sectorFilter === sec ? 'bg-[#131722] text-white shadow-xs' : 'text-[#787B86] hover:text-[#131722]'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter ticker..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 sm:w-48 px-3 py-1 bg-white text-[12px] rounded-lg border border-[#E0E3EB] text-[#131722] focus:outline-none focus:ring-1 focus:ring-[#0049db]"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1 bg-white text-[12px] rounded-lg border border-[#E0E3EB] text-[#131722] focus:outline-none"
          >
            <option value="volume">Sort by Volume</option>
            <option value="pctChange">Sort by Momentum</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E0E3EB] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E0E3EB] bg-[#faf9ff] text-[11px] font-bold uppercase tracking-wider text-[#787B86]">
                <th className="py-3 px-4">Symbol</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">Change</th>
                <th className="py-3 px-4 text-right">% Change</th>
                <th className="py-3 px-4 text-right hidden sm:table-cell">Volume</th>
                <th className="py-3 px-4 text-right hidden md:table-cell">Market Cap</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]/50 text-[13px]">
              {filteredStocks.map((stock) => {
                const isStockUp = stock.pctChange >= 0;
                return (
                  <tr
                    key={stock.id}
                    onClick={() => onSelectSymbol(stock)}
                    className="hover:bg-[#F0F3FA] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-bold text-[#131722] group-hover:text-[#0049db]">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#ebedfa] flex items-center justify-center text-[10px] font-bold">
                          {stock.badge || stock.symbol.slice(0, 2)}
                        </span>
                        <span>{stock.symbol}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#787B86] max-w-[180px] truncate">
                      {stock.name}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#131722] tabular-nums">
                      ${stock.price.toFixed(2)}
                    </td>
                    <td className={`py-3 px-4 text-right font-semibold tabular-nums ${isStockUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isStockUp ? '+' : '−'}${Math.abs(stock.change).toFixed(2)}
                    </td>
                    <td className={`py-3 px-4 text-right font-semibold tabular-nums ${isStockUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isStockUp ? '+' : '−'}{Math.abs(stock.pctChange).toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 text-right text-[#787B86] tabular-nums hidden sm:table-cell">
                      {stock.volume || '18.4M'}
                    </td>
                    <td className="py-3 px-4 text-right text-[#787B86] tabular-nums hidden md:table-cell">
                      {stock.marketCap || '450B'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenChartModal(stock);
                        }}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#0049db] bg-[#0049db]/10 hover:bg-[#0049db]/20 transition-colors"
                      >
                        Chart
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
