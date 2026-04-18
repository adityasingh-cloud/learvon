"use server";

import { ContactFormData, ApiResponse } from "@/types";

export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<{ id: string }>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/contact`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
