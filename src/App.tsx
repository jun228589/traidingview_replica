import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Layers,
  Lightbulb,
  MessageSquare,
  Search,
  PlusCircle,
  Share2,
  ThumbsUp,
  MessageCircle,
  Code,
  Copy,
  Check,
  Cpu,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Compass,
  Info
} from "lucide-react";
import { INITIAL_IDEAS, INITIAL_INDICATORS, INITIAL_MOVERS } from "./data";
import { TradeIdea, TechnicalIndicator } from "./types";
import TickerTape from "./components/TickerTape";
import AnalystChat from "./components/AnalystChat";
import IndicatorModal from "./components/IndicatorModal";
import NewIdeaFormModal from "./components/NewIdeaFormModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<"ideas" | "indicators" | "chat">("ideas");
  const [ideas, setIdeas] = useState<TradeIdea[]>(INITIAL_IDEAS);
  const [indicators] = useState<TechnicalIndicator[]>(INITIAL_INDICATORS);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [directionFilter, setDirectionFilter] = useState<"ALL" | "LONG" | "SHORT">("ALL");

  // Selected details
  const [selectedIndicator, setSelectedIndicator] = useState<TechnicalIndicator | null>(null);
  const [isNewIdeaModalOpen, setIsNewIdeaModalOpen] = useState(false);
  const [activeDetailIdeaId, setActiveDetailIdeaId] = useState<string | null>(null);

  // Clipboard feedbacks
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleLike = (id: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === id) {
          const hasLiked = !idea.hasLiked;
          return {
            ...idea,
            hasLiked,
            likes: hasLiked ? idea.likes + 1 : idea.likes - 1,
          };
        }
        return idea;
      })
    );
  };

  const handleCopyHotlink = (url: string, id: string) => {
    const htmlFragment = `<img src="${url}" alt="Trading Chart View" style="border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);" />`;
    navigator.clipboard.writeText(htmlFragment);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.symbolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDirection = directionFilter === "ALL" || idea.direction === directionFilter;
    return matchesSearch && matchesDirection;
  });

  const filteredIndicators = indicators.filter((ind) => {
    return (
      ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2c] via-[#4a1942] to-[#253b52] text-white flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Ticker tape at the top */}
      <TickerTape />

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDE NAVIGATION - Frosted Glass Glassmorphism */}
        <aside className="hidden lg:flex w-72 h-[calc(100vh-2.5rem)] bg-white/10 backdrop-blur-xl border-r border-white/10 flex-col p-6 shrink-0 relative z-10 justify-between">
          <div className="space-y-8">
            {/* App branding */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20 border border-white/20 animate-pulse">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
                  TradingInsights
                </h1>
                <p className="text-[10px] text-white/50 font-mono tracking-wider">AI QUANT LAB</p>
              </div>
            </div>

            {/* Navigation options */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("ideas")}
                className={`w-full px-4 py-3.5 rounded-xl flex items-center gap-3 border transition-all duration-300 text-left cursor-pointer ${
                  activeTab === "ideas"
                    ? "bg-white/20 border-white/20 text-white font-medium shadow-md shadow-white/5"
                    : "hover:bg-white/5 border-transparent text-white/60 hover:text-white"
                }`}
              >
                <Lightbulb size={18} className={activeTab === "ideas" ? "text-amber-400" : ""} />
                <span className="text-sm">投資アイデア・フィード</span>
              </button>

              <button
                onClick={() => setActiveTab("indicators")}
                className={`w-full px-4 py-3.5 rounded-xl flex items-center gap-3 border transition-all duration-300 text-left cursor-pointer ${
                  activeTab === "indicators"
                    ? "bg-white/20 border-white/20 text-white font-medium shadow-md shadow-white/5"
                    : "hover:bg-white/5 border-transparent text-white/60 hover:text-white"
                }`}
              >
                <Layers size={18} className={activeTab === "indicators" ? "text-purple-400" : ""} />
                <span className="text-sm">AIインジケーター・ラボ</span>
              </button>

              <button
                onClick={() => setActiveTab("chat")}
                className={`w-full px-4 py-3.5 rounded-xl flex items-center gap-3 border transition-all duration-300 text-left cursor-pointer ${
                  activeTab === "chat"
                    ? "bg-white/20 border-white/20 text-white font-medium shadow-md shadow-white/5"
                    : "hover:bg-white/5 border-transparent text-white/60 hover:text-white"
                }`}
              >
                <MessageSquare size={18} className={activeTab === "chat" ? "text-pink-400" : ""} />
                <span className="text-sm">AIアナリストに相談</span>
              </button>
            </nav>
          </div>

          {/* Dynamic informational widget */}
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-pink-400 animate-spin" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                HTML Hotlink Engine
              </span>
            </div>
            <p className="text-[11px] text-white/70 leading-relaxed">
              プラットフォームの全チャートは暗号化された安全なURLを介して直接HTML画像タグからホットリンク可能です。
            </p>
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 text-[9px] font-mono text-cyan-300 select-all overflow-x-auto">
              &lt;img src="https://lh3.google..." /&gt;
            </div>
          </div>
        </aside>

        {/* MAIN BODY AREA */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* HEADER - Glassmorphism Navigation */}
          <header className="h-20 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-40">
            <div>
              <div className="flex items-center gap-2 lg:hidden mb-1">
                <Compass className="w-5 h-5 text-pink-400" />
                <span className="text-md font-bold tracking-tight">TradingInsights</span>
              </div>
              <h1 className="text-lg lg:text-2xl font-bold tracking-tight flex items-center gap-2">
                {activeTab === "ideas" && "グローバル投資アイデア・ボード"}
                {activeTab === "indicators" && "AI クオンツ・インディケーター"}
                {activeTab === "chat" && "チーフAIアナリスト「ジェイデン」"}
              </h1>
              <p className="hidden md:block text-white/50 text-xs mt-0.5">
                {activeTab === "ideas" && "世界中のトップトレーダーとAIが発信する高精度な相場予測フィード"}
                {activeTab === "indicators" && "Gemini AIが数理ロジック・Pine Scriptコードを全自動生成する高機能ライブラリ"}
                {activeTab === "chat" && "市場センチメント、インジケーター設定、Pine Script記述を即座に回答"}
              </p>
            </div>

            {/* Actions for layout header */}
            <div className="flex items-center gap-3">
              {activeTab === "ideas" && (
                <button
                  onClick={() => setIsNewIdeaModalOpen(true)}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:brightness-110 px-4 py-2.5 rounded-full font-bold text-xs shadow-lg shadow-pink-500/20 hover:scale-[1.03] transition-transform active:scale-95 flex items-center gap-2 cursor-pointer border border-white/10"
                >
                  <PlusCircle size={15} />
                  <span>新規予測を投稿</span>
                </button>
              )}
            </div>
          </header>

          {/* RESPONSIVE SUB-TAB FOR MOBILE (aside navigation replacement) */}
          <div className="lg:hidden bg-white/5 backdrop-blur-md border-b border-white/10 p-2 flex gap-1 px-4 sticky top-20 z-30 overflow-x-auto">
            <button
              onClick={() => setActiveTab("ideas")}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "ideas" ? "bg-white/20 text-white" : "text-white/60"
              }`}
            >
              アイデア
            </button>
            <button
              onClick={() => setActiveTab("indicators")}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "indicators" ? "bg-white/20 text-white" : "text-white/60"
              }`}
            >
              AIインジケーター
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "chat" ? "bg-white/20 text-white" : "text-white/60"
              }`}
            >
              AIアナリストチャット
            </button>
          </div>

          {/* DYNAMIC VIEW CONTAINER */}
          <div className="flex-1 p-4 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
            
            {/* GLOBAL SEARCH AND FILTERS (only shown on relevant tabs) */}
            {activeTab !== "chat" && (
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                {/* Search query box */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      activeTab === "ideas"
                        ? "銘柄やタイトルで予測を検索..."
                        : "インジケーターやタグで検索..."
                    }
                    className="w-full bg-black/20 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500/50 outline-none transition-all"
                  />
                  <Search size={14} className="text-white/40 absolute left-4 top-3.5" />
                </div>

                {/* Ideas specific filters */}
                {activeTab === "ideas" && (
                  <div className="flex items-center gap-1.5 self-end md:self-auto bg-black/20 p-1 rounded-xl border border-white/5">
                    {(["ALL", "LONG", "SHORT"] as const).map((dir) => (
                      <button
                        key={dir}
                        onClick={() => setDirectionFilter(dir)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          directionFilter === dir
                            ? "bg-white/20 text-white shadow"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        {dir === "ALL" && "すべて"}
                        {dir === "LONG" && "LONG (買い)"}
                        {dir === "SHORT" && "SHORT (売り)"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: IDEAS FEED */}
            {activeTab === "ideas" && (
              <div className="space-y-6">
                {filteredIdeas.length === 0 ? (
                  <div className="text-center py-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl space-y-3">
                    <p className="text-white/50 text-sm">該当する投資予測アイデアが見つかりませんでした。</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setDirectionFilter("ALL");
                      }}
                      className="text-xs text-pink-400 font-bold hover:underline"
                    >
                      検索フィルターをリセット
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {filteredIdeas.map((idea) => {
                      const isExpanded = activeDetailIdeaId === idea.id;
                      return (
                        <article
                          key={idea.id}
                          className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-3xl p-5 lg:p-6 transition-all hover:border-white/30 space-y-4 group relative overflow-hidden"
                        >
                          {/* Header section with profile */}
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/20 overflow-hidden flex items-center justify-center shrink-0">
                                {idea.avatarUrl ? (
                                  <img
                                    src={idea.avatarUrl}
                                    alt={idea.author}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="text-sm font-bold text-white uppercase">
                                    {idea.author[0]}
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-sm text-white">{idea.author}</span>
                                  {idea.author !== "マイ・トレーダー・アカウント" && (
                                    <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-[9px] font-bold uppercase rounded tracking-wider border border-blue-500/20">
                                      VERIFIED
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-white/50 font-mono tracking-wider">
                                  {idea.timeAgo}
                                </div>
                              </div>
                            </div>

                            {/* Signal Indicator */}
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                  idea.direction === "LONG"
                                    ? "bg-[#089981]/20 text-[#089981] border border-[#089981]/30"
                                    : "bg-[#f23645]/20 text-[#f23645] border border-[#f23645]/30"
                                }`}
                              >
                                {idea.direction}
                              </span>
                            </div>
                          </div>

                          {/* Title & Technical explanation */}
                          <div className="space-y-2">
                            <h2 className="text-base lg:text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                              {idea.title}
                            </h2>
                            <p className="text-xs lg:text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                              {idea.summary}
                            </p>
                          </div>

                          {/* Chart Hotlink Display */}
                          {idea.chartUrl && (
                            <div className="relative w-full aspect-[21/9] bg-black/40 rounded-2xl overflow-hidden border border-white/10 group-chart flex flex-col justify-end">
                              <img
                                src={idea.chartUrl}
                                alt={idea.symbol}
                                className="w-full h-full object-cover absolute inset-0 z-0 opacity-85 transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                              {/* Soft gradient mask */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70"></div>
                              
                              {/* Dynamic symbol ticker overlay */}
                              <div className="relative z-20 p-4 flex justify-between items-end">
                                <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20">
                                  <div className="text-[10px] font-bold text-white/60 tracking-wider">SYMBOL</div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="font-mono text-sm font-bold">{idea.symbol}</span>
                                    <span
                                      className={`text-xs font-bold ${
                                        idea.isBullish ? "text-[#089981]" : "text-[#f23645]"
                                      }`}
                                    >
                                      {idea.changePercent}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <span className="bg-black/50 backdrop-blur text-[10px] text-white/80 py-1.5 px-3 rounded-lg border border-white/5 uppercase tracking-wide font-bold">
                                    {idea.symbolName}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Interactive Targets & Trade setup detailed drawer */}
                          <div className="grid grid-cols-3 gap-2 bg-black/10 p-3 rounded-2xl border border-white/5 text-center text-xs">
                            <div className="space-y-0.5">
                              <p className="text-[10px] text-white/40 uppercase font-semibold">エントリー推奨</p>
                              <p className="font-bold text-[#e1e1ee] font-mono">{idea.entryPrice || "市場価格"}</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[10px] text-white/40 uppercase font-semibold text-emerald-400">ターゲット（利確）</p>
                              <p className="font-bold text-emerald-400 font-mono">{idea.targetPrice || "未設定"}</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[10px] text-white/40 uppercase font-semibold text-rose-400">ロスカット（損切）</p>
                              <p className="font-bold text-rose-400 font-mono">{idea.stopLoss || "未設定"}</p>
                            </div>
                          </div>

                          {/* HOTLINK INTERACTIVE DISPLAY (Japanese request emphasis) */}
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Code size={14} className="text-purple-300" />
                                <span className="text-xs font-bold text-purple-200">
                                  HTML埋め込み用ホットリンクコード
                                </span>
                              </div>
                              <span className="px-1.5 py-0.5 bg-emerald-400/20 text-emerald-300 text-[9px] font-bold rounded">
                                CORS認証済み / 常時利用可能
                              </span>
                            </div>
                            <p className="text-[10px] text-white/50 leading-relaxed">
                              このリアルタイムチャート画像は、ご自身のブログやブログパーツ、Markdownにホットリンクして直接貼ることができます。
                            </p>
                            <div className="flex gap-2 items-center">
                              <div className="flex-1 bg-black/40 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-cyan-300 select-all overflow-x-auto truncate">
                                {`&lt;img src="${idea.chartUrl}" alt="${idea.symbol} Chart" /&gt;`}
                              </div>
                              <button
                                onClick={() => handleCopyHotlink(idea.chartUrl || "", idea.id)}
                                className="bg-[#1e222d] hover:bg-white/10 text-white/80 hover:text-white border border-white/10 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                              >
                                {copiedCodeId === idea.id ? (
                                  <>
                                    <Check size={14} className="text-emerald-400" />
                                    <span className="text-emerald-400">コピー完了</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={14} />
                                    <span>HTMLをコピー</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Footer panel with likes/comments, expansion toggle */}
                          <div className="flex justify-between items-center pt-2 border-t border-white/10">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => handleLike(idea.id)}
                                className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer py-1 px-2 rounded-lg ${
                                  idea.hasLiked
                                    ? "text-pink-400 bg-pink-400/10"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                              >
                                <ThumbsUp size={15} />
                                <span>{idea.likes}</span>
                              </button>

                              <button className="flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white py-1 px-2 rounded-lg hover:bg-white/5 cursor-pointer">
                                <MessageCircle size={15} />
                                <span>{idea.comments}</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              {idea.chartDescription && (
                                <span className="text-[10px] text-white/40 font-mono italic">
                                  {idea.chartDescription}
                                </span>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: INDICATORS DIRECTORY */}
            {activeTab === "indicators" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredIndicators.map((ind) => (
                    <div
                      key={ind.id}
                      className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-3xl p-5 hover:bg-white/15 transition-all flex flex-col justify-between group overflow-hidden"
                    >
                      <div className="space-y-4">
                        {/* Title and Badge */}
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[9px] font-bold rounded uppercase tracking-wider border border-purple-500/20">
                              {ind.type}
                            </span>
                            <h3 className="font-bold text-base lg:text-lg text-white mt-1 group-hover:text-pink-300 transition-colors">
                              {ind.name}
                            </h3>
                          </div>
                          <div className="bg-[#089981]/20 text-[#089981] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            <span>🚀</span>
                            <span>{ind.boosts}</span>
                          </div>
                        </div>

                        {/* Chart Preview (hotlinked with beautiful glass container) */}
                        {ind.chartUrl && (
                          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/30">
                            <img
                              src={ind.chartUrl}
                              alt={ind.name}
                              className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                          {ind.description}
                        </p>

                        {/* Author line */}
                        <div className="flex justify-between items-center text-[10px] text-white/50 border-t border-white/10 pt-3">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                            By {ind.author} ({ind.authorType})
                          </span>
                          <span>Views: {ind.views}</span>
                        </div>
                      </div>

                      {/* Action trigger button */}
                      <div className="mt-5 pt-3 border-t border-white/5 flex gap-2">
                        <button
                          onClick={() => setSelectedIndicator(ind)}
                          className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:brightness-110 text-[#f7f5ff] font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
                        >
                          <Cpu size={14} />
                          <span>AIロジックとPine Scriptを生成</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: ANALYST CHAT */}
            {activeTab === "chat" && (
              <div className="max-w-4xl mx-auto">
                <AnalystChat />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* FOOTER BAR */}
      <footer className="bg-black/30 backdrop-blur-md py-4 text-center text-xs text-white/40 border-t border-white/10 relative z-10 shrink-0">
        <p>© 2026 TradingInsights AI Quant Laboratories. All Rights Reserved.</p>
        <p className="mt-1 text-[10px]">
          免責事項: 提供される分析は教育目的のGemini AIシミュレーションであり、投資助言ではありません。
        </p>
      </footer>

      {/* MODALS GATEWAY */}
      <AnimatePresence>
        {selectedIndicator && (
          <IndicatorModal
            indicator={selectedIndicator}
            onClose={() => setSelectedIndicator(null)}
          />
        )}
        {isNewIdeaModalOpen && (
          <NewIdeaFormModal
            onClose={() => setIsNewIdeaModalOpen(false)}
            onAddIdea={(newIdea) => {
              setIdeas((prev) => [newIdea, ...prev]);
              setIsNewIdeaModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
