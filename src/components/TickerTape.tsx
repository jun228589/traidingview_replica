import { TrendingUp, TrendingDown } from "lucide-react";

interface TickerItem {
  symbol: string;
  change: string;
  price: string;
  isBullish: boolean;
}

const TICKER_ITEMS: TickerItem[] = [
  { symbol: "S&P 500", price: "5,432.12", change: "+1.24%", isBullish: true },
  { symbol: "BTCUSD", price: "64,320.50", change: "-2.15%", isBullish: false },
  { symbol: "NASDAQ 100", price: "18,765.40", change: "+1.52%", isBullish: true },
  { symbol: "GOLD", price: "2,384.20", change: "+0.32%", isBullish: true },
  { symbol: "EURUSD", price: "1.0852", change: "-0.11%", isBullish: false },
  { symbol: "CRUDE OIL", price: "78.45", change: "+0.85%", isBullish: true },
  { symbol: "ETHUSD", price: "3,450.15", change: "-1.85%", isBullish: false },
];

export default function TickerTape() {
  // Double the items for seamless looping
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full bg-[#1e222d] border-b border-[#2a2e39] h-10 overflow-hidden relative z-50 flex items-center">
      <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] gap-8 pl-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 text-xs font-mono select-none"
          >
            <span className="text-[#e1e1ee] font-bold">{item.symbol}</span>
            <span className="text-[#b2b5be]">{item.price}</span>
            <span
              className={`inline-flex items-center gap-0.5 font-semibold ${
                item.isBullish ? "text-[#089981]" : "text-[#f23645]"
              }`}
            >
              {item.isBullish ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
