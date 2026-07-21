import React, { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { X, Sparkles, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { TradeIdea } from "../types";

interface NewIdeaFormModalProps {
  onClose: () => void;
  onAddIdea: (idea: TradeIdea) => void;
}

export default function NewIdeaFormModal({ onClose, onAddIdea }: NewIdeaFormModalProps) {
  const [symbol, setSymbol] = useState("NASDAQ:AAPL");
  const [symbolName, setSymbolName] = useState("Apple Inc.");
  const [title, setTitle] = useState("");
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [summary, setSummary] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [chartDescription, setChartDescription] = useState("");

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiError, setAiError] = useState("");

  const handleAiAutoGenerate = async () => {
    setIsAiGenerating(true);
    setAiError("");
    try {
      // Prompt server to generate complete idea structure
      const marketCategories = ["Stocks", "Crypto", "Forex"];
      const randomCategory = marketCategories[Math.floor(Math.random() * marketCategories.length)];
      
      const res = await fetch("/api/generate-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: randomCategory })
      });

      if (!res.ok) {
        throw new Error("AIアイデア自動生成に失敗しました。");
      }

      const data = await res.json();

      setSymbol(data.symbol || "BINANCE:BTCUSDT");
      setSymbolName(data.symbolName || "Bitcoin / U.S. Dollar");
      setTitle(data.title || "");
      setDirection(data.direction === "SHORT" ? "SHORT" : "LONG");
      setSummary(data.summary || "");
      setEntryPrice(data.entryPrice || "");
      setTargetPrice(data.targetPrice || "");
      setStopLoss(data.stopLoss || "");
      setChartDescription(data.chartDescription || "ダブルボトム形成からのブレイクアウトパターンの可視化");
    } catch (err: any) {
      setAiError(err.message || "Failed to generate AI idea.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const newIdea: TradeIdea = {
      id: "user-idea-" + Math.random().toString(),
      author: "マイ・トレーダー・アカウント",
      symbol,
      symbolName,
      changePercent: "+0.00%",
      isBullish: direction === "LONG",
      direction,
      timeAgo: "たった今",
      title,
      summary,
      // For user submitted, we can use a beautiful background mock chart
      chartUrl: direction === "LONG"
        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuAwSnvnDl1lDmMQWFuxNDNt_JEzAuFtev2TmQkzZRsWlrLxBecd59iaBAvi4hFxs9CA_sB8FMb4mYSPnTK67u-_MnOWFFI8_fF3roD5gWxjbcDrFJYyr3tbz5Iuts74oLkfEnYi3Ynfuvojen4ylHWgpJ1kvfDQkqg7KXBd67B5Fz6oDukMKzXJ8BQbf6qbanYVOJHssqe3qlZ7Qf_rhddWOKx3TYKPbAP58zKQXlV770dwOoYN-lJ_"
        : "https://lh3.googleusercontent.com/aida-public/AB6AXuDeUSXIx_ojG1ldAjf2utu9N0fm-ivuTH2RPlpXfiQLgLyIE88TfGDNRIyVZB_LN0ZdoDhVyer0nCEFxLt57fIg8KaZB3q_UGGCv4Fdn2SlWaLn1nRw9ZyjYtNkxhJECcd6BOugTItWYU1_WMF3a3ymepanY3Tc_cPv3lMYrtEJYb_PySxaBY6BM7bZxUWwcboshZD4gYJhTM3v0dfIu_ZVzqmZTgsDPb0ZPMwi8vtc_glkSFJ5b37M",
      chartDescription: chartDescription || "ユーザー投稿チャートパターン",
      likes: 1,
      comments: 0,
      hasLiked: false,
      entryPrice,
      targetPrice,
      stopLoss
    };

    onAddIdea(newIdea);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#1c1f2b] border border-[#2a2e39] w-full max-w-2xl max-h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 bg-[#1e222d] border-b border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#e1e1ee] text-base">新規投資アイデアの投稿</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#b2b5be] hover:text-[#e1e1ee] hover:bg-[#2a2e39] p-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* AI Assist Action Card */}
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-primary flex items-center gap-1.5">
                <Sparkles size={16} className="animate-pulse" />
                AIマジック自動生成
              </h4>
              <p className="text-xs text-[#b2b5be]">
                Gemini AIが一瞬でプロレベルの投資判断、チャートパターン、取引価格を完全生成。
              </p>
            </div>
            <button
              type="button"
              onClick={handleAiAutoGenerate}
              disabled={isAiGenerating}
              className="bg-primary hover:brightness-110 text-[#f7f5ff] text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
            >
              {isAiGenerating ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>生成中...</span>
                </>
              ) : (
                <>
                  <span>AIで自動入力</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>

          {aiError && (
            <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertCircle size={14} />
              <span>{aiError}</span>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-[#b2b5be] font-bold">銘柄コード・シンボル</label>
              <input
                type="text"
                required
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="例: BINANCE:BTCUSDT"
                className="w-full bg-[#11131c] border border-[#2a2e39] focus:border-primary text-[#e1e1ee] text-xs rounded-xl p-3 outline-none transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[#b2b5be] font-bold">銘柄名</label>
              <input
                type="text"
                required
                value={symbolName}
                onChange={(e) => setSymbolName(e.target.value)}
                placeholder="例: Bitcoin / US Dollar"
                className="w-full bg-[#11131c] border border-[#2a2e39] focus:border-primary text-[#e1e1ee] text-xs rounded-xl p-3 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-[#b2b5be] font-bold">ポジション方向</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDirection("LONG")}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    direction === "LONG"
                      ? "bg-[#089981]/20 border-[#089981] text-[#089981]"
                      : "bg-[#11131c] border-[#2a2e39] text-[#b2b5be]"
                  }`}
                >
                  LONG (買い)
                </button>
                <button
                  type="button"
                  onClick={() => setDirection("SHORT")}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    direction === "SHORT"
                      ? "bg-[#f23645]/20 border-[#f23645] text-[#f23645]"
                      : "bg-[#11131c] border-[#2a2e39] text-[#b2b5be]"
                  }`}
                >
                  SHORT (売り)
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[#b2b5be] font-bold">エントリー価格（目安）</label>
              <input
                type="text"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                placeholder="例: $64,300"
                className="w-full bg-[#11131c] border border-[#2a2e39] focus:border-primary text-[#e1e1ee] text-xs rounded-xl p-3 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#b2b5be] font-bold">アイデアのタイトル</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: BTCUSD の急落後の反発を狙うEMA50タッチ戦略"
              className="w-full bg-[#11131c] border border-[#2a2e39] focus:border-primary text-[#e1e1ee] text-xs rounded-xl p-3 outline-none transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#b2b5be] font-bold">テクニカル分析詳細・根拠</label>
            <textarea
              required
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="なぜこの予測を立てたのか、サポート/レジスタンスライン、オシレーター系の状態などを記入してください..."
              className="w-full bg-[#11131c] border border-[#2a2e39] focus:border-primary text-[#e1e1ee] text-xs rounded-xl p-3 outline-none transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-[#b2b5be] font-bold">ターゲット利確価格</label>
              <input
                type="text"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="例: $68,000"
                className="w-full bg-[#11131c] border border-[#2a2e39] focus:border-primary text-[#e1e1ee] text-xs rounded-xl p-3 outline-none transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[#b2b5be] font-bold">損切りロスカット価格</label>
              <input
                type="text"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="例: $62,500"
                className="w-full bg-[#11131c] border border-[#2a2e39] focus:border-primary text-[#e1e1ee] text-xs rounded-xl p-3 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#b2b5be] font-bold">チャートパターンの説明</label>
            <input
              type="text"
              value={chartDescription}
              onChange={(e) => setChartDescription(e.target.value)}
              placeholder="例: ボリンジャーバンドスクイーズ、MACDダイバージェンス検出"
              className="w-full bg-[#11131c] border border-[#2a2e39] focus:border-primary text-[#e1e1ee] text-xs rounded-xl p-3 outline-none transition-colors"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#2a2e39] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#11131c] hover:bg-[#2a2e39] text-[#b2b5be] hover:text-[#e1e1ee] border border-[#2a2e39] font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer text-xs"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-primary hover:brightness-110 text-[#f7f5ff] font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer text-xs"
            >
              アイデアを投稿する
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
