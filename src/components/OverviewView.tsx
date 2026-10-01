import React, { useState } from 'react';
import { MarketItem, StockDetailed } from '../types/market';
import {
  MAJOR_INDICES,
  WORLD_INDICES,
  FEATURED_STOCKS,
  COMMUNITY_TRENDS,
  HIGHEST_VOLUME_STOCKS,
  EARNINGS_CALENDAR,
  CRYPTO_LIST,
  FOREX_LIST,
  COMMODITIES_LIST,
  YIELD_CURVE_POINTS
} from '../data/marketsData';

interface OverviewViewProps {
  onSelectSymbol: (item: MarketItem) => void;
  onOpenWidgetModal: (symbol?: string) => void;
  onOpenChartModal: (item?: MarketItem) => void;
  onNavigateTab: (tab: string) => void;
  liveStreaming: boolean;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectSymbol,
  onOpenWidgetModal,
  onOpenChartModal,
  onNavigateTab,
  liveStreaming
}) => {
  // Category pill filter state
  const [selectedCategory, setSelectedCategory] = useState('US stocks');
  const [headlineDropdownOpen, setHeadlineDropdownOpen] = useState(false);

  // US Stocks Featured Switcher
  const [selectedStockSymbol, setSelectedStockSymbol] = useState<'NVDA' | 'AAPL' | 'AMZN' | 'GOOG' | 'TSLA' | 'MSFT'>('NVDA');
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y' | '5Y' | 'ALL'>('1D');
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);

  const currentStock: StockDetailed = FEATURED_STOCKS[selectedStockSymbol] || FEATURED_STOCKS.NVDA;
  const activeTimeframeData = currentStock.timeframes[timeframe] || currentStock.timeframes['1D'];

  const stockPrices = activeTimeframeData.prices;
  const stockLabels = activeTimeframeData.labels;

  const minStockPrice = Math.min(...stockPrices);
  const maxStockPrice = Math.max(...stockPrices);
  const stockRange = maxStockPrice - minStockPrice || 1;

  // Active display point
  const displayIdx = hoveredPointIdx !== null && hoveredPointIdx >= 0 && hoveredPointIdx < stockPrices.length
    ? hoveredPointIdx
    : stockPrices.length - 1;

  const displayPrice = stockPrices[displayIdx];
  const displayLabel = stockLabels[displayIdx];
  const startPrice = stockPrices[0];
  const displayDiff = displayPrice - startPrice;
  const displayPct = startPrice > 0 ? (displayDiff / startPrice) * 100 : 0;
  const isUp = displayDiff >= 0;

  // SVG Chart path calculation
  const svgWidth = 800;
  const svgHeight = 200;
  const padX = 10;
  const padY = 20;
  const cWidth = svgWidth - padX * 2;
  const cHeight = svgHeight - padY * 2;

  const chartPoints = stockPrices.map((p, i) => {
    const x = padX + (i / (stockPrices.length - 1)) * cWidth;
    const y = padY + cHeight - ((p - minStockPrice) / stockRange) * cHeight;
    return { x, y, price: p, label: stockLabels[i] };
  });

  const pathD = chartPoints.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = chartPoints[i - 1];
    const midX = (prev.x + pt.x) / 2;
    return `${acc} C ${midX} ${prev.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${chartPoints[chartPoints.length - 1].x} ${svgHeight} L ${chartPoints[0].x} ${svgHeight} Z`;

  // Yield curve calculation
  const yieldSvgWidth = 300;
  const yieldSvgHeight = 80;
  const minYield = 3.8;
  const maxYield = 5.0;
  const yieldRange = maxYield - minYield;
  const yieldPointsSvg = YIELD_CURVE_POINTS.map((pt, i) => {
    const x = 15 + (i / (YIELD_CURVE_POINTS.length - 1)) * (yieldSvgWidth - 30);
    const y = yieldSvgHeight - 15 - ((pt.usYield - minYield) / yieldRange) * (yieldSvgHeight - 30);
    return { ...pt, x, y };
  });

  const yieldCurvePath = yieldPointsSvg.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = yieldPointsSvg[i - 1];
    const midX = (prev.x + pt.x) / 2;
    return `${acc} C ${midX} ${prev.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const categories = [
    { label: 'US stocks', target: 'stocks' },
    { label: 'World stocks', target: 'indices' },
    { label: 'Crypto', target: 'crypto' },
    { label: 'Futures', target: 'futures' },
    { label: 'Forex', target: 'forex' },
    { label: 'Government bonds', target: 'bonds' },
    { label: 'Corporate bonds', target: 'bonds' },
    { label: 'ETFs', target: 'stocks' },
    { label: 'Economy', target: 'overview' }
  ];

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Center Headline & Down Arrow */}
      <section className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pt-8 pb-6 flex flex-col items-center justify-center relative">
        <div 
          onClick={() => setHeadlineDropdownOpen(!headlineDropdownOpen)}
          className="inline-flex items-center gap-2 cursor-pointer group select-none relative"
        >
          <h1 className="text-[36px] sm:text-[46px] lg:text-[56px] leading-tight font-extrabold text-[#131722] tracking-tight">
            Markets, everywhere
          </h1>
          <span className="material-symbols-outlined text-[#131722] text-[36px] transition-transform duration-200 group-hover:translate-y-1">
            {headlineDropdownOpen ? 'expand_less' : 'expand_more'}
          </span>
        </div>

        {/* Market sentiment quick popover */}
        {headlineDropdownOpen && (
          <div className="mt-3 p-4 bg-white border border-[#E0E3EB] rounded-2xl shadow-xl max-w-md w-full text-[13px] text-[#131722] z-20 animate-in fade-in duration-150">
            <div className="flex items-center justify-between font-bold border-b border-[#E0E3EB] pb-2 mb-2">
              <span className="flex items-center gap-1.5 text-[#0049db]">
                <span className="material-symbols-outlined text-[18px]">query_stats</span>
                Global Market Summary
              </span>
              <span className="text-[#089981] font-semibold bg-[#089981]/10 px-2 py-0.5 rounded-full text-[11px]">
                BULLISH MOMENTUM
              </span>
            </div>
            <p className="text-[#787B86] text-[12px] leading-relaxed mb-3">
              U.S. equities edge higher led by semiconductor strength and mega-cap tech earnings. S&P 500 holds above 5,860 while Treasury yields stabilize around 4.24%.
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="bg-[#F0F3FA] p-2 rounded-lg">
                <div className="text-[#787B86]">Advancers</div>
                <div className="font-bold text-[#089981] text-[13px]">1,842</div>
              </div>
              <div className="bg-[#F0F3FA] p-2 rounded-lg">
                <div className="text-[#787B86]">Decliners</div>
                <div className="font-bold text-[#f23645] text-[13px]">1,108</div>
              </div>
              <div className="bg-[#F0F3FA] p-2 rounded-lg">
                <div className="text-[#787B86]">VIX Volatility</div>
                <div className="font-bold text-[#131722] text-[13px]">18.24 (-2.1%)</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Category Filter Pill Bar */}
      <section className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <button 
            onClick={() => onNavigateTab('indices')}
            className="inline-flex items-center gap-1 text-[26px] sm:text-[32px] font-bold text-[#131722] hover:opacity-80 transition-opacity self-start"
          >
            <span>Indices</span>
            <span className="material-symbols-outlined text-[28px] font-bold text-[#131722]">
              chevron_right
            </span>
          </button>

          {/* Pill strip */}
          <div className="flex items-center gap-1 p-1 bg-[#F0F3FA] rounded-full overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => {
                    setSelectedCategory(cat.label);
                    if (cat.target !== 'overview') {
                      onNavigateTab(cat.target);
                    }
                  }}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#131722] text-white shadow-xs'
                      : 'text-[#787B86] hover:text-[#131722] hover:bg-[#ebedfa]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Major Indices Cards Row */}
      <section className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {MAJOR_INDICES.map((index) => {
            const isCardUp = index.pctChange >= 0;
            return (
              <div
                key={index.id}
                onClick={() => onSelectSymbol(index)}
                className="p-4 rounded-2xl bg-[#F0F3FA] hover:bg-[#ebedfa] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between h-[160px] group border border-transparent hover:border-[#E0E3EB]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: index.badgeBg }}
                    >
                      {index.badge}
                    </span>
                    <span className="font-semibold text-[15px] text-[#131722] group-hover:text-[#0049db] transition-colors truncate">
                      {index.name}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#787B86] font-medium">{index.symbol}</span>
                </div>

                <div className="flex items-end justify-between mt-2">
                  <div>
                    <div className="text-[18px] sm:text-[20px] font-bold text-[#131722] tabular-nums tracking-tight">
                      {index.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className={`text-[12px] font-semibold tabular-nums flex items-center gap-1 mt-0.5 ${
                      isCardUp ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}>
                      <span>{isCardUp ? '+' : '−'}{Math.abs(index.change).toFixed(2)}</span>
                      <span>({isCardUp ? '+' : '−'}{Math.abs(index.pctChange).toFixed(2)}%)</span>
                    </div>
                  </div>

                  {/* Sparkline SVG */}
                  <svg className={`w-16 h-8 ${isCardUp ? 'text-[#089981]' : 'text-[#f23645]'}`} fill="none" viewBox="0 0 64 32">
                    <path
                      d={
                        isCardUp
                          ? 'M1 25 L 14 20 L 25 24 L 38 11 L 49 14 L 63 4'
                          : 'M1 8 L 15 14 L 28 9 L 41 22 L 52 18 L 63 27'
                      }
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick action links below indices */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            onClick={() => onOpenWidgetModal('SPX')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F3FA] hover:bg-[#ebedfa] text-[#787B86] hover:text-[#131722] text-[13px] font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">widgets</span>
            <span>Get widget</span>
          </button>
          <button
            onClick={() => onOpenChartModal(MAJOR_INDICES[0])}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F3FA] hover:bg-[#ebedfa] text-[#787B86] hover:text-[#131722] text-[13px] font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            <span>Launch full chart view</span>
          </button>
        </div>
      </section>

      {/* World Indices Table & Quick Cards */}
      <section className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pb-14">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[22px] sm:text-[24px] font-bold text-[#131722]">World indices</h2>
          <button 
            onClick={() => onNavigateTab('indices')}
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0049db] hover:underline"
          >
            <span>See all major indices</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {WORLD_INDICES.map((wIdx) => {
            const isWorldUp = wIdx.pctChange >= 0;
            return (
              <div
                key={wIdx.id}
                onClick={() => onSelectSymbol(wIdx)}
                className="p-3.5 rounded-xl bg-[#f1f3ff] hover:bg-[#ebedfa] transition-colors flex items-center justify-between cursor-pointer border border-transparent hover:border-[#E0E3EB]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#ebedfa] flex items-center justify-center text-[12px] font-bold text-[#131722] shrink-0">
                    {wIdx.countryCode}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[14px] text-[#131722] truncate">
                      {wIdx.symbol}
                    </div>
                    <div className="text-[12px] text-[#787B86] truncate">
                      {wIdx.name}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <div className="text-[14px] font-bold text-[#131722] tabular-nums">
                    {wIdx.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className={`text-[12px] font-semibold tabular-nums ${isWorldUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                    {isWorldUp ? '+' : '−'}{Math.abs(wIdx.pctChange).toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* US Stocks Section with Interactive Overview */}
      <section className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pb-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <button 
            onClick={() => onNavigateTab('stocks')}
            className="flex items-center gap-1 text-[26px] sm:text-[32px] font-bold text-[#131722] hover:opacity-80 transition-opacity self-start"
          >
            <span>US stocks</span>
            <span className="material-symbols-outlined text-[28px] font-bold text-[#131722]">chevron_right</span>
          </button>

          {/* Sub-tickers pill filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {(['NVDA', 'AAPL', 'AMZN', 'GOOG', 'TSLA', 'MSFT'] as const).map((sym) => {
              const isSelected = selectedStockSymbol === sym;
              const stockName = sym === 'NVDA' ? 'NVIDIA' : sym === 'AAPL' ? 'Apple' : sym === 'AMZN' ? 'Amazon' : sym === 'GOOG' ? 'Alphabet' : sym === 'TSLA' ? 'Tesla' : 'Microsoft';
              return (
                <button
                  key={sym}
                  onClick={() => setSelectedStockSymbol(sym)}
                  className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#131722] text-white shadow-xs'
                      : 'bg-[#F0F3FA] hover:bg-[#ebedfa] text-[#787B86] hover:text-[#131722]'
                  }`}
                >
                  {stockName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Symbol Overview Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#F0F3FA] border border-[#E0E3EB]/50 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[16px] font-bold shadow-xs shrink-0"
                style={{ backgroundColor: currentStock.badgeBg || '#0049db' }}
              >
                {currentStock.badge}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[20px] sm:text-[24px] font-bold text-[#131722]">
                    {currentStock.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#ebedfa] text-[#787B86] text-[11px] font-semibold">
                    {currentStock.exchange}: {currentStock.symbol}
                  </span>
                  <button
                    onClick={() => onOpenChartModal(currentStock)}
                    className="p-1 rounded-full text-[#787B86] hover:text-[#0049db] hover:bg-[#ebedfa] transition-colors"
                    title="Expand Full Chart View"
                  >
                    <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                  </button>
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-[26px] sm:text-[32px] font-extrabold text-[#131722] tabular-nums tracking-tight">
                    {displayPrice.toFixed(2)} <span className="text-[14px] text-[#787B86] font-normal">USD</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[12px] font-semibold tabular-nums ${
                    isUp ? 'bg-[#089981]/10 text-[#089981]' : 'bg-[#f23645]/10 text-[#f23645]'
                  }`}>
                    {isUp ? '+' : ''}{displayDiff.toFixed(2)} ({isUp ? '+' : ''}{displayPct.toFixed(2)}%)
                  </span>
                  <span className="text-[11px] text-[#787B86] hidden sm:inline">
                    {displayLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Range Buttons */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full shadow-xs self-start lg:self-auto border border-[#E0E3EB]">
              {(['1D', '5D', '1M', '6M', '1Y', '5Y', 'ALL'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
                    timeframe === tf
                      ? 'bg-[#131722] text-white shadow-xs'
                      : 'text-[#787B86] hover:text-[#131722]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Area Chart SVG */}
          <div className="w-full h-56 bg-white rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-xs border border-[#E0E3EB]/70">
            <svg
              className={`w-full h-full overflow-visible ${isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}
              preserveAspectRatio="none"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              onMouseLeave={() => setHoveredPointIdx(null)}
            >
              <defs>
                <linearGradient id="nvdaGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area fill */}
              <path d={areaD} fill="url(#nvdaGrad)" />
              {/* Curve stroke */}
              <path d={pathD} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Interactive Hover Point & Crosshair */}
              {hoveredPointIdx !== null && chartPoints[hoveredPointIdx] && (
                <g>
                  <line
                    x1={chartPoints[hoveredPointIdx].x}
                    y1={0}
                    x2={chartPoints[hoveredPointIdx].x}
                    y2={svgHeight}
                    stroke="#787B86"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <circle
                    cx={chartPoints[hoveredPointIdx].x}
                    cy={chartPoints[hoveredPointIdx].y}
                    r="5"
                    fill="currentColor"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />
                </g>
              )}

              {/* Hover event transparent bands */}
              {chartPoints.map((pt, i) => {
                const bandW = cWidth / chartPoints.length;
                return (
                  <rect
                    key={i}
                    x={pt.x - bandW / 2}
                    y={0}
                    width={bandW}
                    height={svgHeight}
                    fill="transparent"
                    className="cursor-crosshair"
                    onMouseEnter={() => setHoveredPointIdx(i)}
                  />
                );
              })}
            </svg>

            {/* Time labels below chart */}
            <div className="flex items-center justify-between text-[#787B86] text-[11px] font-semibold pt-2 border-t-0 select-none">
              <span>{stockLabels[0]}</span>
              <span className="hidden sm:inline">{stockLabels[Math.floor(stockLabels.length * 0.25)] || ''}</span>
              <span>{stockLabels[Math.floor(stockLabels.length * 0.5)] || ''}</span>
              <span className="hidden sm:inline">{stockLabels[Math.floor(stockLabels.length * 0.75)] || ''}</span>
              <span>{stockLabels[stockLabels.length - 1]}</span>
            </div>
          </div>
        </div>

        {/* 3-Column Bento Grid: Community Trends, Highest Volume, Earnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Column 1: Community trends */}
          <div className="p-5 rounded-2xl bg-[#F0F3FA] flex flex-col justify-between border border-[#E0E3EB]/50">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#131722]">Community trends</h3>
                <span className="material-symbols-outlined text-[#787B86] text-[20px]">trending_up</span>
              </div>
              <div className="flex flex-col gap-1">
                {COMMUNITY_TRENDS.map((item) => {
                  const itemIsUp = item.pctChange >= 0;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectSymbol(item)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[#ebedfa] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-[#ebedfa] flex items-center justify-center text-[11px] font-bold text-[#131722]">
                          {item.badge}
                        </span>
                        <div>
                          <div className="text-[13px] text-[#131722] font-semibold">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#787B86]">
                            {item.symbol} • {item.exchange}
                          </div>
                        </div>
                      </div>
                      <span className={`text-[13px] font-semibold tabular-nums ${itemIsUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {itemIsUp ? '+' : '−'}{Math.abs(item.pctChange).toFixed(2)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('stocks')}
              className="mt-4 pt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0049db] hover:underline self-start"
            >
              <span>See all community favorites</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* Column 2: Highest volume stocks */}
          <div className="p-5 rounded-2xl bg-[#F0F3FA] flex flex-col justify-between border border-[#E0E3EB]/50">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#131722]">Highest volume stocks</h3>
                <span className="material-symbols-outlined text-[#787B86] text-[20px]">bar_chart</span>
              </div>
              <div className="flex flex-col gap-1">
                {HIGHEST_VOLUME_STOCKS.map((item) => {
                  const itemIsUp = item.pctChange >= 0;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectSymbol(item)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[#ebedfa] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-[#ebedfa] flex items-center justify-center text-[11px] font-bold text-[#131722]">
                          {item.badge}
                        </span>
                        <div>
                          <div className="text-[13px] text-[#131722] font-semibold">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#787B86]">
                            {item.volume} • {item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <span className={`text-[13px] font-semibold tabular-nums ${itemIsUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {itemIsUp ? '+' : '−'}{Math.abs(item.pctChange).toFixed(2)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('stocks')}
              className="mt-4 pt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0049db] hover:underline self-start"
            >
              <span>See all active movers</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* Column 3: Earnings Calendar */}
          <div className="p-5 rounded-2xl bg-[#F0F3FA] flex flex-col justify-between border border-[#E0E3EB]/50">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#131722]">Earnings Calendar</h3>
                <span className="material-symbols-outlined text-[#787B86] text-[20px]">event</span>
              </div>
              <div className="flex flex-col gap-2">
                {EARNINGS_CALENDAR.slice(0, 5).map((earn) => (
                  <div
                    key={earn.id}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#ebedfa] transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#131722]">{earn.ticker}</span>
                        <span className="text-[12px] text-[#787B86] truncate max-w-[130px]">{earn.name}</span>
                      </div>
                      <div className="text-[11px] text-[#787B86] mt-0.5">{earn.estimate}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      earn.isToday ? 'bg-[#ebedfa] text-[#131722]' : 'bg-[#ebedfa] text-[#787B86]'
                    }`}>
                      {earn.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('stocks')}
              className="mt-4 pt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0049db] hover:underline self-start"
            >
              <span>See full earnings schedule</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Crypto & Forex Double Section */}
      <section className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Crypto Half */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => onNavigateTab('crypto')}
                className="flex items-center gap-1 text-[22px] sm:text-[24px] font-bold text-[#131722] hover:opacity-80"
              >
                <span>Crypto</span>
                <span className="material-symbols-outlined text-[24px] font-bold text-[#131722]">chevron_right</span>
              </button>
              <button 
                onClick={() => onNavigateTab('crypto')}
                className="text-[13px] font-semibold text-[#0049db] hover:underline"
              >
                See all coins
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {CRYPTO_LIST.slice(0, 4).map((coin) => {
                const coinUp = coin.pctChange >= 0;
                return (
                  <div
                    key={coin.id}
                    onClick={() => onSelectSymbol(coin)}
                    className="p-3.5 rounded-2xl bg-[#F0F3FA] hover:bg-[#ebedfa] transition-colors flex items-center justify-between cursor-pointer border border-transparent hover:border-[#E0E3EB]"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-full text-white font-bold flex items-center justify-center text-[15px] shadow-xs"
                        style={{ backgroundColor: coin.badgeBg }}
                      >
                        {coin.badge}
                      </div>
                      <div>
                        <div className="text-[13px] text-[#131722] font-bold">{coin.name}</div>
                        <div className="text-[12px] text-[#787B86]">{coin.symbol} • Market Cap {coin.marketCap}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[15px] font-bold text-[#131722] tabular-nums">
                        ${coin.price.toLocaleString(undefined, { minimumFractionDigits: coin.price < 2 ? 3 : 2 })}
                      </div>
                      <div className={`text-[12px] font-semibold tabular-nums ${coinUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {coinUp ? '+' : '−'}{Math.abs(coin.pctChange).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Forex & Currencies Half */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => onNavigateTab('forex')}
                className="flex items-center gap-1 text-[22px] sm:text-[24px] font-bold text-[#131722] hover:opacity-80"
              >
                <span>Forex and currencies</span>
                <span className="material-symbols-outlined text-[24px] font-bold text-[#131722]">chevron_right</span>
              </button>
              <button 
                onClick={() => onNavigateTab('forex')}
                className="text-[13px] font-semibold text-[#0049db] hover:underline"
              >
                See all major pairs
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {FOREX_LIST.slice(0, 4).map((fx) => {
                const fxUp = fx.pctChange >= 0;
                return (
                  <div
                    key={fx.id}
                    onClick={() => onSelectSymbol(fx)}
                    className="p-3.5 rounded-2xl bg-[#F0F3FA] hover:bg-[#ebedfa] transition-colors flex items-center justify-between cursor-pointer border border-transparent hover:border-[#E0E3EB]"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-full text-white font-bold flex items-center justify-center text-[12px] shadow-xs"
                        style={{ backgroundColor: fx.badgeBg }}
                      >
                        {fx.badge}
                      </div>
                      <div>
                        <div className="text-[13px] text-[#131722] font-bold">{fx.symbol}</div>
                        <div className="text-[12px] text-[#787B86]">{fx.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[15px] font-bold text-[#131722] tabular-nums">
                        {fx.price.toFixed(fx.price < 2 ? 5 : 2)}
                      </div>
                      <div className={`text-[12px] font-semibold tabular-nums ${fxUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {fxUp ? '+' : '−'}{Math.abs(fx.pctChange).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Commodities & Government Bonds Section */}
      <section className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Commodities & Futures */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => onNavigateTab('futures')}
                className="flex items-center gap-1 text-[22px] sm:text-[24px] font-bold text-[#131722] hover:opacity-80"
              >
                <span>Futures & Commodities</span>
                <span className="material-symbols-outlined text-[24px] font-bold text-[#131722]">chevron_right</span>
              </button>
              <button 
                onClick={() => onNavigateTab('futures')}
                className="text-[13px] font-semibold text-[#0049db] hover:underline"
              >
                See all futures
              </button>
            </div>
            <div className="p-5 rounded-2xl bg-[#F0F3FA] flex flex-col gap-3.5 border border-[#E0E3EB]/50">
              {COMMODITIES_LIST.slice(0, 4).map((comm) => {
                const commUp = comm.pctChange >= 0;
                const icon = 
                  comm.id === 'gold' ? 'monetization_on' :
                  comm.id === 'crude-oil' ? 'water_drop' :
                  comm.id === 'silver' ? 'lens' : 'mode_fan';
                const iconColor =
                  comm.id === 'gold' ? 'text-[#eab308]' :
                  comm.id === 'crude-oil' ? 'text-[#787B86]' :
                  comm.id === 'silver' ? 'text-[#737687]' : 'text-[#0ea5e9]';

                return (
                  <div
                    key={comm.id}
                    onClick={() => onSelectSymbol(comm)}
                    className="flex items-center justify-between py-1 hover:bg-[#ebedfa] p-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined ${iconColor} text-[22px]`}>
                        {icon}
                      </span>
                      <div>
                        <div className="text-[13px] text-[#131722] font-bold">{comm.symbol}</div>
                        <div className="text-[11px] text-[#787B86]">{comm.exchange} • {comm.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[14px] font-bold text-[#131722] tabular-nums">
                        {comm.price.toFixed(2)} USD
                      </div>
                      <div className={`text-[12px] font-semibold tabular-nums ${commUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {commUp ? '+' : '−'}{Math.abs(comm.pctChange).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Government Bonds / Yields */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => onNavigateTab('bonds')}
                className="flex items-center gap-1 text-[22px] sm:text-[24px] font-bold text-[#131722] hover:opacity-80"
              >
                <span>Government bonds</span>
                <span className="material-symbols-outlined text-[24px] font-bold text-[#131722]">chevron_right</span>
              </button>
              <button 
                onClick={() => onNavigateTab('bonds')}
                className="text-[13px] font-semibold text-[#0049db] hover:underline"
              >
                Customize curves
              </button>
            </div>
            <div className="p-5 rounded-2xl bg-[#F0F3FA] flex flex-col justify-between h-full border border-[#E0E3EB]/50">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[14px] text-[#131722] font-bold">
                      US 10-Year Benchmark (US10Y)
                    </div>
                    <div className="text-[12px] text-[#787B86]">
                      US Treasury • Yield Curve Benchmark
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[20px] font-bold text-[#131722] tabular-nums">
                      4.248%
                    </div>
                    <div className="text-[12px] text-[#089981] font-semibold tabular-nums">
                      +0.032%
                    </div>
                  </div>
                </div>

                {/* Yield Curve visualization miniature */}
                <div className="bg-white p-4 rounded-xl shadow-xs border border-[#E0E3EB]/70">
                  <div className="flex items-center justify-between text-[12px] text-[#787B86] mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#131722]">
                      US TREASURY YIELD CURVE
                    </span>
                    <span className="text-[#089981] font-semibold text-[12px]">
                      Normalizing slope
                    </span>
                  </div>

                  <svg className="w-full h-20 text-[#0049db]" fill="none" viewBox="0 0 300 80">
                    <path
                      d={yieldCurvePath}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    />
                    {yieldPointsSvg.map((pt, i) => (
                      <circle
                        key={i}
                        cx={pt.x}
                        cy={pt.y}
                        fill="currentColor"
                        r="3.5"
                      />
                    ))}
                  </svg>

                  <div className="flex items-center justify-between text-[11px] text-[#787B86] font-medium mt-1">
                    <span>1M (4.8%)</span>
                    <span>2Y (4.1%)</span>
                    <span>5Y (4.0%)</span>
                    <span>10Y (4.2%)</span>
                    <span>30Y (4.5%)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#E0E3EB]/50">
                <span className="text-[12px] text-[#787B86]">
                  Global Benchmark Spread (US-DE): <strong className="text-[#131722] font-semibold">+1.84%</strong>
                </span>
                <button 
                  onClick={() => onNavigateTab('bonds')}
                  className="text-[13px] font-semibold text-[#0049db] hover:underline"
                >
                  View bond screener &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
