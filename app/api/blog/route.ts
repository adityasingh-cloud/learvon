import { NextRequest, NextResponse } from "next/server";
import {
  getAllPosts,
  getFeaturedPost,
  getRecentPosts,
  getPostBySlug,
} from "@/lib/sanity";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  try {
    // Single post by slug
    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post) {
        return NextResponse.json(
          { success: false, message: "Post not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, data: post },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    // Featured post
    if (type === "featured") {
      const post = await getFeaturedPost();
      return NextResponse.json(
        { success: true, data: post },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    // Recent posts (for sidebar/grid)
    if (type === "recent") {
      const posts = await getRecentPosts();
      return NextResponse.json(
        { success: true, data: posts },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    // All posts (default)
    const posts = await getAllPosts();
    return NextResponse.json(
      { success: true, data: posts },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Blog API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog posts",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
