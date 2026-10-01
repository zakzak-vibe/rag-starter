import React from 'react';
import { MarketItem } from '../types/market';
import { COMMODITIES_LIST } from '../data/marketsData';

interface FuturesViewProps {
  onSelectSymbol: (item: MarketItem) => void;
  onOpenChartModal: (item?: MarketItem) => void;
}

export const FuturesView: React.FC<FuturesViewProps> = ({ onSelectSymbol, onOpenChartModal }) => {
  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 py-8">
      <div>
        <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#131722] tracking-tight">
          Futures & Commodities
        </h1>
        <p className="text-[13px] text-[#787B86] mt-1 mb-6">
          Precious metals, energy contracts, agricultural benchmarks, and raw materials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMMODITIES_LIST.map((comm) => {
          const isUp = comm.pctChange >= 0;
          return (
            <div
              key={comm.id}
              onClick={() => onSelectSymbol(comm)}
              className="p-5 rounded-2xl bg-white border border-[#E0E3EB] hover:border-[#0049db] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-bold text-[#787B86] bg-[#F0F3FA] px-2 py-0.5 rounded">
                    {comm.exchange}
                  </span>
                  <span className={`text-[13px] font-bold tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                    {isUp ? '+' : '−'}{Math.abs(comm.pctChange).toFixed(2)}%
                  </span>
                </div>

                <div className="font-extrabold text-[18px] text-[#131722] mb-1">
                  {comm.symbol}
                </div>
                <div className="text-[13px] text-[#787B86] mb-4">
                  Contract size: {comm.category}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E0E3EB] flex items-baseline justify-between">
                <span className="text-[12px] text-[#787B86]">Last Price</span>
                <div className="text-[20px] font-extrabold text-[#131722] tabular-nums">
                  ${comm.price.toFixed(2)} <span className="text-[12px] font-normal text-[#787B86]">USD</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
