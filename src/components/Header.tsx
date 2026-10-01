import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  liveStreaming: boolean;
  setLiveStreaming: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
  liveStreaming,
  setLiveStreaming
}) => {
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState('EN');
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const subNavItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
    { id: 'indices', label: 'Indices' },
    { id: 'futures', label: 'Futures' },
    { id: 'bonds', label: 'Bonds' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-[#ffffff] border-b border-[#E0E3EB]">
      {/* Top primary header */}
      <div className="h-14 max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5 lg:gap-7">
          {/* Logo */}
          <button 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-1 text-[#131722] hover:opacity-90 transition-opacity focus:outline-none"
            aria-label="Home"
          >
            <div className="w-7 h-7 bg-[#131722] rounded flex items-center justify-center shadow-xs">
              <span className="text-[#ffffff] font-extrabold text-[15px] tracking-tighter">TV</span>
            </div>
            <span className="font-bold text-[15px] tracking-tight text-[#131722] hidden sm:inline-block">Markets</span>
          </button>

          {/* Search trigger button */}
          <div className="relative flex items-center">
            <button
              onClick={onOpenSearch}
              className="w-48 sm:w-60 md:w-64 h-9 bg-[#F0F3FA] hover:bg-[#ebedfa] rounded-full flex items-center px-3 gap-2 transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#2962ff]/40"
              aria-label="Search markets and symbols"
            >
              <span className="material-symbols-outlined text-[#787B86] text-[18px]">search</span>
              <span className="text-[13px] text-[#787B86] flex-1 select-none font-normal truncate">
                Search (Ctrl+K)
              </span>
              <span className="hidden sm:inline-block text-[10px] text-[#787B86] bg-[#ffffff] border border-[#E0E3EB] px-1.5 py-0.5 rounded font-mono font-medium leading-none">
                ⌘K
              </span>
            </button>
          </div>

          {/* Primary Nav links */}
          <nav className="hidden lg:flex items-center gap-6 relative text-[14px]">
            <button 
              onClick={() => setActiveTab('stocks')} 
              className="text-[#787B86] hover:text-[#131722] transition-colors py-1 font-medium"
            >
              Products
            </button>
            <button 
              onClick={() => setActiveTab('overview')} 
              className="text-[#787B86] hover:text-[#131722] transition-colors py-1 font-medium"
            >
              Community
            </button>
            <button 
              onClick={() => setActiveTab('overview')} 
              className="relative transition-colors py-1 text-[#131722] font-bold after:absolute after:bottom-[-16px] after:left-0 after:right-0 after:h-[2px] after:bg-[#0049db]"
            >
              Markets
            </button>
            <button 
              onClick={() => setActiveTab('forex')} 
              className="text-[#787B86] hover:text-[#131722] transition-colors py-1 font-medium"
            >
              Brokers
            </button>
            <button 
              onClick={() => setActiveTab('bonds')} 
              className="text-[#787B86] hover:text-[#131722] transition-colors py-1 font-medium"
            >
              More
            </button>
          </nav>
        </div>

        {/* Right utility items */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Watchlist Quick Button */}
          <button
            onClick={onOpenWatchlist}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA] transition-colors text-[13px] font-medium"
            title="Open Watchlist"
          >
            <span className="material-symbols-outlined text-[19px] text-[#2962ff]">star</span>
            <span className="hidden sm:inline">Watchlist</span>
            {watchlistCount > 0 && (
              <span className="bg-[#2962ff] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">language</span>
              <span className="text-[13px] text-[#131722] font-semibold">{selectedLang}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-[#E0E3EB] rounded-xl shadow-lg py-1 z-50">
                {['EN', 'DE', 'FR', 'ES', 'JA', 'ZH'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-[#F0F3FA] flex items-center justify-between ${selectedLang === lang ? 'font-bold text-[#0049db]' : 'text-[#131722]'}`}
                  >
                    <span>{lang === 'EN' ? 'English' : lang === 'DE' ? 'Deutsch' : lang === 'FR' ? 'Français' : lang === 'ES' ? 'Español' : lang === 'JA' ? '日本語' : '中文'}</span>
                    <span className="text-[11px] text-[#787B86]">{lang}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User profile button */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-8 h-8 rounded-full bg-[#0049db] flex items-center justify-center text-white hover:opacity-95 transition-opacity"
              type="button"
              aria-label="User Profile"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E0E3EB] rounded-xl shadow-xl py-2 z-50 text-[13px]">
                <div className="px-4 py-2 border-b border-[#E0E3EB]">
                  <div className="font-semibold text-[#131722]">Pro Trader</div>
                  <div className="text-[11px] text-[#787B86] truncate">trader@markets.terminal</div>
                </div>
                <button 
                  onClick={() => { setUserMenuOpen(false); onOpenWatchlist(); }}
                  className="w-full text-left px-4 py-2 hover:bg-[#F0F3FA] text-[#131722]"
                >
                  My Watchlists
                </button>
                <button 
                  onClick={() => { setUserMenuOpen(false); setActiveTab('stocks'); }}
                  className="w-full text-left px-4 py-2 hover:bg-[#F0F3FA] text-[#131722]"
                >
                  Custom Screeners
                </button>
                <div className="border-t border-[#E0E3EB] my-1"></div>
                <div className="px-4 py-1.5 flex items-center justify-between text-[#787B86]">
                  <span>Live Stream Quotes</span>
                  <input
                    type="checkbox"
                    checked={liveStreaming}
                    onChange={(e) => setLiveStreaming(e.target.checked)}
                    className="accent-[#089981] w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Get started button */}
          <button
            onClick={() => setActiveTab('stocks')}
            className="h-8 px-3.5 rounded-full bg-gradient-to-r from-[#2962ff] to-[#0049db] text-white text-[13px] font-semibold flex items-center justify-center hover:opacity-95 shadow-xs transition-all whitespace-nowrap"
          >
            Get started
          </button>
        </div>
      </div>

      {/* Sub-navigation bar with Market Status */}
      <div className="h-10 border-t border-[#E0E3EB] bg-[#ffffff]">
        <div className="h-full max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <nav className="flex items-center gap-4 sm:gap-6 h-full overflow-x-auto no-scrollbar">
            {subNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center h-full px-1 text-[13px] transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#131722] font-semibold border-b-2 border-[#131722]'
                      : 'text-[#787B86] hover:text-[#131722] font-medium'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Market Status pill */}
          <div className="flex items-center gap-1.5 text-[#787B86] shrink-0 pl-3">
            <span className="text-[11px] uppercase tracking-wider font-semibold hidden md:inline">
              Market Status:
            </span>
            <span className="relative flex h-2 w-2">
              {liveStreaming && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#089981] opacity-75"></span>
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#089981]"></span>
            </span>
            <button
              onClick={() => setLiveStreaming(prev => !prev)}
              className="text-[11px] text-[#131722] font-semibold uppercase hover:underline"
              title="Click to toggle live price stream"
            >
              US OPEN {liveStreaming ? '• LIVE' : ''}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
