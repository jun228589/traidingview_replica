import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Bot, Sparkles, AlertCircle, Copy, Check, Loader2 } from "lucide-react";
import { TechnicalIndicator } from "../types";

interface IndicatorModalProps {
  indicator: TechnicalIndicator;
  onClose: () => void;
}

// Simple Markdown to HTML parser for Indicator Explanation
function renderMarkdown(text: string) {
  if (!text) return "";
  
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong class='text-primary'>$1</strong>");

  // Bullet points
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, "<li class='ml-6 list-disc text-sm my-1 text-[#e1e1ee]'>$1</li>");
  
  // Wrap li groups in ul (approximate)
  html = html.replace(/(<li.*<\/li>)/gs, "<ul class='my-2'>$1</ul>");

  // Headings ### or ## or #
  html = html.replace(/^\s*###\s+(.*)$/gm, "<h4 class='text-md font-bold text-[#e1e1ee] mt-4 mb-2 border-b border-[#2a2e39] pb-1'>$1</h4>");
  html = html.replace(/^\s*##\s+(.*)$/gm, "<h3 class='text-lg font-bold text-primary mt-6 mb-3 border-l-4 border-primary pl-3'>$1</h3>");
  html = html.replace(/^\s*#\s+(.*)$/gm, "<h2 class='text-xl font-bold text-[#b6c4ff] mt-6 mb-4'>$1</h2>");

  // Code blocks ```code```
  html = html.replace(/```(.*?)\n(.*?)```/gs, "<pre class='bg-[#0c0e16] p-4 rounded font-mono text-xs my-3 border border-[#2a2e39] overflow-x-auto text-[#dfe2f2] relative group-code'><code class='block'>$2</code></pre>");
  
  // Inline code `code`
  html = html.replace(/`(.*?)`/g, "<code class='bg-[#0c0e16] px-1.5 py-0.5 rounded font-mono text-xs text-primary'>$1</code>");

  // Line breaks
  html = html.replace(/\n/g, "<br />");

  return <div className="space-y-2 text-sm text-[#b2b5be] leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function IndicatorModal({ indicator, onClose }: IndicatorModalProps) {
  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    async function fetchExplanation() {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch("/api/explain-indicator", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: indicator.name })
        });
        if (!res.ok) {
          throw new Error("AIインジケーター解説の取得に失敗しました。");
        }
        const data = await res.json();
        setExplanation(data.explanation);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchExplanation();
  }, [indicator]);

  const handleCopyCode = () => {
    // Try to extract Pine Script from explanation and copy to clipboard
    const match = explanation.match(/```(?:pinescript|pine)?\n([\s\S]*?)```/);
    const codeToCopy = match ? match[1] : explanation;
    
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#1c1f2b] border border-[#2a2e39] w-full max-w-4xl max-h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 bg-[#1e222d] border-b border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="font-bold text-[#e1e1ee] text-base">{indicator.name}</h3>
              <p className="text-xs text-[#b2b5be]">AIによるクオンツ・数式ロジック深掘り解説</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#b2b5be] hover:text-[#e1e1ee] hover:bg-[#2a2e39] p-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Base Info Block */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#11131c] rounded-xl border border-[#2a2e39]">
            <div className="space-y-1">
              <p className="text-[10px] text-[#b2b5be] uppercase tracking-wider font-semibold">作成者</p>
              <p className="text-sm font-bold text-[#e1e1ee]">{indicator.author}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-[#b2b5be] uppercase tracking-wider font-semibold">ライブラリ種類</p>
              <p className="text-sm font-bold text-primary">{indicator.type}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-[#b2b5be] uppercase tracking-wider font-semibold">閲覧数</p>
              <p className="text-sm font-bold text-[#e1e1ee] font-mono">{indicator.views}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-[#b2b5be] uppercase tracking-wider font-semibold">ブースト評価数</p>
              <p className="text-sm font-bold text-[#089981] font-mono">🚀 {indicator.boosts}</p>
            </div>
          </div>

          {/* AI Response Block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#e1e1ee]">
              <Sparkles className="text-primary animate-pulse" size={16} />
              <span>AIアナリスト解説レポート</span>
            </div>

            {isLoading ? (
              <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
                <Loader2 className="animate-spin text-primary" size={36} />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[#e1e1ee]">インディケーターの全アルゴリズムと数式を解析中...</p>
                  <p className="text-xs text-[#b2b5be]">数秒でプロフェッショナルな解説とPine Scriptが生成されます</p>
                </div>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl text-red-200 text-sm flex items-start gap-3">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">解説をロードできませんでした</p>
                  <p className="text-xs text-red-300/80 mt-1">{error}</p>
                </div>
              </div>
            ) : (
              <div className="bg-[#11131c]/30 p-5 rounded-xl border border-[#2a2e39] relative">
                {/* Float Copy Button */}
                <button
                  onClick={handleCopyCode}
                  className="absolute top-4 right-4 bg-[#1e222d] hover:bg-[#2a2e39] text-[#b2b5be] hover:text-[#e1e1ee] border border-[#2a2e39] py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md z-10"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-[#089981]" />
                      <span className="text-[#089981]">コピー完了</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>コードをコピー</span>
                    </>
                  )}
                </button>

                {renderMarkdown(explanation)}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1e222d] border-t border-[#2a2e39] flex justify-between items-center text-xs text-[#b2b5be]">
          <span>※ この解説はGemini AIモデルによる高度なテクニカル分析に基づいています。</span>
          <button
            onClick={onClose}
            className="bg-primary hover:brightness-110 text-[#f7f5ff] font-bold px-4 py-2 rounded-lg transition-all cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </motion.div>
    </div>
  );
}
