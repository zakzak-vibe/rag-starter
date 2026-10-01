import React from 'react';
import { MarketItem } from '../types/market';
import { MAJOR_INDICES, WORLD_INDICES } from '../data/marketsData';

interface IndicesViewProps {
  onSelectSymbol: (item: MarketItem) => void;
  onOpenChartModal: (item?: MarketItem) => void;
}

export const IndicesView: React.FC<IndicesViewProps> = ({ onSelectSymbol, onOpenChartModal }) => {
  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 py-8">
      <div>
        <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#131722] tracking-tight">
          Global Market Indices
        </h1>
        <p className="text-[13px] text-[#787B86] mt-1 mb-6">
          Benchmark indexes across Americas, Europe, Asia, and emerging markets.
        </p>
      </div>

      {/* Americas Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] font-bold text-[#131722]">Americas</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#089981]/15 text-[#089981]">
              MARKET OPEN
            </span>
          </div>
          <span className="text-[12px] text-[#787B86]">NYSE & NASDAQ Sessions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MAJOR_INDICES.map((idx) => {
            const isUp = idx.pctChange >= 0;
            return (
              <div
                key={idx.id}
                onClick={() => onSelectSymbol(idx)}
                className="p-4 rounded-2xl bg-white border border-[#E0E3EB] hover:border-[#0049db] hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-[13px] shadow-xs"
                    style={{ backgroundColor: idx.badgeBg }}
                  >
                    {idx.badge}
                  </span>
                  <div>
                    <div className="font-bold text-[15px] text-[#131722]">{idx.name}</div>
                    <div className="text-[12px] text-[#787B86]">{idx.symbol} · US</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[16px] font-extrabold text-[#131722] tabular-nums">
                    {idx.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className={`text-[12px] font-semibold tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                    {isUp ? '+' : '−'}{Math.abs(idx.pctChange).toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global & World Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] font-bold text-[#131722]">Europe & Asia-Pacific</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ebedfa] text-[#787B86]">
              POST-MARKET / CLOSED
            </span>
          </div>
          <span className="text-[12px] text-[#787B86]">International Trading Hubs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORLD_INDICES.map((w) => {
            const isUp = w.pctChange >= 0;
            return (
              <div
                key={w.id}
                onClick={() => onSelectSymbol(w)}
                className="p-4 rounded-xl bg-white border border-[#E0E3EB] hover:border-[#0049db] hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-full bg-[#F0F3FA] font-bold text-[12px] flex items-center justify-center text-[#131722]">
                    {w.countryCode}
                  </span>
                  <span className={`text-[12px] font-semibold tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                    {isUp ? '+' : '−'}{Math.abs(w.pctChange).toFixed(2)}%
                  </span>
                </div>
                <div className="font-bold text-[15px] text-[#131722] truncate">{w.symbol}</div>
                <div className="text-[12px] text-[#787B86] truncate mb-2">{w.name}</div>
                <div className="text-[16px] font-extrabold text-[#131722] tabular-nums">
                  {w.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
