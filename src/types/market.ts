export type AssetType = 'index' | 'stock' | 'crypto' | 'forex' | 'commodity' | 'bond';

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  exchange?: string;
  type: AssetType;
  price: number;
  change: number;
  pctChange: number;
  high?: number;
  low?: number;
  volume?: string;
  marketCap?: string;
  currency?: string;
  badge?: string;
  badgeBg?: string;
  countryCode?: string;
  sparkline?: number[];
  category?: string;
}

export interface StockDetailed extends MarketItem {
  peRatio?: number;
  eps?: number;
  week52High?: number;
  week52Low?: number;
  avgVolume?: string;
  sector?: string;
  beta?: number;
  description?: string;
  timeframes: {
    [key: string]: {
      labels: string[];
      prices: number[];
      volumes?: number[];
    };
  };
}

export interface EarningsItem {
  id: string;
  ticker: string;
  name: string;
  estimate: string;
  date: string;
  isToday?: boolean;
  reported?: string;
  surprise?: string;
}

export interface YieldPoint {
  tenor: string;
  usYield: number;
  deYield: number;
  ukYield: number;
}
