import { TradeIdea, TechnicalIndicator, MarketMovers } from "./types";

export const INITIAL_IDEAS: TradeIdea[] = [
  {
    id: "idea-rklb",
    author: "Rayannsr",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-1KjywxGQfq4QALA4QWi8YKK3YySd_7Nxg3M7BfDp4zCegeLrq8J2-J2BwSYkGgN94CjeJRnYpY2SKdb_AAyL5xTH86u6sD4vj9OoDyRajj4j-0SkGp-TqB9FOmTyB-04Ad679uDMwtr8SP74d62lNxAk-p_s2YhkaFe73gfojMskcsiBc5qtnWrvPl3X90-wT2L0xkejYwHBqxZMIkpoAa4M1sHMLQR-VL4xblNVm8nyCsN7ibOS",
    symbol: "NASDAQ:RKLB",
    symbolName: "Rocket Lab USA, Inc.",
    changePercent: "+4.28%",
    isBullish: true,
    direction: "LONG",
    timeAgo: "14分前",
    title: "RKLB - トレンドフォローの絶好の機会が到来！",
    summary: "Rocket Labは宇宙技術のリーディングカンパニーです。テクニカルな観点から、主要なディマンドゾーン（需要帯）が強固に維持されていることが確認できます。上昇トレンドチャネルの下限での反発、および出来高の増加を伴うブレイクアウトの兆候が見られ、ここからの力強い上昇が期待されます。直近の移動平均線(EMA50/200)もゴールデンクロスに近づいています。",
    chartUrl: "https://lh3.googleusercontent.com/aida/AP1WRLufGesChjMdnR9-pl5uGC00KVw5pwstVvUeiccp-6_lcMTnqDuX-HaYtkCpcxlCKQSjDRcIwdbI7z812ReS1nl-KhNW42E2-jcpYiFnOf9dqgxzTouISM5MHhlrriRfoiwWOn3iBx4u3SmP10tIaX0sPZxkME-P3PsPyxqVX_raeGTByAEEapaq_v0jM-qUK33yvb5RqcJdGkxI0sYNGC-o_7qx1OstyiQKOTTdqfJVhVmyGUoFau9JOpo",
    likes: 1200,
    comments: 42,
    hasLiked: false,
    entryPrice: "$6.50",
    targetPrice: "$9.20",
    stopLoss: "$5.80"
  },
  {
    id: "idea-aapl",
    author: "Torik2x",
    symbol: "NASDAQ:AAPL",
    symbolName: "Apple Inc.",
    changePercent: "-0.12%",
    isBullish: true,
    direction: "LONG",
    timeAgo: "1時間前",
    title: "Apple - 次のブレイクアウトへの準備は完了か？",
    summary: "Apple (NASDAQ:AAPL) は市場で最も強固な大型株の一つであり続けています。現在、4時間足チャートにおいて、レジスタンスラインの直下で三角保ち合い（コンソリデーション）を形成中。RSIもニュートラルから徐々に上昇しており、出来高を伴う上放れが起きれば、過去最高値を更新する大きなラリーへと発展する可能性が極めて高いです。Bitget rToken等による流動性の高まりも追い風です。",
    chartUrl: "https://lh3.googleusercontent.com/aida/AP1WRLsdzl37iqGpu38tmx_1LF1ekgXNoo8kM61H0WthWLxEm5R6f7R7166Zw3HYtZYzZLRfxoyUaw1YZR3mvagIou1HiYzlcbsBTSbopuT2NKIXY78oee6INYdhsMyWtXsCtOn0Ya3vS1ybjGQCdVdSzJPY25n-yVpDxM3eTRPcTUVoE6htfyOKzh2WvQYbx2vKp7Wvr4P64_QDcbz2wpqGyQ4NGTfRFJB93rfsAW7iFgDghv2_LvLL3RWJ1mM",
    likes: 856,
    comments: 18,
    hasLiked: false,
    entryPrice: "$182.30",
    targetPrice: "$210.00",
    stopLoss: "$174.50"
  },
  {
    id: "idea-btc",
    author: "Xanrox",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO8dnufeBz-thq2SU-Cyc2IrQq3XdB6B8czG2YWNbXyQ6McHeXeD0kEEIkJFSJhxkP_CgFKAvu6Pdo7aYiqNQA180F_tWWdO2yjFJki-aQmEawl8jW3doScuWaTYy7e0GFgjMIcJIjHNGMwl2y4X5LHltxWE5uxiYFFMuCVG14Sks6indD85GNHheJTvCyVDBh0dg4xvPjvRbLoQ5ZDK27T-ZnWLjmzkvtM74amG-jG6hEIzHplsfv",
    symbol: "BINANCE:BTCUSDT",
    symbolName: "Bitcoin / TetherUS",
    changePercent: "-2.41%",
    isBullish: false,
    direction: "SHORT",
    timeAgo: "2時間前",
    title: "Bitcoin - さらなる大暴落の兆し！ 近く56kサポートへ",
    summary: "ビットコインはまもなく本格的な降伏フェーズ（キャピチュレーション）に入るでしょう。現在、先物市場でビットコインを売る、またはショートポジションを構築するのに非常に良い局面です。価格は平行下降チャネルの天井（レジスタンス）に達し、MACDもデッドクロスを形成しました。5万6000ドル付近の強力な水平サポート帯に向けての下落余地が広がっています。",
    chartUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTD3_b6t3PO98qyVIKLnOuQ4WIp7-zUVbR-d_Ym3i0kA9J4ZEVqp9hbYMR-lEI6THz1PZ39IpTND2NLxZVCkLxqQjCZ6fSe5UJOQxtFR2R0Bz8hvx1TxAv37sohclu6E-4ADYUdzPxwLbGcJg8gvrwG-TLSxmepRzzFFbonaqIq8_tDGxqPP7l5UkpRCapHGu97BDcsy2VwaAQTWtv2cmtMzzMNfuADhHyPBMvJYm_p4rMWm0HU1De",
    likes: 2400,
    comments: 128,
    hasLiked: false,
    entryPrice: "$64,300",
    targetPrice: "$56,000",
    stopLoss: "$67,200"
  },
  {
    id: "idea-spcx",
    author: "Ellacutie",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGtzJKbhyMv-xx1XbaGhmZ9j-mKjTefwz9JcgBLA9tVhFTR-7Eda-Dh0G1wFx66XGHQraw87P-lLz_m6OcHzSjcsZN4UN1qSjX3vTsULHDqu-3c1w3fWz0S6lpjXnrSjGvaklUuEGORVfO0pODAzxNi79PwkVb8TlNY7ZU9Eks5jlKtumNrr7BsfcPqXO7w3U_tWBlWesWMiBKcFZuaibjDmDdxZlWnfYAuhJHI-TOceBeXalzx8ki",
    symbol: "CBOE:SPCX",
    symbolName: "S&P 500 Index Options",
    changePercent: "-3.41%",
    isBullish: false,
    direction: "SHORT",
    timeAgo: "4時間前",
    title: "次の $SPCX の動きは、極めて巨大なものになる可能性",
    summary: "SPCX（S&P 500 インデックスオプション）の4時間足チャートにおいて、インプライド・ボラティリティが歴史的な低水準まで低下しています。しかし、ボリンジャーバンドは急激にスクイーズ（収縮）しており、これは嵐の前の静けさを意味します。ベアリッシュな価格リジェクションゾーン（価格拒絶帯）がレジスタンスで強く意識されており、ここから下方向への爆発的なブレイクアウトが引き起こされる公算が非常に大きいです。",
    chartUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeUSXIx_ojG1ldAjf2utu9N0fm-ivuTH2RPlpXfiQLgLyIE88TfGDNRIyVZB_LN0ZdoDhVyer0nCEFxLt57fIg8KaZB3q_UGGCv4Fdn2SlWaLn1nRw9ZyjYtNkxhJECcd6BOugTItWYU1_WMF3a3ymepanY3Tc_cPv3lMYrtEJYb_PySxaBY6BM7bZxUWwcboshZD4gYJhTM3v0dfIu_ZVzqmZTgsDPb0ZPMwi8vtc_glkSFJ5b37M",
    likes: 912,
    comments: 31,
    hasLiked: false,
    entryPrice: "$1,988",
    targetPrice: "$1,610",
    stopLoss: "$2,141"
  }
];

export const INITIAL_INDICATORS: TechnicalIndicator[] = [
  {
    id: "ind-intrabar",
    name: "Intrabar Profile [Kioseff Trading]",
    author: "KioseffTrading",
    authorType: "PRO TRADER",
    type: "インジケーター",
    views: "12,402",
    boosts: "438",
    version: "v3.1.2",
    description: "Intrabar Profileは、個々のローソク足内に詳細な出来高プロファイルまたはデルタ（売り買いの差）プロファイルを描画するように設計された下位時間軸分析ツールです。単にローソク足の始値、終値、ヒゲ、色の変化を見るだけでなく、価格帯ごとの正確な市場参加レベルや、注文流動性の偏りをヒストグラムとして可視化し、真の需給バランスを丸裸にします。",
    chartUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKjZsSC0Id7Z4aUSr7SMOsHRppUmbow8FjGOM9saC4aSyE1ztunKDqMXKuQofYmMv4IWytAdaqvcqhj41EVM1HMkb-PB5KAzCAkI3_4wguFKA_o1b0v-UWzl6XlDlSIQxIISHSDD4i1cSMdKtj0-SBsR17ATrh4Hgs5IQ0fyGiFapaMhfZ5O52uw5wLx59khKb5U4cvLXYB1AZS6cuAg5tqys1yEZHut3sf4FV1TVxvqbSlPqMSr4Y",
    tags: ["VOLUME", "DELTA", "INTRADAY", "ORDER FLOW"]
  },
  {
    id: "ind-ksi",
    name: "Kinetic Slippage Index (KSI)",
    author: "HPotter",
    authorType: "PREMIUM",
    type: "インジケーター",
    views: "8,924",
    boosts: "215",
    version: "v1.4.0",
    description: "高度な出来高・ボラティリティオシレーターを用いて、市場の執行効率と流動性のギャップを精確に測定します。ボラティリティの上昇に対して出来高が追随していない局面を検出し、スリッページリスクや流動性低下に伴う価格の急変（フラッシュクラッシュやオーバーシュート）を未然に察知するためのクオンツモデルです。",
    chartUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuANkGnVj0hAg2pMVbkOUs70tQf2nAwzwe-a2bI66DkrVDHZ3bU8w_4nCn0NnXTIhZJkvG3WnlC6TgrWuELKvOtQgIwBgWFPcTpjgsXJL53sh-QUvr36Hn6shvRW8j9cEpVrPJaCAIqORQz-5u-IR8uOu6mD1rMfzSlh4RRB2CxzyTO4_iUzVLYd1Qo3rywW-1LucY8kQz8KiZVoET-gaSOSUKtjB_OIBWe7qq5AlNQCM8TOVkZqMUIl",
    tags: ["OSCILLATOR", "LIQUIDITY", "SLIPPAGE", "VOLATILITY"]
  },
  {
    id: "ind-session-edge",
    name: "Session Edge Profiler",
    author: "fluxchart",
    authorType: "VERIFIED",
    type: "ダッシュボード",
    views: "15,321",
    boosts: "623",
    version: "v2.0.1",
    description: "最大5つの取引セッション（東京、ロンドン、ニューヨーク、アジア、欧州）を個別に色分けしてプロファイリングし、それぞれの統計的価格レンジ、出来高分布、平均回帰ラインをダッシュボード化します。各市場参加者の行動パターンや流動性のピーク時間帯に応じた、最適なエグゼキューション戦略の策定を可能にします。",
    chartUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp8eizH1WYh4inJZyG2fDyu0JLDpM3xJ3ULw7182Hg92-999PfRiuoEtydpvMXDz4955zx1O1zV-NWhC1nE9FMCo5K4krwDtmBAJiASTEVCJM0WKKGffhwhsaBBlZMgll9EfsPpZPSETrGtgB0RjX8LY227T0PDNBYnDUxjStpW2eiq7484-DpfZz-APHUNmJ1wy9AXSe4tHmO_zsDGUC9QoxNi46AGnEQFGO75cAOZbEv4WHW5eVS",
    tags: ["SESSION", "DASHBOARD", "RANGE", "STATISTICS"]
  },
  {
    id: "ind-regression",
    name: "Regression Volume Profile",
    author: "BigBeluga",
    authorType: "VERIFIED",
    type: "回帰分析",
    views: "24,501",
    boosts: "941",
    version: "v4.2.0",
    description: "高度な統計的線形・多項式回帰モデリングと、地域的な価格・出来高分布（ボリュームプロファイル）を融合させた未来予測ツールです。価格推移の動的なトレンドチャネルを常にフィッティングさせ、回帰直線の乖離度合いとチャネル内の出来高集中度合い（POC）から、極めて精度の高い反発・反落ポイントを検出します。",
    chartUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCq3Ltcgn20Vj6ZEUVoeQGR8iFKoMZVa-is4_RiFXYGQFfQ81Cu2to6_GPEVIsCbzuZwYDus23fjLUEDU9TInVZnQ4ObEHbp3zvlhAXMHvnoRN7toR9WV1GUYjZkGuX3f4d4FVE787Fj-NJQ0yT7WDGZZssdDSR22LTJFh3l9foJpZDP9kHNimwOchTlR-MoooM2OJtfSYLr0q9MCBEG96uKRyT3nABq9Tspwjp1KiAW8ZMTqOwRSr7",
    tags: ["REGRESSION", "VOLUME PROFILE", "CHANNELS", "PREDICTION"]
  }
];

export const INITIAL_MOVERS: MarketMovers[] = [
  {
    symbol: "MU",
    name: "Micron Technology",
    exchange: "NASDAQ",
    changePercent: "+4.12%",
    isBullish: true,
    price: "$842.10"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    exchange: "NASDAQ",
    changePercent: "+2.84%",
    isBullish: true,
    price: "$912.45"
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    exchange: "NASDAQ",
    changePercent: "-1.55%",
    isBullish: false,
    price: "$174.20"
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    exchange: "NASDAQ",
    changePercent: "+1.24%",
    isBullish: true,
    price: "$182.52"
  },
  {
    symbol: "BTCUSD",
    name: "Bitcoin / US Dollar",
    exchange: "BITSTAMP",
    changePercent: "-2.15%",
    isBullish: false,
    price: "$64,320.50"
  }
];
