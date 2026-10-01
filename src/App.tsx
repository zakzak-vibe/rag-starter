import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OverviewView } from './components/OverviewView';
import { StocksView } from './components/StocksView';
import { CryptoView } from './components/CryptoView';
import { ForexView } from './components/ForexView';
import { IndicesView } from './components/IndicesView';
import { FuturesView } from './components/FuturesView';
import { BondsView } from './components/BondsView';
import { SearchModal } from './components/SearchModal';
import { ChartModal } from './components/ChartModal';
import { WidgetModal } from './components/WidgetModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { MarketItem } from './types/market';
import { 
  MAJOR_INDICES, 
  WORLD_INDICES, 
  EXTENDED_STOCKS_LIST, 
  CRYPTO_LIST, 
  FOREX_LIST, 
  COMMODITIES_LIST 
} from './data/marketsData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchOpen, setSearchOpen] = useState(false);
  const [chartModalOpen, setChartModalOpen] = useState(false);
  const [selectedChartItem, setSelectedChartItem] = useState<MarketItem | null>(null);
  const [widgetModalOpen, setWidgetModalOpen] = useState(false);
  const [widgetSymbol, setWidgetSymbol] = useState('SPX');
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const [liveStreaming, setLiveStreaming] = useState(true);

  // Watchlist persisted in localStorage
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_terminal_watchlist');
      return saved ? JSON.parse(saved) : ['SPX', 'NVDA', 'BTCUSD', 'EUR / USD'];
    } catch {
      return ['SPX', 'NVDA', 'BTCUSD', 'EUR / USD'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tv_terminal_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error(e);
    }
  }, [watchlist]);

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const allSymbols: MarketItem[] = [
    ...MAJOR_INDICES,
    ...WORLD_INDICES,
    ...EXTENDED_STOCKS_LIST,
    ...CRYPTO_LIST,
    ...FOREX_LIST,
    ...COMMODITIES_LIST
  ];

  const handleSelectSymbol = (item: MarketItem) => {
    setSelectedChartItem(item);
    setChartModalOpen(true);
  };

  const handleOpenWidgetModal = (symbol: string = 'SPX') => {
    setWidgetSymbol(symbol);
    setWidgetModalOpen(true);
  };

  const handleOpenChartModal = (item?: MarketItem) => {
    setSelectedChartItem(item || MAJOR_INDICES[0]);
    setChartModalOpen(true);
  };

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#faf9ff] text-[#131722] flex flex-col font-sans">
      {/* Fixed Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWatchlist={() => setWatchlistOpen(true)}
        watchlistCount={watchlist.length}
        liveStreaming={liveStreaming}
        setLiveStreaming={setLiveStreaming}
      />

      {/* Main Viewport Content - pt-24 offsets 56px + 40px fixed headers */}
      <main className="w-full pt-24 flex-1">
        {activeTab === 'overview' && (
          <OverviewView
            onSelectSymbol={handleSelectSymbol}
            onOpenWidgetModal={handleOpenWidgetModal}
            onOpenChartModal={handleOpenChartModal}
            onNavigateTab={setActiveTab}
            liveStreaming={liveStreaming}
          />
        )}
        {activeTab === 'stocks' && (
          <StocksView
            onSelectSymbol={handleSelectSymbol}
            onOpenChartModal={handleOpenChartModal}
          />
        )}
        {activeTab === 'crypto' && (
          <CryptoView
            onSelectSymbol={handleSelectSymbol}
            onOpenChartModal={handleOpenChartModal}
          />
        )}
        {activeTab === 'forex' && (
          <ForexView
            onSelectSymbol={handleSelectSymbol}
            onOpenChartModal={handleOpenChartModal}
          />
        )}
        {activeTab === 'indices' && (
          <IndicesView
            onSelectSymbol={handleSelectSymbol}
            onOpenChartModal={handleOpenChartModal}
          />
        )}
        {activeTab === 'futures' && (
          <FuturesView
            onSelectSymbol={handleSelectSymbol}
            onOpenChartModal={handleOpenChartModal}
          />
        )}
        {activeTab === 'bonds' && <BondsView />}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />

      {/* Global Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectSymbol={handleSelectSymbol}
      />

      {/* Interactive Full Chart Modal */}
      <ChartModal
        isOpen={chartModalOpen}
        onClose={() => setChartModalOpen(false)}
        symbolItem={selectedChartItem}
        onToggleWatchlist={toggleWatchlist}
        isWatchlisted={selectedChartItem ? watchlist.includes(selectedChartItem.symbol) : false}
      />

      {/* Get Widget Modal */}
      <WidgetModal
        isOpen={widgetModalOpen}
        onClose={() => setWidgetModalOpen(false)}
        defaultSymbol={widgetSymbol}
      />

      {/* Watchlist Slide-over Drawer */}
      <WatchlistDrawer
        isOpen={watchlistOpen}
        onClose={() => setWatchlistOpen(false)}
        watchlistSymbols={watchlist}
        allSymbols={allSymbols}
        onRemove={toggleWatchlist}
        onSelectSymbol={handleSelectSymbol}
      />
    </div>
  );
}
