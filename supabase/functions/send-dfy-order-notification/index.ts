const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const { name, email, business_name, business_type, payment_plan } = await req.json();

    // Email to customer
    const customerEmail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VideoForge <noreply@ethinx.solutions>",
        to: [email],
        subject: "Your VideoForge DFY Order is Confirmed",
        html: `
          <h2>Hey ${name}!</h2>
          <p>Thank you for choosing VideoForge. Your DFY video package order has been confirmed.</p>
          ${business_name ? `<p><strong>Business:</strong> ${business_name}</p>` : ""}
          <p>Our team will begin your video package within <strong>48 hours</strong>. We'll be in touch with next steps.</p>
          <p>— The VideoForge Team</p>
        `,
      }),
    });

    // Email to admin
    const adminEmail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VideoForge <noreply@ethinx.solutions>",
        to: ["troy@ethinx.com"],
        subject: "New DFY Order Received",
        html: `
          <h2>New DFY Order</h2>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Business:</strong> ${business_name || "N/A"}</li>
            <li><strong>Type:</strong> ${business_type || "N/A"}</li>
            <li><strong>Payment Plan:</strong> ${payment_plan || "standard"}</li>
          </ul>
        `,
      }),
    });

    const customerResult = await customerEmail.json();
    const adminResult = await adminEmail.json();

    return new Response(
      JSON.stringify({ customer: customerResult, admin: adminResult }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
