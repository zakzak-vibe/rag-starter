import React, { useState, useMemo } from 'react';
import { MarketItem } from '../types/market';
import { FEATURED_STOCKS } from '../data/marketsData';

interface ChartModalProps {
  symbolItem: MarketItem | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleWatchlist: (symbol: string) => void;
  isWatchlisted: boolean;
}

export const ChartModal: React.FC<ChartModalProps> = ({
  symbolItem,
  isOpen,
  onClose,
  onToggleWatchlist,
  isWatchlisted
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y' | '5Y' | 'ALL'>('1D');
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');
  const [showSMA, setShowSMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!isOpen || !symbolItem) return null;

  // Check if we have rich detailed historical points
  const detailed = FEATURED_STOCKS[symbolItem.symbol] || null;

  // Generate synthetic points if not in featured stocks
  const currentPrice = symbolItem.price;
  const isUp = symbolItem.pctChange >= 0;

  const dataPoints = useMemo(() => {
    if (detailed && detailed.timeframes[timeframe]) {
      return detailed.timeframes[timeframe];
    }
    // Generate simulated points based on price
    const count = timeframe === '1D' ? 12 : timeframe === '5D' ? 15 : 20;
    const base = currentPrice * (1 - (symbolItem.pctChange / 100));
    const step = (currentPrice - base) / count;
    const prices: number[] = [];
    const labels: string[] = [];
    const volumes: number[] = [];

    for (let i = 0; i <= count; i++) {
      const noise = (Math.random() - 0.48) * (currentPrice * 0.008);
      const p = Math.max(0.01, base + (step * i) + noise);
      prices.push(i === count ? currentPrice : p);
      labels.push(
        timeframe === '1D'
          ? `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`
          : `Day ${i + 1}`
      );
      volumes.push(Math.round(20 + Math.random() * 80));
    }
    return { labels, prices, volumes };
  }, [detailed, timeframe, currentPrice, symbolItem.pctChange]);

  const prices = dataPoints.prices;
  const labels = dataPoints.labels;
  const volumes = dataPoints.volumes || [];

  const minPrice = Math.min(...prices) * 0.995;
  const maxPrice = Math.max(...prices) * 1.005;
  const priceRange = maxPrice - minPrice || 1;

  // Active display point
  const activeIdx = hoverIndex !== null && hoverIndex >= 0 && hoverIndex < prices.length ? hoverIndex : prices.length - 1;
  const activePrice = prices[activeIdx] ?? currentPrice;
  const activeLabel = labels[activeIdx] ?? '';
  const firstPrice = prices[0] ?? currentPrice;
  const activeChange = activePrice - firstPrice;
  const activePctChange = firstPrice > 0 ? (activeChange / firstPrice) * 100 : 0;
  const activeIsUp = activeChange >= 0;

  // SVG dimensions
  const svgWidth = 760;
  const svgHeight = 280;
  const paddingX = 20;
  const paddingY = 25;
  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  // Coordinates
  const points = prices.map((p, i) => {
    const x = paddingX + (i / (prices.length - 1)) * chartWidth;
    const y = paddingY + chartHeight - ((p - minPrice) / priceRange) * chartHeight;
    return { x, y, price: p, label: labels[i] };
  });

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const midX = (prev.x + pt.x) / 2;
    return `${acc} C ${midX} ${prev.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - 10} L ${points[0].x} ${svgHeight - 10} Z`;

  // Moving average SMA
  const smaPoints = points.map((pt, i) => {
    const slice = prices.slice(Math.max(0, i - 3), i + 1);
    const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
    const y = paddingY + chartHeight - ((avg - minPrice) / priceRange) * chartHeight;
    return { x: pt.x, y };
  });

  const smaPathD = smaPoints.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    return `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#E0E3EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#faf9ff]">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-[14px] shadow-xs"
              style={{ backgroundColor: symbolItem.badgeBg || '#0049db' }}
            >
              {symbolItem.badge || symbolItem.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-bold text-[#131722]">{symbolItem.name}</h2>
                <span className="text-[11px] font-semibold bg-[#ebedfa] text-[#787B86] px-2 py-0.5 rounded">
                  {symbolItem.exchange ? `${symbolItem.exchange}: ` : ''}{symbolItem.symbol}
                </span>
                <button
                  onClick={() => onToggleWatchlist(symbolItem.symbol)}
                  className={`p-1 rounded-full transition-colors ${
                    isWatchlisted ? 'text-amber-500 hover:text-amber-600' : 'text-[#787B86] hover:text-[#131722]'
                  }`}
                  title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  <span className={`material-symbols-outlined text-[20px] ${isWatchlisted ? 'fill' : ''}`}>star</span>
                </button>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-[24px] font-bold text-[#131722] tabular-nums">
                  {symbolItem.type === 'crypto' || symbolItem.type === 'stock' || symbolItem.type === 'commodity' ? '$' : ''}
                  {activePrice.toLocaleString(undefined, { minimumFractionDigits: activePrice < 2 ? 4 : 2 })}
                </span>
                <span className={`text-[13px] font-semibold tabular-nums px-2 py-0.5 rounded-full ${
                  activeIsUp ? 'bg-[#089981]/10 text-[#089981]' : 'bg-[#f23645]/10 text-[#f23645]'
                }`}>
                  {activeIsUp ? '+' : ''}{activeChange.toFixed(2)} ({activeIsUp ? '+' : ''}{activePctChange.toFixed(2)}%)
                </span>
                <span className="text-[11px] text-[#787B86]">
                  {activeLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Chart Controls */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Chart Type Toggle */}
            <div className="flex items-center bg-[#F0F3FA] p-0.5 rounded-lg border border-[#E0E3EB]">
              <button
                onClick={() => setChartType('area')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                  chartType === 'area' ? 'bg-white text-[#131722] shadow-xs' : 'text-[#787B86]'
                }`}
              >
                Area
              </button>
              <button
                onClick={() => setChartType('candles')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                  chartType === 'candles' ? 'bg-white text-[#131722] shadow-xs' : 'text-[#787B86]'
                }`}
              >
                Candles
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F0F3FA] hover:bg-[#ebedfa] flex items-center justify-center text-[#131722] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Timeframe Bar & Indicators */}
        <div className="px-5 py-2.5 bg-white border-b border-[#E0E3EB] flex flex-wrap items-center justify-between gap-2 text-[12px]">
          <div className="flex items-center gap-1 bg-[#F0F3FA] p-0.5 rounded-full">
            {(['1D', '5D', '1M', '6M', '1Y', '5Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                  timeframe === tf
                    ? 'bg-[#131722] text-white'
                    : 'text-[#787B86] hover:text-[#131722]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[12px] text-[#787B86]">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showSMA}
                onChange={(e) => setShowSMA(e.target.checked)}
                className="accent-[#2962ff] w-3.5 h-3.5 rounded"
              />
              <span>SMA (20)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showVolume}
                onChange={(e) => setShowVolume(e.target.checked)}
                className="accent-[#089981] w-3.5 h-3.5 rounded"
              />
              <span>Volume</span>
            </label>
          </div>
        </div>

        {/* Interactive SVG Chart Viewport */}
        <div className="p-4 sm:p-6 bg-white flex flex-col items-center justify-center relative select-none">
          <div className="w-full h-72 sm:h-80 relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="none"
              onMouseLeave={() => setHoverIndex(null)}
            >
              <defs>
                <linearGradient id="chartGradientUp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#089981" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#089981" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="chartGradientDown" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f23645" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#f23645" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0.2, 0.4, 0.6, 0.8].map((pct) => (
                <line
                  key={pct}
                  x1={paddingX}
                  y1={paddingY + chartHeight * pct}
                  x2={svgWidth - paddingX}
                  y2={paddingY + chartHeight * pct}
                  stroke="#E0E3EB"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
              ))}

              {/* Volume Bars */}
              {showVolume && volumes.length > 0 && (
                <g opacity="0.25">
                  {volumes.map((v, i) => {
                    const barWidth = (chartWidth / volumes.length) * 0.7;
                    const x = paddingX + (i / (volumes.length - 1)) * chartWidth - barWidth / 2;
                    const maxV = Math.max(...volumes);
                    const barH = (v / maxV) * 50;
                    const y = svgHeight - 15 - barH;
                    return (
                      <rect
                        key={i}
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barH}
                        fill={activeIsUp ? '#089981' : '#f23645'}
                        rx="1"
                      />
                    );
                  })}
                </g>
              )}

              {/* Main Area / Candle rendering */}
              {chartType === 'area' ? (
                <>
                  <path
                    d={areaD}
                    fill={activeIsUp ? 'url(#chartGradientUp)' : 'url(#chartGradientDown)'}
                  />
                  <path
                    d={pathD}
                    fill="none"
                    stroke={activeIsUp ? '#089981' : '#f23645'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              ) : (
                /* Candlestick simulation */
                <g>
                  {points.map((pt, i) => {
                    const p = pt.price;
                    const prevP = i > 0 ? points[i - 1].price : p * 0.998;
                    const candleUp = p >= prevP;
                    const candleOpen = prevP;
                    const candleClose = p;
                    const high = Math.max(candleOpen, candleClose) + (maxPrice - minPrice) * 0.02;
                    const low = Math.min(candleOpen, candleClose) - (maxPrice - minPrice) * 0.02;
                    const yHigh = paddingY + chartHeight - ((high - minPrice) / priceRange) * chartHeight;
                    const yLow = paddingY + chartHeight - ((low - minPrice) / priceRange) * chartHeight;
                    const yBodyTop = paddingY + chartHeight - ((Math.max(candleOpen, candleClose) - minPrice) / priceRange) * chartHeight;
                    const yBodyBottom = paddingY + chartHeight - ((Math.min(candleOpen, candleClose) - minPrice) / priceRange) * chartHeight;
                    const bodyH = Math.max(2, yBodyBottom - yBodyTop);

                    return (
                      <g key={i}>
                        <line
                          x1={pt.x}
                          y1={yHigh}
                          x2={pt.x}
                          y2={yLow}
                          stroke={candleUp ? '#089981' : '#f23645'}
                          strokeWidth="1.2"
                        />
                        <rect
                          x={pt.x - 4}
                          y={yBodyTop}
                          width="8"
                          height={bodyH}
                          fill={candleUp ? '#089981' : '#f23645'}
                          rx="1"
                        />
                      </g>
                    );
                  })}
                </g>
              )}

              {/* SMA overlay */}
              {showSMA && (
                <path
                  d={smaPathD}
                  fill="none"
                  stroke="#2962ff"
                  strokeWidth="1.8"
                  strokeDasharray="4 2"
                  opacity="0.8"
                />
              )}

              {/* Crosshair & Active Point */}
              {hoverIndex !== null && points[hoverIndex] && (
                <g>
                  {/* Vertical Crosshair */}
                  <line
                    x1={points[hoverIndex].x}
                    y1={paddingY}
                    x2={points[hoverIndex].x}
                    y2={svgHeight - 15}
                    stroke="#787B86"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                  />
                  {/* Horizontal Crosshair */}
                  <line
                    x1={paddingX}
                    y1={points[hoverIndex].y}
                    x2={svgWidth - paddingX}
                    y2={points[hoverIndex].y}
                    stroke="#787B86"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                  />
                  {/* Highlight Circle */}
                  <circle
                    cx={points[hoverIndex].x}
                    cy={points[hoverIndex].y}
                    r="5"
                    fill={activeIsUp ? '#089981' : '#f23645'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              )}

              {/* Invisible hover overlay triggers */}
              {points.map((pt, i) => {
                const widthBand = chartWidth / points.length;
                return (
                  <rect
                    key={i}
                    x={pt.x - widthBand / 2}
                    y={0}
                    width={widthBand}
                    height={svgHeight}
                    fill="transparent"
                    className="cursor-crosshair"
                    onMouseEnter={() => setHoverIndex(i)}
                  />
                );
              })}
            </svg>
          </div>

          {/* Time axis labels */}
          <div className="w-full flex justify-between text-[11px] text-[#787B86] pt-2 px-4 border-t border-[#E0E3EB]">
            <span>{labels[0]}</span>
            <span>{labels[Math.floor(labels.length / 2)]}</span>
            <span>{labels[labels.length - 1]}</span>
          </div>
        </div>

        {/* Financial Metrics Strip */}
        <div className="p-4 sm:p-5 bg-[#faf9ff] border-t border-[#E0E3EB] grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-[12px]">
          <div>
            <div className="text-[#787B86]">Day Range</div>
            <div className="font-semibold text-[#131722] tabular-nums">
              ${(minPrice).toFixed(2)} - ${(maxPrice).toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-[#787B86]">52W Range</div>
            <div className="font-semibold text-[#131722] tabular-nums">
              ${(detailed?.week52Low ?? minPrice * 0.8).toFixed(2)} - ${(detailed?.week52High ?? maxPrice * 1.2).toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-[#787B86]">Market Cap</div>
            <div className="font-semibold text-[#131722] tabular-nums">
              {symbolItem.marketCap || detailed?.marketCap || '1.24T'}
            </div>
          </div>
          <div>
            <div className="text-[#787B86]">Volume</div>
            <div className="font-semibold text-[#131722] tabular-nums">
              {symbolItem.volume || detailed?.volume || '32.4M'}
            </div>
          </div>
          <div>
            <div className="text-[#787B86]">P/E Ratio</div>
            <div className="font-semibold text-[#131722] tabular-nums">
              {detailed?.peRatio ? `${detailed.peRatio}x` : '32.4x'}
            </div>
          </div>
          <div>
            <div className="text-[#787B86]">Beta</div>
            <div className="font-semibold text-[#131722] tabular-nums">
              {detailed?.beta ?? 1.15}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-5 py-3 bg-white border-t border-[#E0E3EB] flex items-center justify-between">
          <div className="text-[12px] text-[#787B86]">
            Interactive TradingView Data Engine · Real-time simulation
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(symbolItem.symbol)}
              className="px-4 py-1.5 rounded-full border border-[#E0E3EB] hover:bg-[#F0F3FA] text-[#131722] text-[13px] font-semibold transition-colors"
            >
              {isWatchlisted ? 'In Watchlist ✓' : '+ Add to Watchlist'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-1.5 rounded-full bg-[#131722] text-white text-[13px] font-semibold hover:bg-black transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
