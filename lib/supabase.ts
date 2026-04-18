import { createClient } from "@supabase/supabase-js";

// ─── Types for Supabase Tables ───────────────────────
type ContactsRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  business_name: string;
  business_type: string;
  services_needed: string[];
  monthly_budget: number;
  message: string;
  status: string;
  ip_address: string | null;
};

type ContactsInsert = Omit<ContactsRow, "id" | "created_at">;

type ContactsUpdate = Partial<ContactsRow>;

type BlogViewsRow = {
  id: string;
  post_slug: string;
  viewed_at: string;
  ip_address: string | null;
};

type BlogViewsInsert = Omit<BlogViewsRow, "id">;

type BlogViewsUpdate = Partial<BlogViewsRow>;

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: ContactsRow;
        Insert: ContactsInsert;
        Update: ContactsUpdate;
        Relationships: [];
      };
      blog_views: {
        Row: BlogViewsRow;
        Insert: BlogViewsInsert;
        Update: BlogViewsUpdate;
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
  };
};

// ─── Public Client (use in frontend components) ───────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Check your .env.local file."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ─── Admin Client (use only in API routes / server) ───
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.warn("SUPABASE_SERVICE_ROLE_KEY not found. Admin operations will not work.");
}

export const supabaseAdmin = supabaseServiceKey
  ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;
