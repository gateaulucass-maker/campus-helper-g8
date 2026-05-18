// Vercel serverless function — proxy vers OpenAI Chat Completions
// La clé est lue depuis process.env.OPENAI_API_KEY (configurée dans Vercel, jamais commit)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY missing in env" });
  }

  const { messages, systemPrompt } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required" });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.85,
        max_tokens: 200,
        messages: [
          { role: "system", content: systemPrompt || "Tu es un·e étudiant·e bordelais·e sympa. Réponds en français, court, chaleureux." },
          ...messages,
        ],
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      return res.status(openaiRes.status).json({ error: errText });
    }

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "Hmm…";

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}
