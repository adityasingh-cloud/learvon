import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    // Test public client connection
    const { data: publicTest, error: publicError } = await supabase
      .from("contacts")
      .select("count", { count: "exact", head: true });

    if (publicError) {
      return NextResponse.json(
        {
          success: false,
          message: "Public Supabase client connection failed",
          error: publicError.message,
        },
        { status: 500 }
      );
    }

    // Test admin client connection if available
    let adminStatus = "not-configured";
    if (supabaseAdmin) {
      const { error: adminError } = await supabaseAdmin
        .from("contacts")
        .select("count", { count: "exact", head: true });

      adminStatus = adminError ? `error: ${adminError.message}` : "connected";
    }

    return NextResponse.json({
      success: true,
      message: "Supabase connection verified",
      projectUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      publicClient: "connected",
      adminClient: adminStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Supabase connection test failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
