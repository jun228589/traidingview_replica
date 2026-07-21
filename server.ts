import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI lazily
let aiClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes
app.post("/api/analyze-symbol", async (req, res) => {
  try {
    const { symbol, direction, context } = req.body;
    const ai = getGenAI();
    const prompt = `あなたは一流のグローバル金融マーケットアナリストです。
以下の情報に基づいて、詳細なテクニカル分析と取引アイデアの要約を日本語で作成してください。

シンボル: ${symbol}
方向性: ${direction} (LONG/SHORT/NEUTRAL)
追加コンテキスト: ${context || "特になし"}

分析は以下の構成にしてください：
1. 【概要 & センチメント】 (150文字程度)
2. 【テクニカル指標の分析】 (サポート、レジスタンス、トレンド、ボリュームなどについて論じる)
3. 【具体的な取引プラン】 (エントリー価格、目標価格、損切り価格の推奨)
4. 【リスク要因】

プロフェッショナルで、TradingViewのトップアナリストが書くような、読みやすく洗練されたマークダウン形式で回答してください。`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ report: response.text });
  } catch (error: any) {
    console.error("Analyze error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze symbol" });
  }
});

app.post("/api/chat-analyst", async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGenAI();

    const formattedHistory = (history || []).map((h: any) => `${h.role === "user" ? "User" : "Analyst"}: ${h.content}`).join("\n");
    const systemInstruction = `あなたはTradingInsightsの公認AIチーフアナリスト「ジェイデン」です。
ユーザーはトレーダー、投資家、テクニカルアナリスト達です。
最新の市場トレンド、テクニカル分析、インジケーター（Pine Script含む）、資金管理、取引メンタルについて、非常にプロフェッショナルかつフレンドリーで知的なトーンで日本語で回答してください。
回答にはマークダウン（太字、リスト、必要に応じて数式等）を効果的に使用してください。
投資助言の免責事項を過度に毎回繰り返すのではなく、アドバイスの最後に「※これは教育的な分析であり、実際の投資判断は自己責任で行ってください。」とシンプルに添える程度にしてください。`;

    const prompt = formattedHistory 
      ? `${formattedHistory}\nUser: ${message}\nAnalyst:` 
      : `User: ${message}\nAnalyst:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message || "Failed to talk to analyst" });
  }
});

app.post("/api/explain-indicator", async (req, res) => {
  try {
    const { name } = req.body;
    const ai = getGenAI();
    const prompt = `あなたは高度なテクニカルインジケーターと定量分析（クオンツ）の専門家です。
「${name}」という名前のテクニカルインジケーターについて、詳細かつ数学的な仕組みとトレードでの活用方法を日本語で解説してください。

解説には以下の項目を含めてください：
1. 【インジケーターの基本コンセプト】(何を表すのか、どうして有効なのか)
2. 【計算式・ロジック】(数学的な背景や、どのように計算されるか。数式がある場合はマークダウンの数式表記を使用)
3. 【具体的な取引戦略】(どのようなシグナルで売買するか、ロング/ショートの条件)
4. 【Pine Script (v5) の簡単なコンセプト/疑似コード】(どのような実装になるか、コードブロックで提示)

TradingViewのインジケーターマニュアルにあるような、極めて詳細かつ読みやすい構成で回答してください。`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ explanation: response.text });
  } catch (error: any) {
    console.error("Indicator explanation error:", error);
    res.status(500).json({ error: error.message || "Failed to explain indicator" });
  }
});

app.post("/api/generate-idea", async (req, res) => {
  try {
    const { category } = req.body;
    const ai = getGenAI();
    const prompt = `あなたはTradingViewで大人気のトップトレーダーです。
${category || "ランダムな市場（株式、暗号資産、FX、コモディティから選択）"}について、極めて具体的で説得力のある架空の新規「投資アイデア（トレード案）」を1件、日本語で自動生成してください。

返される形式は必ず以下の構造を持つJSONにしてください（マークダウンの \`\`\`json などの囲みはつけずに、純粋なJSONオブジェクト単体として出力してください）：
{
  "author": "AI_Trader_Elite",
  "avatarId": "custom",
  "symbol": "（例: NASDAQ:AAPL, BINANCE:BTCUSDT, OANDA:USDJPY, COMEX:GC1!）",
  "symbolName": "（例: Apple Inc., Bitcoin / U.S. Dollar, USD/JPY, Gold）",
  "changePercent": "（例: +2.15%, -1.45% などのリアルな数字）",
  "isBullish": true,
  "direction": "LONG",
  "title": "（例: BTC - ハーフウェイ・リトレースメントからの第5波上昇を狙う！）",
  "timeAgo": "たった今",
  "summary": "（テクニカル的な説明、なぜそのポジションを取るのかの概要、200文字程度）",
  "chartDescription": "（どのようなテクニカルパターンが形成されているかを視覚的に説明する文章、150文字程度）",
  "targetPrice": "（目標価格）",
  "stopLoss": "（ストップロス価格）",
  "entryPrice": "（エントリー推奨価格）"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    const ideaData = JSON.parse(responseText.trim());
    res.json(ideaData);
  } catch (error: any) {
    console.error("Generate idea error:", error);
    res.status(500).json({ error: error.message || "Failed to generate idea" });
  }
});

// Vite Middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
