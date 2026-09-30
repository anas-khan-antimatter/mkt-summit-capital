export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  benefits: string[];
  category: "body" | "mind" | "energy" | "recovery";
}

export interface Practitioner {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string[];
  credentials: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  practitioner: string;
  date: string;
  time: string;
  notes: string;
}