import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const [modalType, setModalType] = React.useState<string | null>(null);

  return (
    <footer className="w-full bg-[#F0F3FA] border-t border-[#E0E3EB] py-8 text-[#787B86] text-[13px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span>© 2024 TradingView Markets Inc. All financial market quotes simulated or real-time.</span>
            <div className="text-[11px] text-[#787B86]/80 mt-1">
              Data feeds powered by global exchange protocols. Not financial advice.
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-[#131722] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-[#131722] transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setModalType('disclaimer')}
              className="hover:text-[#131722] transition-colors"
            >
              Disclaimer
            </button>
          </div>
        </div>

        {/* Quick category index links */}
        <div className="mt-6 pt-6 border-t border-[#E0E3EB]/70 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-[12px]">
          <span className="text-[#131722] font-semibold">Markets Directory:</span>
          {['Stocks', 'Crypto', 'Forex', 'Indices', 'Futures', 'Bonds'].map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectTab(cat.toLowerCase())}
              className="hover:text-[#131722] transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Info Dialog */}
      {modalType && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalType(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E0E3EB]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E0E3EB]">
              <h3 className="font-bold text-[16px] text-[#131722] capitalize">
                {modalType === 'terms' ? 'Terms of Service' : modalType === 'privacy' ? 'Privacy Policy' : 'Market Data Disclaimer'}
              </h3>
              <button 
                onClick={() => setModalType(null)} 
                className="w-7 h-7 rounded-full bg-[#F0F3FA] flex items-center justify-center hover:bg-[#ebedfa] text-[#131722]"
              >
                ✕
              </button>
            </div>
            <div className="py-4 text-[13px] text-[#787B86] space-y-3 leading-relaxed">
              {modalType === 'disclaimer' && (
                <p>
                  Market quotes, charts, and financial indicators displayed in this terminal are provided for informational and analytical demonstration. Real-time updates reflect live streaming ticker feeds when active.
                </p>
              )}
              {modalType === 'privacy' && (
                <p>
                  We prioritize analytical integrity. Your custom watchlists and layout preferences are stored locally in your browser sandbox without third-party tracking cookies.
                </p>
              )}
              {modalType === 'terms' && (
                <p>
                  By accessing the Fintech Market Terminal, you acknowledge the high volatility associated with equity, digital asset, foreign exchange, and fixed-income instruments.
                </p>
              )}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-1.5 rounded-full bg-[#131722] text-white text-[13px] font-medium"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
