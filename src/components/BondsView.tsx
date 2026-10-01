import React, { useState } from 'react';
import { YIELD_CURVE_POINTS } from '../data/marketsData';

export const BondsView: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<'all' | 'us' | 'de' | 'uk'>('all');

  const width = 700;
  const height = 260;
  const padX = 40;
  const padY = 30;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const minVal = 1.8;
  const maxVal = 5.2;
  const valRange = maxVal - minVal;

  const getPoints = (key: 'usYield' | 'deYield' | 'ukYield') => {
    return YIELD_CURVE_POINTS.map((pt, i) => {
      const x = padX + (i / (YIELD_CURVE_POINTS.length - 1)) * chartW;
      const y = padY + chartH - ((pt[key] - minVal) / valRange) * chartH;
      return { x, y, val: pt[key], tenor: pt.tenor };
    });
  };

  const usPoints = getPoints('usYield');
  const dePoints = getPoints('deYield');
  const ukPoints = getPoints('ukYield');

  const makePath = (pts: { x: number; y: number }[]) => {
    return pts.reduce((acc, pt, i) => {
      if (i === 0) return `M ${pt.x} ${pt.y}`;
      const prev = pts[i - 1];
      const midX = (prev.x + pt.x) / 2;
      return `${acc} C ${midX} ${prev.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
    }, '');
  };

  const us2y = YIELD_CURVE_POINTS.find(p => p.tenor === '2Y')?.usYield || 4.14;
  const us10y = YIELD_CURVE_POINTS.find(p => p.tenor === '10Y')?.usYield || 4.248;
  const spread2_10 = ((us10y - us2y) * 100).toFixed(1);

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 py-8">
      <div>
        <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#131722] tracking-tight">
          Government Bonds & Yield Curves
        </h1>
        <p className="text-[13px] text-[#787B86] mt-1 mb-6">
          Global sovereign fixed income, term structure yields, and 2Y/10Y recession spread monitoring.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white border border-[#E0E3EB]">
          <div className="text-[11px] font-bold uppercase text-[#787B86]">US 10-Year Benchmark</div>
          <div className="text-[24px] font-extrabold text-[#131722] tabular-nums mt-1">4.248%</div>
          <div className="text-[12px] text-[#089981] font-semibold mt-0.5">+0.032% Day Change</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E0E3EB]">
          <div className="text-[11px] font-bold uppercase text-[#787B86]">2Y - 10Y Curve Spread</div>
          <div className="text-[24px] font-extrabold text-[#089981] tabular-nums mt-1">+{spread2_10} bps</div>
          <div className="text-[12px] text-[#787B86] mt-0.5">Dis-inverted / Normalizing slope</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E0E3EB]">
          <div className="text-[11px] font-bold uppercase text-[#787B86]">US vs German 10Y Spread</div>
          <div className="text-[24px] font-extrabold text-[#131722] tabular-nums mt-1">+1.84%</div>
          <div className="text-[12px] text-[#787B86] mt-0.5">Transatlantic Policy Premium</div>
        </div>
      </div>

      {/* Interactive Yield Curve Comparison Chart */}
      <div className="bg-white rounded-2xl border border-[#E0E3EB] p-5 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-[18px] font-bold text-[#131722]">Term Structure Comparison</h3>
            <span className="text-[12px] text-[#787B86]">Maturities 1 Month through 30 Years</span>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Curves' },
              { id: 'us', label: 'US Treasuries' },
              { id: 'de', label: 'German Bunds' },
              { id: 'uk', label: 'UK Gilts' }
            ].map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedCountry(b.id as any)}
                className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
                  selectedCountry === b.id ? 'bg-[#131722] text-white' : 'bg-[#F0F3FA] text-[#787B86] hover:text-[#131722]'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="w-full h-72">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            {/* Grid */}
            {[2.0, 3.0, 4.0, 5.0].map(yVal => {
              const y = padY + chartH - ((yVal - minVal) / valRange) * chartH;
              return (
                <g key={yVal}>
                  <line x1={padX} y1={y} x2={width - padX} y2={y} stroke="#E0E3EB" strokeDasharray="3 3" />
                  <text x={padX - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#787B86" className="font-mono">
                    {yVal.toFixed(1)}%
                  </text>
                </g>
              );
            })}

            {/* US Curve (Blue) */}
            {(selectedCountry === 'all' || selectedCountry === 'us') && (
              <g>
                <path d={makePath(usPoints)} fill="none" stroke="#0049db" strokeWidth="3" />
                {usPoints.map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r="4.5" fill="#0049db" stroke="#ffffff" strokeWidth="2" />
                ))}
              </g>
            )}

            {/* Germany Curve (Red/Orange) */}
            {(selectedCountry === 'all' || selectedCountry === 'de') && (
              <g>
                <path d={makePath(dePoints)} fill="none" stroke="#f23645" strokeWidth="2.5" strokeDasharray="4 2" />
                {dePoints.map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#f23645" stroke="#ffffff" strokeWidth="2" />
                ))}
              </g>
            )}

            {/* UK Curve (Green) */}
            {(selectedCountry === 'all' || selectedCountry === 'uk') && (
              <g>
                <path d={makePath(ukPoints)} fill="none" stroke="#089981" strokeWidth="2.5" />
                {ukPoints.map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#089981" stroke="#ffffff" strokeWidth="2" />
                ))}
              </g>
            )}

            {/* X Labels */}
            {usPoints.map((pt, i) => (
              <text key={i} x={pt.x} y={height - 8} textAnchor="middle" fontSize="11" fill="#131722" className="font-semibold">
                {pt.tenor}
              </text>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-[#E0E3EB] text-[12px]">
          <span className="flex items-center gap-1.5 text-[#131722] font-semibold">
            <span className="w-3 h-3 rounded-full bg-[#0049db]"></span> US Treasury Benchmark
          </span>
          <span className="flex items-center gap-1.5 text-[#131722] font-semibold">
            <span className="w-3 h-3 rounded-full bg-[#f23645]"></span> Germany Federal Bund
          </span>
          <span className="flex items-center gap-1.5 text-[#131722] font-semibold">
            <span className="w-3 h-3 rounded-full bg-[#089981]"></span> UK Sovereign Gilt
          </span>
        </div>
      </div>
    </div>
  );
};
