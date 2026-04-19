"use client";
import { useState, useRef, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  full_name: z.string().min(2,"Enter your full name"),
  email: z.string().email("Enter a valid email"),
  business_name: z.string().min(2,"Enter your business name"),
  business_type: z.string().min(1,"Select a business type"),
  services_needed: z.array(z.string()).min(1,"Select at least one service"),
  monthly_budget: z.number().min(5000),
  message: z.string().min(10,"Write at least 10 characters"),
});

type FD = z.infer<typeof schema>;

const bTypes = [
  {v:"cafe_restaurant",l:"Café / Restaurant"},
  {v:"gym_fitness",l:"Gym / Fitness"},
  {v:"fashion_clothing",l:"Fashion / Clothing"},
  {v:"education_coaching",l:"Education / Coaching"},
  {v:"ecommerce",l:"E-commerce"},
  {v:"other",l:"Other"},
];

const sOpts = [
  {v:"website",l:"Website"},
  {v:"social_media",l:"Social Media"},
  {v:"brand_identity",l:"Brand Identity"},
  {v:"expansion_report",l:"Expansion Report"},
  {v:"full_package",l:"Full Package"},
];

const inp = (err?: boolean): CSSProperties => ({
  width:"100%", padding:"12px 16px", borderRadius:12, outline:"none",
  background:"rgba(255,255,255,0.04)", fontFamily:"'Inter',sans-serif",
  border:`1px solid ${err?"#FF6B6B":"rgba(255,255,255,0.1)"}`,
  color:"#C8D8E8", fontSize:14, transition:"border-color 0.2s",
});

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [budget, setBudget] = useState(15000);
  const { register, handleSubmit, watch, setValue, formState:{ errors } } = useForm<FD>({
    resolver: zodResolver(schema),
    defaultValues: { services_needed:[], monthly_budget:15000 },
  });
  const sel = watch("services_needed") || [];
  const toggle = (v: string) => setValue("services_needed", sel.includes(v) ? sel.filter(s=>s!==v) : [...sel,v], { shouldValidate:true });
  const fmt = (n: number) => n>=100000 ? `₹${(n/100000).toFixed(1)}L+` : `₹${(n/1000).toFixed(0)}K`;

  const onSubmit = async (data: FD) => {
    setStatus("loading");
    try {
      const r = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({...data,monthly_budget:budget}) });
      const j = await r.json();
      setStatus(j.success ? "success" : "error");
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" style={{ padding:"112px 0",background:"#0A1628",position:"relative" }}>
      <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 50% at 100% 50%,rgba(0,201,167,0.04),transparent)",pointerEvents:"none" }} />
      <div ref={ref} style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <motion.div initial={{ opacity:0,x:-20 }} animate={inView?{opacity:1,x:0}:{}} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
          <span style={{ width:24,height:1,background:"#00C9A7",display:"block" }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#00C9A7",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase" }}>Let's Talk</span>
        </motion.div>
        <motion.h2 initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.1 }}
          style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:"clamp(2.5rem,6vw,5rem)",color:"#fff",margin:"0 0 12px",lineHeight:1.1 }}>
          Ready to{' '}
          <span style={{ background:"linear-gradient(135deg,#00C9A7,#FFD93D)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>Grow?</span>
        </motion.h2>
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.15 }}
          style={{ color:"#7A8EA0",fontSize:17,fontFamily:"'Inter',sans-serif",maxWidth:480,marginBottom:56 }}>
          Free 30-minute strategy call. No pitch. No pressure. Just a real conversation.
        </motion.p>

        <div style={{ display:"grid",gridTemplateColumns:"2fr 3fr",gap:48 }}>
          <motion.div initial={{ opacity:0,x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.2 }}
            style={{ display:"flex",flexDirection:"column",gap:24 }}>
            {[{icon:"📧",l:"Email",v:"hello@leavron.in"},{icon:"📍",l:"Location",v:"Kolkata, West Bengal"},{icon:"💬",l:"Chat",v:"WhatsApp & Instagram"}].map(c=>(
              <div key={c.l} style={{ display:"flex",alignItems:"center",gap:16 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:"#152035",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{c.icon}</div>
                <div>
                  <p style={{ color:"#7A8EA0",fontSize:12,margin:0,fontFamily:"'Inter',sans-serif" }}>{c.l}</p>
                  <p style={{ color:"#fff",fontWeight:500,fontSize:14,margin:0,fontFamily:"'Inter',sans-serif" }}>{c.v}</p>
                </div>
              </div>
            ))}
            <div style={{ borderRadius:12,padding:20,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,201,167,0.2)",borderLeft:"3px solid #00C9A7" }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                <span style={{ width:8,height:8,borderRadius:"50%",background:"#00C9A7",display:"inline-block" }} />
                <span style={{ color:"#00C9A7",fontWeight:700,fontSize:14,fontFamily:"'Space Grotesk',sans-serif" }}>Currently Accepting Clients</span>
              </div>
              <p style={{ color:"#7A8EA0",fontSize:13,margin:0,fontFamily:"'Inter',sans-serif" }}>We have <span style={{ color:"#fff",fontWeight:600 }}>3 spots open</span> this month.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0,x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.3 }}>
            {status==="success" ? (
              <motion.div initial={{ scale:0.9,opacity:0 }} animate={{ scale:1,opacity:1 }}
                style={{ borderRadius:20,padding:64,display:"flex",flexDirection:"column",alignItems:"center",gap:16,background:"rgba(0,201,167,0.05)",border:"1px solid rgba(0,201,167,0.3)",textAlign:"center" }}>
                <div style={{ width:64,height:64,borderRadius:"50%",background:"rgba(0,201,167,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,color:"#00C9A7" }}>✓</div>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:"#fff",fontSize:24,margin:0 }}>Message Sent!</h3>
                <p style={{ color:"#7A8EA0",fontFamily:"'Inter',sans-serif",margin:0 }}>We'll reply within 2 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}
                style={{ borderRadius:20,padding:32,display:"flex",flexDirection:"column",gap:20,background:"linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",border:"1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
                  <div>
                    <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:6,fontFamily:"'Inter',sans-serif" }}>Full Name *</label>
                    <input {...register("full_name")} placeholder="Aditya Singh" style={inp(!!errors.full_name)}
                      onFocus={e=>e.target.style.borderColor="#00C9A7"} onBlur={e=>e.target.style.borderColor=errors.full_name?"#FF6B6B":"rgba(255,255,255,0.1)"} />
                    {errors.full_name && <p style={{ color:"#FF6B6B",fontSize:11,margin:"4px 0 0",fontFamily:"'Inter',sans-serif" }}>{errors.full_name.message}</p>}
                  </div>
                  <div>
                    <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:6,fontFamily:"'Inter',sans-serif" }}>Business Name *</label>
                    <input {...register("business_name")} placeholder="Your Business" style={inp(!!errors.business_name)}
                      onFocus={e=>e.target.style.borderColor="#00C9A7"} onBlur={e=>e.target.style.borderColor=errors.business_name?"#FF6B6B":"rgba(255,255,255,0.1)"} />
                    {errors.business_name && <p style={{ color:"#FF6B6B",fontSize:11,margin:"4px 0 0" }}>{errors.business_name.message}</p>}
                  </div>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
                  <div>
                    <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:6,fontFamily:"'Inter',sans-serif" }}>Email *</label>
                    <input {...register("email")} type="email" placeholder="you@business.com" style={inp(!!errors.email)}
                      onFocus={e=>e.target.style.borderColor="#00C9A7"} onBlur={e=>e.target.style.borderColor=errors.email?"#FF6B6B":"rgba(255,255,255,0.1)"} />
                    {errors.email && <p style={{ color:"#FF6B6B",fontSize:11,margin:"4px 0 0" }}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:6,fontFamily:"'Inter',sans-serif" }}>Business Type *</label>
                    <select {...register("business_type")} style={{ ...inp(!!errors.business_type),background:"#152035" }}
                      onFocus={e=>e.target.style.borderColor="#00C9A7"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}>
                      <option value="">Select type...</option>
                      {bTypes.map(t=><option key={t.v} value={t.v}>{t.l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:8,fontFamily:"'Inter',sans-serif" }}>What do you need? *</label>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                    {sOpts.map(s=>{
                      const on=sel.includes(s.v);
                      return <button key={s.v} type="button" onClick={()=>toggle(s.v)}
                        style={{ padding:"8px 16px",borderRadius:10,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all 0.2s",fontFamily:"'Inter',sans-serif",
                          background:on?"rgba(0,201,167,0.15)":"rgba(255,255,255,0.04)",
                          border:on?"1px solid rgba(0,201,167,0.5)":"1px solid rgba(255,255,255,0.1)",
                          color:on?"#00C9A7":"#7A8EA0" }}>{on?"✓ ":""}{s.l}</button>;
                    })}
                  </div>
                  {errors.services_needed && <p style={{ color:"#FF6B6B",fontSize:11,margin:"4px 0 0" }}>{errors.services_needed.message as string}</p>}
                </div>
                <div>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                    <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,fontFamily:"'Inter',sans-serif" }}>Monthly Budget</label>
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:"#00C9A7",fontSize:14,padding:"4px 12px",borderRadius:8,background:"rgba(0,201,167,0.1)" }}>{fmt(budget)}</span>
                  </div>
                  <input type="range" min={5000} max={100000} step={1000} value={budget}
                    onChange={e=>{const v=Number(e.target.value);setBudget(v);setValue("monthly_budget",v);}}
                    style={{ width:"100%",height:6,borderRadius:3,appearance:"none",cursor:"pointer",background:`linear-gradient(to right,#00C9A7 ${((budget-5000)/95000)*100}%,rgba(255,255,255,0.1) ${((budget-5000)/95000)*100}%)` }} />
                  <div style={{ display:"flex",justifyContent:"space-between",marginTop:6 }}>
                    {["₹5K","₹25K","₹50K","₹1L+"].map(l=><span key={l} style={{ color:"#3A5070",fontSize:11,fontFamily:"'Inter',sans-serif" }}>{l}</span>)}
                  </div>
                </div>
                <div>
                  <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:6,fontFamily:"'Inter',sans-serif" }}>Message *</label>
                  <textarea {...register("message")} rows={4} placeholder="Tell us about your business and what you want to achieve..."
                    style={{ ...inp(!!errors.message),resize:"none" }}
                    onFocus={e=>e.target.style.borderColor="#00C9A7"} onBlur={e=>e.target.style.borderColor=errors.message?"#FF6B6B":"rgba(255,255,255,0.1)"} />
                  {errors.message && <p style={{ color:"#FF6B6B",fontSize:11,margin:"4px 0 0" }}>{errors.message.message}</p>}
                </div>
                <motion.button type="submit" disabled={status==="loading"} whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                  style={{ padding:"16px 0",borderRadius:12,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16,cursor:"pointer",border:"none",background:"linear-gradient(135deg,#00C9A7,#33D4B8)",color:"#0A1628",display:"flex",alignItems:"center",justifyContent:"center",gap:10 }}>
                  {status==="loading" ? <><span style={{ width:20,height:20,border:"2px solid rgba(10,22,40,0.3)",borderTopColor:"#0A1628",borderRadius:"50%",animation:"spin 0.8s linear infinite",display:"inline-block" }} />Sending...</> : "Send Message & Get Free Audit →"}
                </motion.button>
                {status==="error" && <p style={{ color:"#FF6B6B",fontSize:13,textAlign:"center",fontFamily:"'Inter',sans-serif" }}>Something went wrong. Please try again.</p>}
                <p style={{ color:"#3A5070",fontSize:12,textAlign:"center",fontFamily:"'Inter',sans-serif",margin:0 }}>🔒 We reply within 2 hours. No spam, ever.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}
