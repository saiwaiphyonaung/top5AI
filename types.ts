// FIX: Add import for React to use React types like React.ReactNode.
import React from 'react';

export type PricingTier = 'Free' | 'Freemium' | 'Paid' | 'Free Trial';

export interface Review {
  id: string;
  rating: number; // 1 to 5
  comment: string;
  author: string;
  date: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
}

// FIX: Add missing StockDataPoint type for the stock chart feature.
export interface StockDataPoint {
  time: string;
  [key: string]: string | number;
}

export interface AiTool {
  rank: number;
  name: string;
  logo: React.ReactNode;
  description: string;
  pros: string[];
  cons:string[];
  pricing: PricingTier;
  startingPrice?: string;
  totalUsers: string;
  url: string;
  baseScore: number;
  bestFor: string;
  pricingPlans?: PricingPlan[];
  usageByNation?: { nation: string; percentage: number; flag: string }[];
}

export interface Category {
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  // FIX: Changed type from React.ReactNode to React.ReactElement. This is more specific
  // and correctly reflects that the icon is an element created with React.createElement.
  // This resolves a TypeScript error in Sidebar.tsx when trying to clone the element with a new className.
  // FIX: Explicitly typed the props for the React.ReactElement to include className.
  // This provides TypeScript with the necessary information for React.cloneElement to accept a className prop, resolving the overload error.
  icon?: React.ReactElement<{ className?: string }>;
  tools: AiTool[];
}

export interface Prompt {
  id:string;
  title: string;
  description: string;
  promptText: string;
}

export interface PromptCategory {
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  prompts: Prompt[];
}

export type Language = 'en' | 'my' | 'zh-TW';