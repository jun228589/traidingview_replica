export interface TradeIdea {
  id: string;
  author: string;
  avatarUrl?: string;
  avatarId?: string;
  symbol: string;
  symbolName: string;
  changePercent: string;
  isBullish: boolean;
  direction: "LONG" | "SHORT" | "NEUTRAL";
  timeAgo: string;
  title: string;
  summary: string;
  chartUrl?: string;
  chartDescription?: string;
  likes: number;
  comments: number;
  hasLiked?: boolean;
  targetPrice?: string;
  stopLoss?: string;
  entryPrice?: string;
}

export interface TechnicalIndicator {
  id: string;
  name: string;
  author: string;
  authorType: "PRO TRADER" | "PREMIUM" | "VERIFIED" | "AI DEVELOPER";
  type: string;
  views: string;
  boosts: string;
  version: string;
  description: string;
  chartUrl: string;
  tags: string[];
}

export interface MarketMovers {
  symbol: string;
  name: string;
  exchange: string;
  changePercent: string;
  isBullish: boolean;
  price: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "analyst";
  content: string;
  timestamp: Date;
}
