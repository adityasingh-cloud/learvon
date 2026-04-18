import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Validation Schema ────────────────────────────────
const contactSchema = z.object({
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  business_name: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(150),
  business_type: z.enum([
    "cafe_restaurant",
    "gym_fitness",
    "fashion_clothing",
    "education_coaching",
    "ecommerce",
    "other",
  ]),
  services_needed: z
    .array(
      z.enum([
        "website",
        "social_media",
        "brand_identity",
        "expansion_report",
        "full_package",
      ])
    )
    .min(1, "Please select at least one service"),
  monthly_budget: z
    .number()
    .min(5000)
    .max(500000),
  message: z
    .string()
    .min(10, "Please write at least 10 characters")
    .max(2000),
});

// ─── Helper Functions ────────────────────────────────
function formatBudget(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L+`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

function formatServices(services: string[]): string {
  const labels: Record<string, string> = {
    website: "Website Design",
    social_media: "Social Media Management",
    brand_identity: "Brand Identity",
    expansion_report: "Expansion Consulting Report",
    full_package: "Full Package",
  };
  return services.map((s) => labels[s] || s).join(", ");
}

// ─── POST Handler ─────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Dynamic imports to avoid top-level execution
    const { createClient } = await import("@supabase/supabase-js");

    // Create Supabase admin client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Parse and validate request body
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Save to Supabase
    const { data: submission, error: dbError } = await supabaseAdmin
      .from("contacts")
      .insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        business_name: data.business_name,
        business_type: data.business_type,
        services_needed: data.services_needed,
        monthly_budget: data.monthly_budget,
        message: data.message,
        status: "new",
        ip_address: ip,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save your message. Please try again.",
          error: dbError.message,
        },
        { status: 500 }
      );
    }

    // Optional: Send emails if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (resendApiKey && resendApiKey !== 're_your-key-here' && notificationEmail) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);

        // Send notification email
        await resend.emails.send({
          from: "Leavron Leads <noreply@leavron.in>",
          to: [notificationEmail],
          subject: `🔥 New Lead: ${data.business_name} — ${formatBudget(data.monthly_budget)}/mo`,
          html: `
            <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0A1628; color: #C8D8E8; padding: 32px; border-radius: 12px;">
              <div style="background: #00C9A7; color: #0A1628; padding: 16px 24px; border-radius: 8px; margin-bottom: 24px;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 700;">🎯 New Lead — Leavron</h1>
                <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.8;">
                  Submitted ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
                </p>
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px 0; color: #7A8EA0; font-size: 13px; width: 40%;">Full Name</td><td style="padding: 10px 0; color: #FFFFFF; font-weight: 600;">${data.full_name}</td></tr>
                <tr style="border-top: 1px solid #1E3A5F;"><td style="padding: 10px 0; color: #7A8EA0; font-size: 13px;">Email</td><td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #00C9A7;">${data.email}</a></td></tr>
                ${data.phone ? `<tr style="border-top: 1px solid #1E3A5F;"><td style="padding: 10px 0; color: #7A8EA0; font-size: 13px;">Phone</td><td style="padding: 10px 0;"><a href="tel:${data.phone}" style="color: #00C9A7;">${data.phone}</a></td></tr>` : ""}
                <tr style="border-top: 1px solid #1E3A5F;"><td style="padding: 10px 0; color: #7A8EA0; font-size: 13px;">Business</td><td style="padding: 10px 0; color: #FFFFFF; font-weight: 600;">${data.business_name}</td></tr>
                <tr style="border-top: 1px solid #1E3A5F;"><td style="padding: 10px 0; color: #7A8EA0; font-size: 13px;">Business Type</td><td style="padding: 10px 0; color: #FFFFFF;">${data.business_type.replace(/_/g, " ")}</td></tr>
                <tr style="border-top: 1px solid #1E3A5F;"><td style="padding: 10px 0; color: #7A8EA0; font-size: 13px;">Services Needed</td><td style="padding: 10px 0; color: #FFD93D; font-weight: 600;">${formatServices(data.services_needed)}</td></tr>
                <tr style="border-top: 1px solid #1E3A5F;"><td style="padding: 10px 0; color: #7A8EA0; font-size: 13px;">Monthly Budget</td><td style="padding: 10px 0; color: #00C9A7; font-weight: 700; font-size: 18px;">${formatBudget(data.monthly_budget)}/month</td></tr>
                <tr style="border-top: 1px solid #1E3A5F;"><td style="padding: 10px 0; color: #7A8EA0; font-size: 13px; vertical-align: top;">Message</td><td style="padding: 10px 0; color: #C8D8E8; line-height: 1.6;">${data.message}</td></tr>
              </table>
              <div style="margin-top: 24px; padding: 16px; background: #152035; border-radius: 8px; border-left: 3px solid #FF6B6B;">
                <p style="margin: 0; font-size: 13px; color: #FF6B6B; font-weight: 600;">⚡ Reply within 2 hours to maximise conversion!</p>
                <p style="margin: 4px 0 0; font-size: 12px; color: #7A8EA0;">Submission ID: ${submission.id}</p>
              </div>
              <div style="margin-top: 16px; text-align: center;">
                <a href="mailto:${data.email}?subject=Re: Your Leavron inquiry — Let's talk!" style="display: inline-block; background: #00C9A7; color: #0A1628; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">Reply to ${data.full_name} →</a>
              </div>
            </div>
          `,
        });

        // Send confirmation email to client
        await resend.emails.send({
          from: "Aditya Singh — Leavron <aditya@leavron.in>",
          to: [data.email],
          subject: `Got your message, ${data.full_name.split(" ")[0]}! 🚀`,
          html: `
            <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0A1628; color: #C8D8E8; padding: 32px; border-radius: 12px;">
              <h1 style="color: #FFFFFF; font-size: 24px; margin: 0 0 8px;">Hey ${data.full_name.split(" ")[0]}! 👋</h1>
              <p style="color: #00C9A7; font-size: 16px; margin: 0 0 24px;">Your message reached me. I'll be in touch within 2 hours.</p>
              <div style="background: #152035; padding: 20px; border-radius: 10px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px; color: #7A8EA0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">What you submitted</p>
                <p style="margin: 0 0 6px;"><strong style="color: #FFFFFF;">Business:</strong> ${data.business_name}</p>
                <p style="margin: 0 0 6px;"><strong style="color: #FFFFFF;">Services:</strong> <span style="color: #FFD93D;">${formatServices(data.services_needed)}</span></p>
                <p style="margin: 0;"><strong style="color: #FFFFFF;">Budget:</strong> <span style="color: #00C9A7;">${formatBudget(data.monthly_budget)}/month</span></p>
              </div>
              <p style="line-height: 1.7; color: #C8D8E8;">I personally review every single inquiry. Before our call, I'll research <strong style="color: #FFFFFF;">${data.business_name}</strong> so I already have ideas ready for you — no generic advice, only what fits your business.</p>
              <p style="line-height: 1.7; color: #C8D8E8; margin-top: 16px;">While you wait, feel free to check out our work at <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://leavron.in'}" style="color: #00C9A7;">leavron.in</a> or connect with me on <a href="https://instagram.com/leavron" style="color: #00C9A7;">Instagram</a>.</p>
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #1E3A5F;">
                <p style="margin: 0; color: #FFFFFF; font-weight: 600;">Aditya Singh</p>
                <p style="margin: 4px 0 0; color: #7A8EA0; font-size: 13px;">Founder, Leavron · Kolkata</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email send failed:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! We'll reply within 2 hours.",
        data: { id: submission.id },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}