const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const marketplaceItems = [
  {
    id: "cold-vault-watch",
    name: "Cold Vault Chronograph",
    category: "Physical",
    price: "0.42 BTC",
    backing: "Swiss steel inventory locked against on-chain proof-of-reserve",
    seller: "Atlas Time",
    summary: "Luxury watch inventory tokenized for instant global checkout.",
    featured: true,
  },
  {
    id: "genesis-studio-pack",
    name: "Genesis Studio Pack",
    category: "Digital",
    price: "2.8 ETH",
    backing: "Commercial license and master files notarized to Arweave",
    seller: "Signal Foundry",
    summary: "Brand kit, 3D assets, and launch visuals for crypto-native startups.",
    featured: true,
  },
  {
    id: "reserve-roasted-coffee",
    name: "Reserve Roasted Coffee Crate",
    category: "Physical",
    price: "185 USDC",
    backing: "Warehouse receipts and shipping milestones mirrored on-chain",
    seller: "Bean Ledger",
    summary: "Subscription-ready premium coffee with transparent supply verification.",
    featured: false,
  },
  {
    id: "founder-access-pass",
    name: "Founder Access Pass",
    category: "Digital",
    price: "950 USDT",
    backing: "Membership utility NFT with rev share smart-contract split",
    seller: "Builder Circle",
    summary: "Private community access, workshop vault, and partner drops.",
    featured: false,
  },
  {
    id: "solar-battery-kit",
    name: "Solar Battery Kit",
    category: "Physical",
    price: "1.15 BTC",
    backing: "Serialized hardware escrowed until blockchain settlement confirms",
    seller: "Grid Harbor",
    summary: "Home backup power equipment sold with escrow-aware delivery.",
    featured: true,
  },
  {
    id: "ai-agent-license",
    name: "AI Agent License Bundle",
    category: "Digital",
    price: "640 DAI",
    backing: "Per-seat usage rights issued with programmable royalty routing",
    seller: "Prompt Harbor",
    summary: "Deployable specialist agents with transfer-safe licensing.",
    featured: false,
  },
];

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/products", (req, res) => {
  res.json({
    name: "CryptoBackedEverything",
    count: marketplaceItems.length,
    items: marketplaceItems,
  });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`CryptoBackedEverything is live on http://localhost:${PORT}`);
});
