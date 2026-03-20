export async function submitInquiry(payload) {
  const response = await fetch("/.netlify/functions/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Unable to send your inquiry right now.");
  }

  return data;
}
