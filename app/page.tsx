"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm } from "@/lib/actions";
import { ContactFormData } from "@/types";

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

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const servicesNeeded = watch("services_needed") || [];

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    const result = await submitContactForm(data);

    if (result.success) {
      setSuccess(true);
      reset();
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const toggleService = (service: string) => {
    const current = servicesNeeded;
    if (current.includes(service as any)) {
      setValue(
        "services_needed",
        current.filter((s) => s !== service)
      );
    } else {
      setValue("services_needed", [...current, service as any]);
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Leavron Contact Form</h1>

      {success && (
        <div
          style={{
            background: "#d4edda",
            color: "#155724",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        >
          Message sent successfully! We'll reply within 2 hours.
        </div>
      )}

      {error && (
        <div
          style={{
            background: "#f8d7da",
            color: "#721c24",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="full_name">Full Name *</label>
          <input
            id="full_name"
            {...register("full_name")}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
          {errors.full_name && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.full_name.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            {...register("phone")}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
          {errors.phone && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.phone.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="business_name">Business Name *</label>
          <input
            id="business_name"
            {...register("business_name")}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
          {errors.business_name && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.business_name.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Business Type *</label>
          <select
            {...register("business_type")}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          >
            <option value="">Select business type</option>
            <option value="cafe_restaurant">Cafe/Restaurant</option>
            <option value="gym_fitness">Gym/Fitness</option>
            <option value="fashion_clothing">Fashion/Clothing</option>
            <option value="education_coaching">Education/Coaching</option>
            <option value="ecommerce">E-commerce</option>
            <option value="other">Other</option>
          </select>
          {errors.business_type && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.business_type.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Services Needed *</label>
          <div style={{ marginTop: "0.25rem" }}>
            {[
              { value: "website", label: "Website Design" },
              { value: "social_media", label: "Social Media Management" },
              { value: "brand_identity", label: "Brand Identity" },
              { value: "expansion_report", label: "Expansion Consulting Report" },
              { value: "full_package", label: "Full Package" },
            ].map((service) => (
              <label key={service.value} style={{ display: "block", marginBottom: "0.25rem" }}>
                <input
                  type="checkbox"
                  checked={servicesNeeded.includes(service.value as any)}
                  onChange={() => toggleService(service.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                {service.label}
              </label>
            ))}
          </div>
          {errors.services_needed && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.services_needed.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="monthly_budget">Monthly Budget (₹) *</label>
          <input
            id="monthly_budget"
            type="number"
            {...register("monthly_budget", { valueAsNumber: true })}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
          {errors.monthly_budget && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.monthly_budget.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            {...register("message")}
            rows={4}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
          {errors.message && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            background: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </main>
  );
}

