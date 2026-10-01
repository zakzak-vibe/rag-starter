import React, { useState } from 'react';

interface WidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSymbol?: string;
}

export const WidgetModal: React.FC<WidgetModalProps> = ({
  isOpen,
  onClose,
  defaultSymbol = 'SPX'
}) => {
  const [widgetType, setWidgetType] = useState<'ticker-tape' | 'mini-chart' | 'symbol-overview'>('mini-chart');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const embedSnippet = `<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-${widgetType}.js" async>
  {
    "symbol": "${defaultSymbol}",
    "width": "100%",
    "height": "220",
    "locale": "en",
    "colorTheme": "${theme}",
    "isTransparent": false,
    "autosize": true
  }
  </script>
</div>
<!-- TradingView Widget END -->`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-[#E0E3EB] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#E0E3EB] flex items-center justify-between bg-[#faf9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0049db] text-[22px]">widgets</span>
            <h3 className="font-bold text-[16px] text-[#131722]">Embed Market Widget</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#F0F3FA] hover:bg-[#ebedfa] flex items-center justify-center text-[#131722]"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-[12px] font-semibold text-[#787B86] block mb-1.5">
              Widget Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mini-chart', label: 'Mini Chart' },
                { id: 'ticker-tape', label: 'Ticker Tape' },
                { id: 'symbol-overview', label: 'Overview' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setWidgetType(t.id as any)}
                  className={`py-2 px-3 text-[12px] font-semibold rounded-xl border transition-colors ${
                    widgetType === t.id
                      ? 'border-[#0049db] bg-[#0049db]/5 text-[#0049db]'
                      : 'border-[#E0E3EB] text-[#131722] hover:bg-[#F0F3FA]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-[#787B86] block mb-1.5">
              Theme Mode
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 py-1.5 px-3 text-[12px] font-medium rounded-lg border ${
                  theme === 'light' ? 'bg-[#131722] text-white border-[#131722]' : 'border-[#E0E3EB] text-[#131722]'
                }`}
              >
                Light Theme
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 py-1.5 px-3 text-[12px] font-medium rounded-lg border ${
                  theme === 'dark' ? 'bg-[#131722] text-white border-[#131722]' : 'border-[#E0E3EB] text-[#131722]'
                }`}
              >
                Dark Theme
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[12px] font-semibold text-[#787B86]">HTML Embed Code</label>
              <span className="text-[11px] text-[#787B86]">Ready to paste into your website</span>
            </div>
            <pre className="p-3 bg-[#131722] text-[#faf9ff] rounded-xl text-[11px] font-mono overflow-x-auto max-h-40 leading-relaxed">
              {embedSnippet}
            </pre>
          </div>
        </div>

        <div className="p-4 bg-[#F0F3FA] border-t border-[#E0E3EB] flex items-center justify-between">
          <span className="text-[12px] text-[#787B86]">Zero configuration required</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 rounded-full bg-[#0049db] text-white text-[13px] font-semibold hover:bg-[#003ab3] transition-colors"
            >
              {copied ? 'Copied to Clipboard! ✓' : 'Copy Embed Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
