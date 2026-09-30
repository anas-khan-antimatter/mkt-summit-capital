export interface Strategy {
  id: string;
  title: string;
  tag: string;
  description: string;
  details: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  initials: string;
}

export interface InsightPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  familyOffice: string;
  message: string;
}

export interface RiskProfile {
  score: number;
  label: string;
  allocation: { label: string; pct: number; color: string }[];
}

export interface ScenarioResult {
  projectedValue: number;
  totalContributions: number;
  realGrowth: number;
}

export interface ExplainResponse {
  strategy: string;
  explanation: string;
  short?: string;
  source: "ai" | "deterministic";
}