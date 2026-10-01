import React, { useState } from 'react';
import { MarketItem } from '../types/market';
import { CRYPTO_LIST } from '../data/marketsData';

interface CryptoViewProps {
  onSelectSymbol: (item: MarketItem) => void;
  onOpenChartModal: (item?: MarketItem) => void;
}

export const CryptoView: React.FC<CryptoViewProps> = ({ onSelectSymbol, onOpenChartModal }) => {
  const [calcAmount, setCalcAmount] = useState('1');
  const [selectedCoin, setSelectedCoin] = useState('BTCUSD');

  const activeCoin = CRYPTO_LIST.find(c => c.symbol === selectedCoin) || CRYPTO_LIST[0];
  const convertedUsd = (parseFloat(calcAmount) || 0) * activeCoin.price;

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 py-8">
      {/* Title & Market Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#131722] tracking-tight">
            Cryptocurrency Markets
          </h1>
          <p className="text-[13px] text-[#787B86] mt-1">
            Global digital assets, on-chain volume, market cap dominance, and instant conversions.
          </p>
        </div>
      </div>

      {/* Top Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-4 rounded-xl bg-white border border-[#E0E3EB] shadow-xs">
          <div className="text-[11px] font-bold uppercase text-[#787B86]">Total Market Cap</div>
          <div className="text-[18px] font-extrabold text-[#131722] tabular-nums mt-1">$2.42 Trillion</div>
          <div className="text-[11px] text-[#089981] font-semibold mt-0.5">+2.15% (24h)</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E0E3EB] shadow-xs">
          <div className="text-[11px] font-bold uppercase text-[#787B86]">24h Total Volume</div>
          <div className="text-[18px] font-extrabold text-[#131722] tabular-nums mt-1">$84.6 Billion</div>
          <div className="text-[11px] text-[#787B86] mt-0.5">Across 420 exchanges</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E0E3EB] shadow-xs">
          <div className="text-[11px] font-bold uppercase text-[#787B86]">BTC Dominance</div>
          <div className="text-[18px] font-extrabold text-[#131722] tabular-nums mt-1">56.4%</div>
          <div className="text-[11px] text-[#0049db] font-semibold mt-0.5">ETH 14.2% · SOL 3.8%</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E0E3EB] shadow-xs">
          <div className="text-[11px] font-bold uppercase text-[#787B86]">Ethereum Gas</div>
          <div className="text-[18px] font-extrabold text-[#131722] tabular-nums mt-1">11 Gwei</div>
          <div className="text-[11px] text-[#089981] font-semibold mt-0.5">Low network congestion</div>
        </div>
      </div>

      {/* Converter Widget & Crypto Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Converter Tool */}
        <div className="p-5 rounded-2xl bg-[#F0F3FA] border border-[#E0E3EB] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#0049db] text-[20px]">currency_exchange</span>
              <h3 className="font-bold text-[16px] text-[#131722]">Instant Crypto Converter</h3>
            </div>
            <p className="text-[12px] text-[#787B86] mb-4">
              Real-time exchange rate calculation against USD index.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#787B86] block mb-1">Asset</label>
                <select
                  value={selectedCoin}
                  onChange={(e) => setSelectedCoin(e.target.value)}
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E0E3EB] text-[13px] font-semibold text-[#131722] focus:outline-none"
                >
                  {CRYPTO_LIST.map(c => (
                    <option key={c.id} value={c.symbol}>
                      {c.name} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#787B86] block mb-1">Amount</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(e.target.value)}
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E0E3EB] text-[15px] font-bold text-[#131722] focus:outline-none"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E0E3EB] text-center">
                <div className="text-[11px] text-[#787B86]">Converted Value (USD)</div>
                <div className="text-[22px] font-extrabold text-[#089981] tabular-nums mt-0.5">
                  ${convertedUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#787B86] pt-4 mt-2 border-t border-[#E0E3EB]">
            1 {activeCoin.symbol} = ${activeCoin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
          </div>
        </div>

        {/* Major Coins List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E0E3EB] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[16px] text-[#131722]">Top Cryptocurrencies by Market Cap</h3>
            <span className="text-[12px] text-[#787B86]">Live pricing</span>
          </div>

          <div className="divide-y divide-[#E0E3EB]/50">
            {CRYPTO_LIST.map((coin) => {
              const isCoinUp = coin.pctChange >= 0;
              return (
                <div
                  key={coin.id}
                  onClick={() => onSelectSymbol(coin)}
                  className="py-3 flex items-center justify-between hover:bg-[#F0F3FA] px-2 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-full text-white font-bold flex items-center justify-center text-[15px] shadow-xs"
                      style={{ backgroundColor: coin.badgeBg }}
                    >
                      {coin.badge}
                    </div>
                    <div>
                      <div className="font-bold text-[14px] text-[#131722] group-hover:text-[#0049db] transition-colors">
                        {coin.name} <span className="text-[#787B86] text-[12px] font-normal">{coin.symbol}</span>
                      </div>
                      <div className="text-[11px] text-[#787B86]">
                        Cap: {coin.marketCap} · Vol: {coin.volume}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-[15px] font-bold text-[#131722] tabular-nums">
                        ${coin.price.toLocaleString(undefined, { minimumFractionDigits: coin.price < 2 ? 3 : 2 })}
                      </div>
                      <div className={`text-[12px] font-semibold tabular-nums ${isCoinUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {isCoinUp ? '+' : '−'}{Math.abs(coin.pctChange).toFixed(2)}%
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenChartModal(coin);
                      }}
                      className="hidden sm:inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#0049db] bg-[#0049db]/10 hover:bg-[#0049db]/20"
                    >
                      Chart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
