import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Sparkles, MessageSquare, ArrowRight, Loader2 } from "lucide-react";
import { ChatMessage } from "../types";

// Simple custom Markdown to HTML renderer for clean presentation without extra packages
function renderMarkdown(text: string) {
  if (!text) return "";
  
  // Escape HTML
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Bullet points
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, "<li class='ml-4 list-disc text-sm my-1'>$1</li>");
  
  // Wrap li groups in ul (approximate)
  html = html.replace(/(<li.*<\/li>)/gs, "<ul class='my-2'>$1</ul>");

  // Headings ### or ## or #
  html = html.replace(/^\s*###\s+(.*)$/gm, "<h4 class='text-md font-bold text-[#e1e1ee] mt-3 mb-1'>$1</h4>");
  html = html.replace(/^\s*##\s+(.*)$/gm, "<h3 class='text-lg font-bold text-primary mt-4 mb-2'>$1</h3>");
  html = html.replace(/^\s*#\s+(.*)$/gm, "<h2 class='text-xl font-bold text-[#b6c4ff] mt-4 mb-2'>$1</h2>");

  // Code blocks ```code```
  html = html.replace(/```(.*?)\n(.*?)```/gs, "<pre class='bg-[#0c0e16] p-3 rounded font-mono text-xs my-2 border border-[#2a2e39] overflow-x-auto text-[#dfe2f2]'>$2</pre>");
  
  // Inline code `code`
  html = html.replace(/`(.*?)`/g, "<code class='bg-[#0c0e16] px-1 py-0.5 rounded font-mono text-xs text-primary'>$1</code>");

  // Line breaks
  html = html.replace(/\n/g, "<br />");

  return <div className="space-y-1 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
}

const SAMPLE_QUESTIONS = [
  "RKLB株のテクニカル分析と見通しは？",
  "RSIとMACDを併用したトレード手法を解説して",
  "移動平均線がゴールデンクロスした際のPine Scriptを書いて",
  "資金管理で最も重要な『2%ルール』とは何ですか？"
];

export default function AnalystChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "analyst",
      content: `こんにちは！TradingInsightsのチーフアナリスト、**ジェイデン**です。
市場トレンド、特定の銘柄のテクニカル分析、インディケーターの算出ロジック、あるいはTradingViewで使用する**Pine Script(v5)**のコード作成まで、何でも気軽にご質問ください。`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Reconstruct simple history
      const historyContext = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat-analyst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history: historyContext })
      });

      if (!response.ok) {
        throw new Error("アナリストが応答に失敗しました。");
      }

      const data = await response.json();

      const analystMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "analyst",
        content: data.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, analystMsg]);
    } catch (error: any) {
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "analyst",
          content: `申し訳ありません。テクニカルエラーが発生しました: **${error.message}**。少し時間をおいてから再度お試しください。`,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-[#1c1f2b] border border-[#2a2e39] rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-[#1e222d] border-b border-[#2a2e39] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-[#e1e1ee] text-sm flex items-center gap-1.5">
              AIチーフアナリスト「ジェイデン」
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#089981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#089981]"></span>
              </span>
            </h3>
            <p className="text-xs text-[#b2b5be]">Technical Analysis &amp; Pine Script Specialist</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded-full">
          <Sparkles size={12} />
          Gemini 3.5 Flash Powered
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#11131c]/50 scrollbar-thin">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 max-w-[85%] ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.role === "user"
                    ? "bg-primary/20 border-primary/30 text-primary"
                    : "bg-[#1e222d] border-[#2a2e39] text-[#e1e1ee]"
                }`}
              >
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="space-y-1">
                <div
                  className={`p-3.5 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-primary text-[#f7f5ff] rounded-tr-none"
                      : "bg-[#1e222d] text-[#e1e1ee] border border-[#2a2e39] rounded-tl-none"
                  }`}
                >
                  {renderMarkdown(msg.content)}
                </div>
                <div
                  className={`text-[10px] text-[#b2b5be] px-1 ${
                    msg.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 mr-auto"
          >
            <div className="w-8 h-8 rounded-full bg-[#1e222d] border border-[#2a2e39] flex items-center justify-center text-[#e1e1ee] shrink-0">
              <Bot size={16} />
            </div>
            <div className="p-4 bg-[#1e222d] rounded-2xl rounded-tl-none border border-[#2a2e39] text-[#b2b5be] flex items-center gap-2 text-sm shadow-md">
              <Loader2 className="animate-spin text-primary" size={16} />
              ジェイデンが思考中...
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="p-3 bg-[#1e222d]/60 border-t border-[#2a2e39] flex flex-wrap gap-2">
          <p className="text-xs text-[#b2b5be] w-full mb-1 flex items-center gap-1 font-semibold">
            <MessageSquare size={12} className="text-primary" />
            おすすめの質問:
          </p>
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs bg-[#11131c] hover:bg-primary/20 text-[#e1e1ee] hover:text-[#f7f5ff] hover:border-primary/50 py-1.5 px-3 rounded-full border border-[#2a2e39] transition-all duration-200 text-left flex items-center gap-1 cursor-pointer"
            >
              <span>{q}</span>
              <ArrowRight size={10} className="opacity-60" />
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 bg-[#1e222d] border-t border-[#2a2e39] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
          placeholder="市場トレンドやPine Scriptについて質問..."
          disabled={isLoading}
          className="flex-1 bg-[#11131c] border border-[#2a2e39] focus:border-primary text-sm text-[#e1e1ee] rounded-xl px-4 py-3 outline-none transition-colors placeholder-[#b2b5be]/60"
        />
        <button
          onClick={() => handleSendMessage(input)}
          disabled={!input.trim() || isLoading}
          className="bg-primary hover:brightness-110 disabled:bg-[#2a2e39] disabled:text-[#b2b5be]/40 text-[#f7f5ff] font-bold p-3 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
