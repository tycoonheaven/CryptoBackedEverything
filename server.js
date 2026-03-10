const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const marketplaceItems = [
  {
    id: "quiet-runner-shoe",
    name: "Quiet Runner Shoe",
    category: "Footwear",
    type: "Physical",
    images: {
      primary: "/images/quiet-runner-shoe.svg",
      gallery: ["/images/quiet-runner-shoe.svg"],
      alt: "Quiet Runner Shoe product image for agent-to-human sharing.",
    },
    listingState: {
      status: "LISTING_LIVE",
      basketType: "PoS",
      zeroSumTarget: "$120",
      price: "$120",
      cryptoPrice: "0.0018 BTC",
      buyAction: "BUY_YES",
    },
    basketState: {
      payoutCoin: "BCH",
      monthlyYield: "$5",
      method: "Stake gains flow into BCH for buyer payback.",
      basketHealth: "HEAVEN_STEADY",
      coins: [
        { symbol: "SOL", address: "6jYk...RunSole1", balance: "84.50 SOL" },
        { symbol: "ADA", address: "addr1...RunSole2", balance: "1280 ADA" },
      ],
    },
    optInState: {
      qrBinding: "BUYER_BOUND",
      activationState: "AWAITING_QR_SCAN",
      reminderRule: "EMAIL_QR_AFTER_30_DAYS",
      anchorRule: "OPT_IN_DATE_STARTS_MONTHLY_CLOCK",
    },
    repaymentState: {
      progress: "$0 / $120 returned",
      remaining: "$120",
      nextDueDate: "April 9, 2026",
      lateAfter: "April 23, 2026",
      missedAfter: "May 9, 2026",
      zeroPayRule: "3_ZERO_MONTHS_EQUAL_1_DEMERIT_EVENT",
    },
    reputationState: {
      seller: "Nova Soles",
      score: 94,
      onTimeRate: "96%",
      demerits: 0,
      blockRule: "3_DEMERITS_BLOCK_PROFILE",
    },
    autopayInstruction: {
      recommendation: "ASK_HUMAN_TO_ENABLE_MONTHLY_AUTOPAY",
      message:
        "This order still owes $120. Target MYP is $5 in BCH. Next due date is April 9, 2026. Late begins after April 23, 2026. Would you have me set up monthly autopay from the product basket?",
    },
    summary: "Street-ready running shoe with a buyer-bound QR activation card inside the box.",
    shipping: "Ships in 2 business days",
  },
  {
    id: "artisan-leather-boot",
    name: "Artisan Leather Boot",
    category: "Footwear",
    type: "Physical",
    images: {
      primary: "/images/artisan-leather-boot.svg",
      gallery: ["/images/artisan-leather-boot.svg"],
      alt: "Artisan Leather Boot product image for agent-to-human sharing.",
    },
    listingState: {
      status: "LISTING_LIVE",
      basketType: "PoW",
      zeroSumTarget: "$280",
      price: "$280",
      cryptoPrice: "0.072 ETH",
      buyAction: "BUY_YES",
    },
    basketState: {
      payoutCoin: "BCH",
      monthlyYield: "$8.50",
      method: "Reserve coins bleed down until the buyer reaches zero-sum.",
      basketHealth: "HEAVEN_STEADY",
      coins: [
        { symbol: "BTC", address: "bc1q...BootVault1", balance: "0.093 BTC" },
        { symbol: "LTC", address: "ltc1q...BootVault2", balance: "8.4 LTC" },
      ],
    },
    optInState: {
      qrBinding: "BUYER_BOUND",
      activationState: "AWAITING_QR_SCAN",
      reminderRule: "EMAIL_QR_AFTER_30_DAYS",
      anchorRule: "OPT_IN_DATE_STARTS_MONTHLY_CLOCK",
    },
    repaymentState: {
      progress: "$14 / $280 returned",
      remaining: "$266",
      nextDueDate: "April 12, 2026",
      lateAfter: "April 26, 2026",
      missedAfter: "May 12, 2026",
      zeroPayRule: "3_ZERO_MONTHS_EQUAL_1_DEMERIT_EVENT",
    },
    reputationState: {
      seller: "Iron Path Goods",
      score: 88,
      onTimeRate: "91%",
      demerits: 0,
      blockRule: "3_DEMERITS_BLOCK_PROFILE",
    },
    autopayInstruction: {
      recommendation: "ASK_HUMAN_TO_CONFIRM_POW_BLEED_DOWN_AUTOPAY",
      message:
        "This order still owes $266. Target MYP is $8.50 in BCH. Next due date is April 12, 2026. Would you have me enable monthly bleed-down autopay from the product reserve basket?",
    },
    summary: "Hand-finished boot backed by a dedicated proof-of-work reserve basket.",
    shipping: "Custom fit ships in 5 days",
  },
  {
    id: "maker-lab-sneaker-kit",
    name: "Maker Lab Sneaker Kit",
    category: "Creator Tools",
    type: "Digital",
    images: {
      primary: "/images/maker-lab-sneaker-kit.svg",
      gallery: ["/images/maker-lab-sneaker-kit.svg"],
      alt: "Maker Lab Sneaker Kit digital product image for agent-to-human sharing.",
    },
    listingState: {
      status: "LISTING_LIVE",
      basketType: "PoS",
      zeroSumTarget: "$60",
      price: "$60",
      cryptoPrice: "60 USDC",
      buyAction: "BUY_YES",
    },
    basketState: {
      payoutCoin: "BCH",
      monthlyYield: "$2.25",
      method: "Validator gains convert monthly and flow out as BCH.",
      basketHealth: "WATCH_ZERO_PAY_WINDOW",
      coins: [
        { symbol: "ETH", address: "0x4b7...Studio01", balance: "1.92 ETH" },
        { symbol: "ATOM", address: "cosmos1...Studio02", balance: "224 ATOM" },
      ],
    },
    optInState: {
      qrBinding: "BUYER_BOUND",
      activationState: "OPT_IN_ACTIVE",
      reminderRule: "EMAIL_QR_AFTER_30_DAYS",
      anchorRule: "OPT_IN_DATE_STARTS_MONTHLY_CLOCK",
    },
    repaymentState: {
      progress: "$18 / $60 returned",
      remaining: "$42",
      nextDueDate: "April 3, 2026",
      lateAfter: "April 17, 2026",
      missedAfter: "May 3, 2026",
      zeroPayRule: "3_ZERO_MONTHS_EQUAL_1_DEMERIT_EVENT",
    },
    reputationState: {
      seller: "Studio Tread",
      score: 92,
      onTimeRate: "94%",
      demerits: 1,
      blockRule: "3_DEMERITS_BLOCK_PROFILE",
    },
    autopayInstruction: {
      recommendation: "ASK_HUMAN_TO_KEEP_AUTOPAY_ACTIVE",
      message:
        "This order still owes $42. Target MYP is $2.25 in BCH. Basket health is watch-zero-pay-window. Would you have me keep monthly autopay active and monitor for zero-pay risk?",
    },
    summary: "Template pack for shoe makers who have AI concept files and yield-backed sales.",
    shipping: "Instant file delivery",
  },
];

const protocolSurfaces = [
  {
    id: "listing-state",
    title: "Listing State",
    detail: "Shows listing live status, basket type, zero-sum target, product price, crypto price, and the BUY_YES action.",
  },
  {
    id: "basket-state",
    title: "Basket State",
    detail: "Shows payout coin, MYP, basket health, coin addresses, visible balances, and the exact backing method.",
  },
  {
    id: "opt-in-state",
    title: "Opt-In State",
    detail: "Shows QR binding, activation state, 30-day reminder rule, and the anchor rule that starts monthly timing.",
  },
  {
    id: "repayment-state",
    title: "Repayment State",
    detail: "Shows amount returned, amount remaining, next due date, late date, missed date, and zero-pay rule.",
  },
  {
    id: "reputation-state",
    title: "Reputation State",
    detail: "Shows seller score, on-time rate, demerits, and the three-demerit block rule.",
  },
  {
    id: "autopay-instruction",
    title: "Autopay Instruction",
    detail: "Shows the agent-ready message the visiting agent can send to its human for monthly autopay setup.",
  },
  {
    id: "image-state",
    title: "Image State",
    detail: "Shows stable product image objects and alt text the agent can forward to a human.",
  },
];

const protocolRules = [
  "EVERY_PRODUCT_HAS_ITS_OWN_DEDICATED_BASKET",
  "EVERY_LISTING_HAS_AGENT_SHAREABLE_IMAGE_OBJECTS",
  "MYP_IS_A_TARGET_MONTHLY_PAY_SIGNAL_WITH_ROOM_TO_FLOW",
  "REPAYMENT_KEEPS_GOING_UNTIL_FULL_COST_HAS_RETURNED",
  "ONLY_THE_CHECKOUT_BUYER_CAN_ACTIVATE_THE_QR_OPT_IN",
  "EMAIL_QR_REMINDER_AFTER_30_DAYS_WITHOUT_ACTIVATION",
  "3_CONSECUTIVE_ZERO_MONTHS_CREATE_1_ZERO_PAY_EVENT",
  "3_DEMERITS_BLOCK_THE_SELLER_PROFILE",
];

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/products", (req, res) => {
  res.json({
    name: "CryptoBackedEverything",
    count: marketplaceItems.length,
    items: marketplaceItems,
    protocolSurfaces,
    protocolRules,
  });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CryptoBackedEverything is live on http://localhost:${PORT}`);
});

