import React from 'react';
import { MarketItem } from '../types/market';
import { FOREX_LIST } from '../data/marketsData';

interface ForexViewProps {
  onSelectSymbol: (item: MarketItem) => void;
  onOpenChartModal: (item?: MarketItem) => void;
}

export const ForexView: React.FC<ForexViewProps> = ({ onSelectSymbol, onOpenChartModal }) => {
  const crossCurrencies = ['USD', 'EUR', 'JPY', 'GBP', 'CAD'];
  const crossRates: Record<string, Record<string, number>> = {
    USD: { USD: 1.0000, EUR: 0.9238, JPY: 152.84, GBP: 0.7701, CAD: 1.3892 },
    EUR: { USD: 1.0825, EUR: 1.0000, JPY: 165.45, GBP: 0.8336, CAD: 1.5038 },
    JPY: { USD: 0.0065, EUR: 0.0060, JPY: 1.0000, GBP: 0.0050, CAD: 0.0091 },
    GBP: { USD: 1.2986, EUR: 1.1996, JPY: 198.48, GBP: 1.0000, CAD: 1.8040 },
    CAD: { USD: 0.7198, EUR: 0.6650, JPY: 110.02, GBP: 0.5543, CAD: 1.0000 }
  };

  const strengthList = [
    { code: 'USD', strength: 78, status: 'Strong', color: '#089981' },
    { code: 'GBP', strength: 64, status: 'Firm', color: '#0049db' },
    { code: 'EUR', strength: 52, status: 'Neutral', color: '#787B86' },
    { code: 'CAD', strength: 48, status: 'Soft', color: '#ff9900' },
    { code: 'JPY', strength: 24, status: 'Weak', color: '#f23645' }
  ];

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 py-8">
      <div>
        <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#131722] tracking-tight">
          Forex and Currencies
        </h1>
        <p className="text-[13px] text-[#787B86] mt-1 mb-6">
          Global FX exchange rates, central bank interest differentials, currency strength, and cross matrices.
        </p>
      </div>

      {/* Currency Strength Meter & Dollar Index */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-5 rounded-2xl bg-[#F0F3FA] border border-[#E0E3EB]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[16px] text-[#131722]">Currency Strength Index</h3>
            <span className="text-[11px] uppercase font-bold text-[#787B86]">DXY Base</span>
          </div>
          <div className="space-y-3">
            {strengthList.map((cur) => (
              <div key={cur.code}>
                <div className="flex justify-between text-[12px] font-semibold mb-1">
                  <span className="text-[#131722]">{cur.code}</span>
                  <span style={{ color: cur.color }}>{cur.status} ({cur.strength}%)</span>
                </div>
                <div className="w-full bg-[#E0E3EB] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cur.strength}%`, backgroundColor: cur.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Currency Pairs Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E0E3EB] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[16px] text-[#131722]">Major Currency Pairs</h3>
            <span className="text-[12px] text-[#787B86]">24h Volume Normalized</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FOREX_LIST.map((fx) => {
              const isUp = fx.pctChange >= 0;
              return (
                <div
                  key={fx.id}
                  onClick={() => onSelectSymbol(fx)}
                  className="p-3.5 rounded-xl bg-[#F0F3FA] hover:bg-[#ebedfa] transition-colors cursor-pointer flex items-center justify-between border border-transparent hover:border-[#E0E3EB]"
                >
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: fx.badgeBg }}
                    >
                      {fx.badge}
                    </span>
                    <div>
                      <div className="font-bold text-[14px] text-[#131722]">{fx.symbol}</div>
                      <div className="text-[11px] text-[#787B86]">{fx.name}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[15px] font-bold text-[#131722] tabular-nums">
                      {fx.price.toFixed(fx.price < 2 ? 5 : 2)}
                    </div>
                    <div className={`text-[12px] font-semibold tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isUp ? '+' : '−'}{Math.abs(fx.pctChange).toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cross Rates Matrix */}
      <div className="bg-white rounded-2xl border border-[#E0E3EB] p-5 shadow-xs">
        <h3 className="font-bold text-[16px] text-[#131722] mb-3">FX Cross Rates Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b border-[#E0E3EB] text-[12px] font-bold text-[#787B86]">
                <th className="py-2.5 px-3 text-left">Base / Quote</th>
                {crossCurrencies.map(c => (
                  <th key={c} className="py-2.5 px-3">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]/50 text-[13px]">
              {crossCurrencies.map(base => (
                <tr key={base} className="hover:bg-[#F0F3FA] transition-colors">
                  <td className="py-2.5 px-3 text-left font-bold text-[#131722]">{base}</td>
                  {crossCurrencies.map(quote => {
                    const rate = crossRates[base]?.[quote] || 1;
                    const isBase = base === quote;
                    return (
                      <td 
                        key={quote} 
                        className={`py-2.5 px-3 font-semibold tabular-nums ${
                          isBase ? 'text-[#787B86]/60 bg-[#F0F3FA]/50' : 'text-[#131722]'
                        }`}
                      >
                        {isBase ? '—' : rate.toFixed(rate < 2 ? 4 : 2)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
