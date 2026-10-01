import { MarketItem, StockDetailed, EarningsItem, YieldPoint } from '../types/market';

export const MAJOR_INDICES: MarketItem[] = [
  {
    id: 'sp500',
    symbol: 'SPX',
    name: 'S&P 500',
    exchange: 'INDEX',
    type: 'index',
    price: 5864.67,
    change: 24.12,
    pctChange: 0.41,
    badge: '500',
    badgeBg: '#f23645',
    sparkline: [5840, 5845, 5838, 5852, 5849, 5864.67]
  },
  {
    id: 'nasdaq100',
    symbol: 'NDX',
    name: 'Nasdaq 100',
    exchange: 'INDEX',
    type: 'index',
    price: 20439.12,
    change: 168.40,
    pctChange: 0.83,
    badge: '100',
    badgeBg: '#00bcd4',
    sparkline: [20270, 20310, 20295, 20380, 20410, 20439.12]
  },
  {
    id: 'dow30',
    symbol: 'DJI',
    name: 'Dow 30',
    exchange: 'INDEX',
    type: 'index',
    price: 42313.00,
    change: -64.20,
    pctChange: -0.15,
    badge: '30',
    badgeBg: '#0288d1',
    sparkline: [42377, 42350, 42380, 42320, 42340, 42313.00]
  },
  {
    id: 'russell2000',
    symbol: 'RUT',
    name: 'US 2000',
    exchange: 'INDEX',
    type: 'index',
    price: 2238.45,
    change: 11.80,
    pctChange: 0.53,
    badge: '2K',
    badgeBg: '#7b1fa2',
    sparkline: [2226, 2230, 2228, 2235, 2232, 2238.45]
  },
  {
    id: 'nasdaqcomp',
    symbol: 'IXIC',
    name: 'Nasdaq Comp',
    exchange: 'INDEX',
    type: 'index',
    price: 18518.61,
    change: 142.30,
    pctChange: 0.77,
    badge: 'IX',
    badgeBg: '#ff7043',
    sparkline: [18376, 18410, 18395, 18480, 18495, 18518.61]
  },
  {
    id: 'nysecomp',
    symbol: 'NYA',
    name: 'NYSE Comp',
    exchange: 'INDEX',
    type: 'index',
    price: 19650.18,
    change: 38.92,
    pctChange: 0.20,
    badge: 'NY',
    badgeBg: '#37474f',
    sparkline: [19611, 19625, 19620, 19640, 19635, 19650.18]
  }
];

export const WORLD_INDICES: MarketItem[] = [
  {
    id: 'ni225',
    symbol: 'NI225',
    name: 'Japan 225 Index',
    countryCode: 'JP',
    type: 'index',
    price: 38981.75,
    change: 70.16,
    pctChange: 0.18,
    sparkline: [38850, 38910, 38890, 38950, 38981.75]
  },
  {
    id: 'ukx',
    symbol: 'UKX',
    name: 'FTSE 100 Index',
    countryCode: 'UK',
    type: 'index',
    price: 8245.30,
    change: -1.65,
    pctChange: -0.02,
    sparkline: [8260, 8250, 8255, 8240, 8245.30]
  },
  {
    id: 'dax',
    symbol: 'DAX',
    name: 'DAX Index',
    countryCode: 'DE',
    type: 'index',
    price: 19400.12,
    change: 67.90,
    pctChange: 0.35,
    sparkline: [19320, 19350, 19340, 19380, 19400.12]
  },
  {
    id: 'px1',
    symbol: 'PX1',
    name: 'CAC 40 Index',
    countryCode: 'FR',
    type: 'index',
    price: 7532.40,
    change: 9.04,
    pctChange: 0.12,
    sparkline: [7520, 7525, 7522, 7530, 7532.40]
  },
  {
    id: 'ftmib',
    symbol: 'FTMIB',
    name: 'Milano Borsa',
    countryCode: 'IT',
    type: 'index',
    price: 34810.00,
    change: 167.08,
    pctChange: 0.48,
    sparkline: [34600, 34680, 34720, 34790, 34810.00]
  },
  {
    id: 'ibc',
    symbol: 'IBC',
    name: 'IBEX 35 Index',
    countryCode: 'ES',
    type: 'index',
    price: 11885.60,
    change: 26.15,
    pctChange: 0.22,
    sparkline: [11850, 11865, 11860, 11880, 11885.60]
  },
  {
    id: 'hsi',
    symbol: 'HSI',
    name: 'Hang Seng Index',
    countryCode: 'HK',
    type: 'index',
    price: 20590.15,
    change: -263.55,
    pctChange: -1.26,
    sparkline: [20850, 20790, 20700, 20630, 20590.15]
  },
  {
    id: 'nifty',
    symbol: 'NIFTY',
    name: 'Nifty 50 Index',
    countryCode: 'IN',
    type: 'index',
    price: 24478.30,
    change: 107.70,
    pctChange: 0.44,
    sparkline: [24350, 24390, 24410, 24450, 24478.30]
  }
];

export const FEATURED_STOCKS: Record<string, StockDetailed> = {
  NVDA: {
    id: 'nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 140.52,
    change: 3.92,
    pctChange: 2.87,
    currency: 'USD',
    badge: 'NV',
    badgeBg: '#0049db',
    volume: '48.2M',
    avgVolume: '46.8M',
    marketCap: '3.45T',
    peRatio: 64.2,
    eps: 2.19,
    week52High: 144.42,
    week52Low: 45.68,
    sector: 'Semiconductors',
    beta: 1.68,
    description: 'NVIDIA Corporation designs graphics processing units (GPUs) for the gaming and professional markets, as well as system on a chip units (SoCs) for the mobile computing and automotive market. Its primary GPU product line, labeled "GeForce", is in direct competition with the "Radeon" products by AMD.',
    timeframes: {
      '1D': {
        labels: ['09:30 AM', '10:30 AM', '11:45 AM', '01:00 PM', '02:15 PM', '03:30 PM', '04:00 PM'],
        prices: [136.60, 137.45, 138.10, 137.90, 139.20, 139.85, 140.52],
        volumes: [5.2, 8.4, 6.1, 7.8, 9.4, 8.1, 3.2]
      },
      '5D': {
        labels: ['Oct 24', 'Oct 25', 'Oct 28', 'Oct 29', 'Oct 30'],
        prices: [134.20, 135.80, 137.10, 138.25, 140.52],
        volumes: [42.1, 45.3, 49.0, 51.2, 48.2]
      },
      '1M': {
        labels: ['Oct 01', 'Oct 08', 'Oct 15', 'Oct 22', 'Oct 30'],
        prices: [121.50, 128.20, 132.80, 138.00, 140.52],
        volumes: [195, 210, 240, 235, 218]
      },
      '6M': {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        prices: [88.50, 126.00, 123.50, 118.00, 121.40, 140.52],
        volumes: [1200, 1600, 1450, 1320, 1180, 1350]
      },
      '1Y': {
        labels: ['Nov 23', 'Jan 24', 'Apr 24', 'Jul 24', 'Oct 24'],
        prices: [46.80, 59.40, 86.40, 123.50, 140.52],
        volumes: [2100, 2800, 3100, 3400, 3200]
      },
      '5Y': {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        prices: [13.20, 32.50, 14.60, 48.90, 140.52],
        volumes: [12500, 15800, 14200, 18900, 21500]
      },
      'ALL': {
        labels: ['2000', '2006', '2012', '2018', '2024'],
        prices: [0.95, 2.80, 3.40, 37.50, 140.52],
        volumes: [45000, 78000, 92000, 145000, 185000]
      }
    }
  },
  AAPL: {
    id: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 231.41,
    change: 1.50,
    pctChange: 0.65,
    currency: 'USD',
    badge: 'AA',
    badgeBg: '#131722',
    volume: '31.4M',
    avgVolume: '45.1M',
    marketCap: '3.52T',
    peRatio: 34.8,
    eps: 6.64,
    week52High: 237.23,
    week52Low: 164.08,
    sector: 'Consumer Electronics',
    beta: 1.05,
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories, and sells a variety of related services.',
    timeframes: {
      '1D': {
        labels: ['09:30 AM', '10:30 AM', '11:45 AM', '01:00 PM', '02:15 PM', '03:30 PM', '04:00 PM'],
        prices: [229.90, 230.40, 230.85, 230.50, 231.05, 231.25, 231.41],
        volumes: [3.4, 5.1, 4.2, 4.8, 6.2, 5.1, 2.6]
      },
      '5D': {
        labels: ['Oct 24', 'Oct 25', 'Oct 28', 'Oct 29', 'Oct 30'],
        prices: [230.20, 231.10, 230.80, 230.45, 231.41]
      },
      '1M': {
        labels: ['Oct 01', 'Oct 08', 'Oct 15', 'Oct 22', 'Oct 30'],
        prices: [226.30, 228.40, 231.80, 230.10, 231.41]
      },
      '6M': {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        prices: [173.50, 207.00, 224.20, 218.40, 227.50, 231.41]
      },
      '1Y': {
        labels: ['Nov 23', 'Jan 24', 'Apr 24', 'Jul 24', 'Oct 24'],
        prices: [189.50, 188.20, 169.30, 224.20, 231.41]
      },
      '5Y': {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        prices: [68.40, 128.50, 131.00, 192.50, 231.41]
      },
      'ALL': {
        labels: ['2000', '2006', '2012', '2018', '2024'],
        prices: [0.85, 2.95, 20.40, 52.80, 231.41]
      }
    }
  },
  AMZN: {
    id: 'amzn',
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 186.40,
    change: 2.15,
    pctChange: 1.17,
    currency: 'USD',
    badge: 'AZ',
    badgeBg: '#ff9900',
    volume: '28.6M',
    avgVolume: '37.4M',
    marketCap: '1.96T',
    peRatio: 43.5,
    eps: 4.28,
    week52High: 201.20,
    week52Low: 131.25,
    sector: 'Internet Retail',
    beta: 1.14,
    description: 'Amazon.com, Inc. focuses on retail sale of consumer products and subscriptions through online and physical stores, plus cloud computing via AWS.',
    timeframes: {
      '1D': {
        labels: ['09:30 AM', '10:30 AM', '11:45 AM', '01:00 PM', '02:15 PM', '03:30 PM', '04:00 PM'],
        prices: [184.25, 185.10, 185.80, 185.40, 186.05, 186.20, 186.40]
      },
      '5D': {
        labels: ['Oct 24', 'Oct 25', 'Oct 28', 'Oct 29', 'Oct 30'],
        prices: [186.80, 187.90, 188.40, 185.20, 186.40]
      },
      '1M': {
        labels: ['Oct 01', 'Oct 08', 'Oct 15', 'Oct 22', 'Oct 30'],
        prices: [182.10, 181.50, 187.60, 186.40, 186.40]
      },
      '6M': {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        prices: [178.00, 185.50, 198.00, 172.00, 186.00, 186.40]
      },
      '1Y': {
        labels: ['Nov 23', 'Jan 24', 'Apr 24', 'Jul 24', 'Oct 24'],
        prices: [142.00, 155.00, 180.00, 198.00, 186.40]
      },
      '5Y': {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        prices: [94.50, 168.00, 85.00, 150.00, 186.40]
      },
      'ALL': {
        labels: ['2000', '2006', '2012', '2018', '2024'],
        prices: [2.10, 2.40, 12.50, 85.00, 186.40]
      }
    }
  },
  GOOG: {
    id: 'goog',
    symbol: 'GOOG',
    name: 'Alphabet Inc Class C',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 172.85,
    change: 3.14,
    pctChange: 1.85,
    currency: 'USD',
    badge: 'GO',
    badgeBg: '#4285f4',
    volume: '22.4M',
    avgVolume: '24.9M',
    marketCap: '2.14T',
    peRatio: 23.9,
    eps: 7.23,
    week52High: 191.75,
    week52Low: 129.40,
    sector: 'Interactive Media & Services',
    beta: 1.02,
    description: 'Alphabet Inc. provides Google services including Search, YouTube, Android, Chrome, Hardware, and Google Cloud platform solutions.',
    timeframes: {
      '1D': {
        labels: ['09:30 AM', '10:30 AM', '11:45 AM', '01:00 PM', '02:15 PM', '03:30 PM', '04:00 PM'],
        prices: [169.70, 170.80, 171.40, 171.20, 172.10, 172.60, 172.85]
      },
      '5D': {
        labels: ['Oct 24', 'Oct 25', 'Oct 28', 'Oct 29', 'Oct 30'],
        prices: [163.40, 166.80, 168.20, 169.70, 172.85]
      },
      '1M': {
        labels: ['Oct 01', 'Oct 08', 'Oct 15', 'Oct 22', 'Oct 30'],
        prices: [166.50, 164.80, 166.20, 165.90, 172.85]
      },
      '6M': {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        prices: [168.00, 180.00, 187.00, 162.00, 163.50, 172.85]
      },
      '1Y': {
        labels: ['Nov 23', 'Jan 24', 'Apr 24', 'Jul 24', 'Oct 24'],
        prices: [130.00, 142.00, 155.00, 187.00, 172.85]
      },
      '5Y': {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        prices: [62.00, 140.00, 89.00, 138.00, 172.85]
      },
      'ALL': {
        labels: ['2004', '2009', '2014', '2019', '2024'],
        prices: [2.50, 15.00, 27.50, 68.00, 172.85]
      }
    }
  },
  TSLA: {
    id: 'tsla',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 218.85,
    change: -3.10,
    pctChange: -1.40,
    currency: 'USD',
    badge: 'TS',
    badgeBg: '#e82127',
    volume: '36.1M',
    avgVolume: '58.3M',
    marketCap: '698.4B',
    peRatio: 68.4,
    eps: 3.20,
    week52High: 271.00,
    week52Low: 138.80,
    sector: 'Automotive',
    beta: 2.32,
    description: 'Tesla, Inc. designs, develops, manufactures, sells, and leases electric vehicles, energy storage systems, and solar panels.',
    timeframes: {
      '1D': {
        labels: ['09:30 AM', '10:30 AM', '11:45 AM', '01:00 PM', '02:15 PM', '03:30 PM', '04:00 PM'],
        prices: [222.00, 220.50, 219.80, 220.10, 218.90, 219.20, 218.85]
      },
      '5D': {
        labels: ['Oct 24', 'Oct 25', 'Oct 28', 'Oct 29', 'Oct 30'],
        prices: [213.60, 269.20, 262.50, 259.00, 218.85]
      },
      '1M': {
        labels: ['Oct 01', 'Oct 08', 'Oct 15', 'Oct 22', 'Oct 30'],
        prices: [258.00, 244.00, 221.00, 218.00, 218.85]
      },
      '6M': {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        prices: [175.00, 182.00, 246.00, 208.00, 250.00, 218.85]
      },
      '1Y': {
        labels: ['Nov 23', 'Jan 24', 'Apr 24', 'Jul 24', 'Oct 24'],
        prices: [210.00, 248.00, 160.00, 246.00, 218.85]
      },
      '5Y': {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        prices: [28.00, 260.00, 123.00, 250.00, 218.85]
      },
      'ALL': {
        labels: ['2010', '2014', '2018', '2021', '2024'],
        prices: [1.60, 15.00, 22.00, 380.00, 218.85]
      }
    }
  },
  MSFT: {
    id: 'msft',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 428.15,
    change: 1.62,
    pctChange: 0.38,
    currency: 'USD',
    badge: 'MS',
    badgeBg: '#00a4ef',
    volume: '18.5M',
    avgVolume: '19.8M',
    marketCap: '3.18T',
    peRatio: 36.1,
    eps: 11.86,
    week52High: 468.35,
    week52Low: 337.50,
    sector: 'Software Infrastructure',
    beta: 0.91,
    description: 'Microsoft Corporation develops and supports software, services, devices, and solutions, including Windows, Office 365, Azure Cloud, and LinkedIn.',
    timeframes: {
      '1D': {
        labels: ['09:30 AM', '10:30 AM', '11:45 AM', '01:00 PM', '02:15 PM', '03:30 PM', '04:00 PM'],
        prices: [426.50, 427.10, 427.80, 427.30, 428.00, 428.10, 428.15]
      },
      '5D': {
        labels: ['Oct 24', 'Oct 25', 'Oct 28', 'Oct 29', 'Oct 30'],
        prices: [424.80, 428.20, 427.50, 431.90, 428.15]
      },
      '1M': {
        labels: ['Oct 01', 'Oct 08', 'Oct 15', 'Oct 22', 'Oct 30'],
        prices: [418.00, 416.00, 419.00, 425.00, 428.15]
      },
      '6M': {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        prices: [405.00, 448.00, 435.00, 412.00, 430.00, 428.15]
      },
      '1Y': {
        labels: ['Nov 23', 'Jan 24', 'Apr 24', 'Jul 24', 'Oct 24'],
        prices: [355.00, 390.00, 410.00, 440.00, 428.15]
      },
      '5Y': {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        prices: [160.00, 290.00, 240.00, 370.00, 428.15]
      },
      'ALL': {
        labels: ['2000', '2006', '2012', '2018', '2024'],
        prices: [25.00, 24.00, 30.00, 105.00, 428.15]
      }
    }
  }
};

export const COMMUNITY_TRENDS: MarketItem[] = [
  {
    id: 'mu',
    symbol: 'MU',
    name: 'Micron Technology',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 110.85,
    change: 4.90,
    pctChange: 4.62,
    badge: 'MU'
  },
  {
    id: 'goog-comm',
    symbol: 'GOOG',
    name: 'Alphabet Inc Class C',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 172.85,
    change: 3.14,
    pctChange: 1.85,
    badge: 'GO'
  },
  {
    id: 'hpe',
    symbol: 'HPE',
    name: 'Hewlett Packard Ent.',
    exchange: 'NYSE',
    type: 'stock',
    price: 19.24,
    change: -0.18,
    pctChange: -0.94,
    badge: 'HP'
  },
  {
    id: 'rklb',
    symbol: 'RKLB',
    name: 'Rocket Lab Corporation',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 12.35,
    change: 0.82,
    pctChange: 7.12,
    badge: 'RK'
  },
  {
    id: 'intc',
    symbol: 'INTC',
    name: 'Intel Corporation',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 22.80,
    change: 0.28,
    pctChange: 1.24,
    badge: 'IN'
  }
];

export const HIGHEST_VOLUME_STOCKS: MarketItem[] = [
  {
    id: 'nvda-vol',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 140.52,
    change: 3.92,
    pctChange: 2.87,
    volume: '48.2M vol',
    badge: 'NV'
  },
  {
    id: 'tsla-vol',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 218.85,
    change: -3.10,
    pctChange: -1.40,
    volume: '36.1M vol',
    badge: 'TS'
  },
  {
    id: 'aapl-vol',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 231.41,
    change: 1.50,
    pctChange: 0.65,
    volume: '31.4M vol',
    badge: 'AA'
  },
  {
    id: 'meta-vol',
    symbol: 'META',
    name: 'Meta Platforms',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 589.34,
    change: 11.02,
    pctChange: 1.90,
    volume: '19.8M vol',
    badge: 'ME'
  },
  {
    id: 'msft-vol',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 428.15,
    change: 1.62,
    pctChange: 0.38,
    volume: '18.5M vol',
    badge: 'MS'
  }
];

export const EARNINGS_CALENDAR: EarningsItem[] = [
  {
    id: 'ayi',
    ticker: 'AYI',
    name: 'Acuity Inc.',
    estimate: 'Est. 5.57 USD',
    date: 'TODAY',
    isToday: true,
    reported: '5.62 USD',
    surprise: '+0.9%'
  },
  {
    id: 'mkc',
    ticker: 'MKC',
    name: 'McCormick & Co',
    estimate: 'Est. 0.76 USD',
    date: 'TODAY',
    isToday: true,
    reported: '0.83 USD',
    surprise: '+9.2%'
  },
  {
    id: 'acn',
    ticker: 'ACN',
    name: 'Accenture plc',
    estimate: 'Est. 3.18 USD',
    date: 'TODAY',
    isToday: true,
    reported: '3.21 USD',
    surprise: '+0.9%'
  },
  {
    id: 'nke',
    ticker: 'NKE',
    name: 'Nike, Inc.',
    estimate: 'Est. 0.44 USD',
    date: 'TODAY',
    isToday: true,
    reported: '0.49 USD',
    surprise: '+11.4%'
  },
  {
    id: 'rpm',
    ticker: 'RPM',
    name: 'RPM International',
    estimate: 'Est. 1.95 USD',
    date: 'OCT 6',
    isToday: false
  },
  {
    id: 'pep',
    ticker: 'PEP',
    name: 'PepsiCo, Inc.',
    estimate: 'Est. 2.29 USD',
    date: 'OCT 8',
    isToday: false
  },
  {
    id: 'dal',
    ticker: 'DAL',
    name: 'Delta Air Lines',
    estimate: 'Est. 1.52 USD',
    date: 'OCT 10',
    isToday: false
  }
];

export const CRYPTO_LIST: MarketItem[] = [
  {
    id: 'btc',
    symbol: 'BTCUSD',
    name: 'Bitcoin',
    type: 'crypto',
    price: 67420.00,
    change: 1580.00,
    pctChange: 2.40,
    marketCap: '1.69T',
    volume: '34.8B',
    badge: '₿',
    badgeBg: '#f7931a',
    sparkline: [65840, 66100, 66350, 66900, 67420]
  },
  {
    id: 'eth',
    symbol: 'ETHUSD',
    name: 'Ethereum',
    type: 'crypto',
    price: 2640.85,
    change: 46.80,
    pctChange: 1.80,
    marketCap: '331.8B',
    volume: '18.4B',
    badge: 'Ξ',
    badgeBg: '#627eea',
    sparkline: [2594, 2610, 2605, 2628, 2640.85]
  },
  {
    id: 'sol',
    symbol: 'SOLUSD',
    name: 'Solana',
    type: 'crypto',
    price: 174.50,
    change: 6.95,
    pctChange: 4.15,
    marketCap: '78.4B',
    volume: '4.6B',
    badge: 'SOL',
    badgeBg: '#14f195',
    sparkline: [167.5, 169.0, 171.2, 172.8, 174.50]
  },
  {
    id: 'xrp',
    symbol: 'XRPUSD',
    name: 'XRP',
    type: 'crypto',
    price: 0.548,
    change: -0.0045,
    pctChange: -0.82,
    marketCap: '95.0B',
    volume: '1.2B',
    badge: 'XRP',
    badgeBg: '#23292f',
    sparkline: [0.552, 0.551, 0.549, 0.550, 0.548]
  },
  {
    id: 'bnb',
    symbol: 'BNBUSD',
    name: 'BNB',
    type: 'crypto',
    price: 588.20,
    change: 8.40,
    pctChange: 1.45,
    marketCap: '86.1B',
    volume: '950M',
    badge: 'BNB',
    badgeBg: '#f3ba2f',
    sparkline: [579, 582, 584, 586, 588.2]
  },
  {
    id: 'ada',
    symbol: 'ADAUSD',
    name: 'Cardano',
    type: 'crypto',
    price: 0.354,
    change: 0.008,
    pctChange: 2.31,
    marketCap: '12.8B',
    volume: '340M',
    badge: 'ADA',
    badgeBg: '#0033ad',
    sparkline: [0.346, 0.348, 0.351, 0.352, 0.354]
  }
];

export const FOREX_LIST: MarketItem[] = [
  {
    id: 'eurusd',
    symbol: 'EUR / USD',
    name: 'Euro to US Dollar',
    type: 'forex',
    price: 1.08245,
    change: 0.00130,
    pctChange: 0.12,
    badge: 'EU',
    badgeBg: '#2962ff'
  },
  {
    id: 'usdjpy',
    symbol: 'USD / JPY',
    name: 'US Dollar to Japanese Yen',
    type: 'forex',
    price: 152.84,
    change: -0.48,
    pctChange: -0.31,
    badge: 'JP',
    badgeBg: '#2962ff'
  },
  {
    id: 'gbpusd',
    symbol: 'GBP / USD',
    name: 'British Pound to US Dollar',
    type: 'forex',
    price: 1.29860,
    change: 0.00311,
    pctChange: 0.24,
    badge: 'GB',
    badgeBg: '#2962ff'
  },
  {
    id: 'dxy',
    symbol: 'US Dollar Index',
    name: 'DXY Currency Basket',
    type: 'forex',
    price: 104.18,
    change: -0.19,
    pctChange: -0.18,
    badge: 'DXY',
    badgeBg: '#131722'
  },
  {
    id: 'usdcad',
    symbol: 'USD / CAD',
    name: 'US Dollar to Canadian Dollar',
    type: 'forex',
    price: 1.38920,
    change: -0.0012,
    pctChange: -0.09,
    badge: 'CA',
    badgeBg: '#2962ff'
  },
  {
    id: 'audusd',
    symbol: 'AUD / USD',
    name: 'Australian Dollar to US Dollar',
    type: 'forex',
    price: 0.65820,
    change: 0.0028,
    pctChange: 0.43,
    badge: 'AU',
    badgeBg: '#2962ff'
  }
];

export const COMMODITIES_LIST: MarketItem[] = [
  {
    id: 'gold',
    symbol: 'Gold Futures (GC1!)',
    name: 'Gold',
    exchange: 'COMEX',
    category: '100 Troy Oz',
    type: 'commodity',
    price: 2748.20,
    change: 18.50,
    pctChange: 0.68,
    currency: 'USD'
  },
  {
    id: 'crude-oil',
    symbol: 'Light Crude Oil (CL1!)',
    name: 'Crude Oil',
    exchange: 'NYMEX',
    category: '1,000 Barrels',
    type: 'commodity',
    price: 70.92,
    change: -0.95,
    pctChange: -1.32,
    currency: 'USD'
  },
  {
    id: 'silver',
    symbol: 'Silver Futures (SI1!)',
    name: 'Silver',
    exchange: 'COMEX',
    category: '5,000 Troy Oz',
    type: 'commodity',
    price: 33.72,
    change: 0.48,
    pctChange: 1.45,
    currency: 'USD'
  },
  {
    id: 'nat-gas',
    symbol: 'Natural Gas (NG1!)',
    name: 'Natural Gas',
    exchange: 'NYMEX',
    category: '10,000 MMBtu',
    type: 'commodity',
    price: 2.48,
    change: 0.05,
    pctChange: 2.10,
    currency: 'USD'
  },
  {
    id: 'copper',
    symbol: 'High Grade Copper (HG1!)',
    name: 'Copper',
    exchange: 'COMEX',
    category: '25,000 Lbs',
    type: 'commodity',
    price: 4.36,
    change: 0.04,
    pctChange: 0.93,
    currency: 'USD'
  },
  {
    id: 'brent',
    symbol: 'Brent Crude (BZ1!)',
    name: 'Brent Crude',
    exchange: 'ICE',
    category: '1,000 Barrels',
    type: 'commodity',
    price: 74.80,
    change: -0.72,
    pctChange: -0.95,
    currency: 'USD'
  }
];

export const YIELD_CURVE_POINTS: YieldPoint[] = [
  { tenor: '1M', usYield: 4.82, deYield: 3.25, ukYield: 4.70 },
  { tenor: '2Y', usYield: 4.14, deYield: 2.18, ukYield: 4.22 },
  { tenor: '5Y', usYield: 4.02, deYield: 2.12, ukYield: 4.16 },
  { tenor: '10Y', usYield: 4.248, deYield: 2.41, ukYield: 4.28 },
  { tenor: '30Y', usYield: 4.51, deYield: 2.65, ukYield: 4.72 }
];

export const EXTENDED_STOCKS_LIST: MarketItem[] = [
  ...Object.values(FEATURED_STOCKS),
  ...COMMUNITY_TRENDS.filter(t => !['GOOG'].includes(t.symbol)),
  {
    id: 'amd',
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 154.20,
    change: 3.45,
    pctChange: 2.29,
    volume: '39.8M vol',
    badge: 'AM',
    badgeBg: '#ed1c24'
  },
  {
    id: 'pltr',
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    exchange: 'NYSE',
    type: 'stock',
    price: 44.86,
    change: 1.82,
    pctChange: 4.23,
    volume: '52.1M vol',
    badge: 'PL',
    badgeBg: '#131722'
  },
  {
    id: 'nflx',
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    exchange: 'NASDAQ',
    type: 'stock',
    price: 754.20,
    change: 9.35,
    pctChange: 1.26,
    volume: '4.2M vol',
    badge: 'NF',
    badgeBg: '#e50914'
  },
  {
    id: 'lly',
    symbol: 'LLY',
    name: 'Eli Lilly and Company',
    exchange: 'NYSE',
    type: 'stock',
    price: 885.40,
    change: -12.10,
    pctChange: -1.35,
    volume: '2.8M vol',
    badge: 'LL',
    badgeBg: '#d01f2f'
  },
  {
    id: 'brk',
    symbol: 'BRK.B',
    name: 'Berkshire Hathaway Inc.',
    exchange: 'NYSE',
    type: 'stock',
    price: 452.10,
    change: 0.95,
    pctChange: 0.21,
    volume: '3.1M vol',
    badge: 'BR',
    badgeBg: '#002f6c'
  }
];
