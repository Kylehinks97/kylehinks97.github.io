const JSON_HEADERS = {
  "Content-Type": "application/json",
};

function response(statusCode, body) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: JSON_HEADERS,
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitize(value, maxLength = 5000) {
  return String(value || "").replace(/\r/g, "").trim().slice(0, maxLength);
}

function getEnv(name) {
  return globalThis.Netlify?.env?.get(name) || process.env[name];
}

export default async function handler(request) {
  if (request.method !== "POST") {
    return response(405, { error: "Method not allowed." });
  }

  let parsedBody;

  try {
    parsedBody = await request.json();
  } catch {
    return response(400, { error: "Invalid request body." });
  }

  const enquiryType = sanitize(parsedBody.enquiryType, 20);
  const name = sanitize(parsedBody.name, 120);
  const replyTo = sanitize(parsedBody.replyTo, 254);
  const message = sanitize(parsedBody.message, 12000);
  const website = sanitize(parsedBody.website, 120);
  const startedAt = Number(parsedBody.startedAt);

  if (website) {
    return response(400, { error: "Spam protection triggered." });
  }

  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    return response(400, { error: "Please take a little longer to complete the form." });
  }

  if (!["care", "career"].includes(enquiryType)) {
    return response(400, { error: "Unknown inquiry type." });
  }

  if (!name || !replyTo || !message) {
    return response(400, { error: "Please complete all required fields." });
  }

  if (!isValidEmail(replyTo)) {
    return response(400, { error: "Please provide a valid email address." });
  }

  try {
    const apiKey = getEnv("RESEND_API_KEY");
    const recipient = getEnv("CONTACT_TO_EMAIL") || "libracare@outlook.com";
    const fromEnv = sanitize(getEnv("CONTACT_FROM_EMAIL"), 320);
    const from = fromEnv
      ? fromEnv.includes("<")
        ? fromEnv
        : `Libra Care Website <${fromEnv}>`
      : "Libra Care Website <onboarding@resend.dev>";

    if (!apiKey) {
      return response(500, { error: "Mail service is not configured." });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipient,
        subject: enquiryType === "care" ? "New care inquiry" : "New career application",
        text: `Name: ${name}\nReply-to: ${replyTo}\n\n${message}`,
        reply_to: replyTo,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text().catch(() => "");
      return response(502, { error: "Unable to deliver your inquiry right now.", details: errorText });
    }

    return response(200, { ok: true });
  } catch {
    return response(500, { error: "Unable to send your inquiry right now." });
  }
}
