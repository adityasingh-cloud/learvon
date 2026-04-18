import createClient from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { SanityImage } from "@/types";

// ─── Sanity Client ────────────────────────────────────
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // fast cached reads for frontend
  token: process.env.SANITY_API_TOKEN,
});

// ─── Image URL Builder ────────────────────────────────
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

// ─── GROQ Queries ────────────────────────────────────

// All posts for blog listing page
export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    readTime,
    category,
    "author": author->{
      name,
      image
    }
  }
`;

// Featured post (most recent)
export const FEATURED_POST_QUERY = `
  *[_type == "post"] | order(publishedAt desc)[0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    readTime,
    category,
    "author": author->{
      name,
      image
    }
  }
`;

// Latest 4 posts (excluding featured)
export const RECENT_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc)[1..4] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    readTime,
    category
  }
`;

// Single post by slug (for blog post page)
export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    coverImage,
    publishedAt,
    readTime,
    category,
    "author": author->{
      name,
      bio,
      image
    }
  }
`;

// All slugs (for static generation)
export const ALL_SLUGS_QUERY = `
  *[_type == "post"] {
    "slug": slug.current
  }
`;

// ─── Fetch Helpers ────────────────────────────────────
export async function getAllPosts() {
  return sanityClient.fetch(ALL_POSTS_QUERY);
}

export async function getFeaturedPost() {
  return sanityClient.fetch(FEATURED_POST_QUERY);
}

export async function getRecentPosts() {
  return sanityClient.fetch(RECENT_POSTS_QUERY);
}

export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });
}

export async function getAllSlugs() {
  return sanityClient.fetch(ALL_SLUGS_QUERY);
}
