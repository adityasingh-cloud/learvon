// ─── Contact Form Types ──────────────────────────────
export type BusinessType =
  | "cafe_restaurant"
  | "gym_fitness"
  | "fashion_clothing"
  | "education_coaching"
  | "ecommerce"
  | "other";

export type ServiceNeeded =
  | "website"
  | "social_media"
  | "brand_identity"
  | "expansion_report"
  | "full_package";

export interface ContactFormData {
  full_name: string;
  business_name: string;
  business_type: BusinessType;
  services_needed: ServiceNeeded[];
  monthly_budget: number;
  message: string;
  email: string;
  phone?: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  created_at: string;
  status: "new" | "contacted" | "converted" | "closed";
  ip_address?: string;
}

// ─── Blog Types ──────────────────────────────────────
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: any[];
  coverImage: SanityImage;
  publishedAt: string;
  readTime: number;
  category: string;
  author: {
    name: string;
    image: SanityImage;
  };
}

export interface BlogPostPreview {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: SanityImage;
  publishedAt: string;
  readTime: number;
  category: string;
}

// ─── API Response Types ──────────────────────────────
export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
