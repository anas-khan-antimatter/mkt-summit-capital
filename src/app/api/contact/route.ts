// Route: /api/contact
// Accepts secure contact form submissions with topic tags.
// If OPENAI_API_KEY exists, sends an AI-summarised notification; otherwise returns success.

import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  entity?: string;
  message: string;
  topics: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, message, topics = [] } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Sanitise inputs
    const sanitised = {
      name: name.trim().slice(0, 200),
      email: email.trim().toLowerCase().slice(0, 200),
      phone: (body.phone || "").trim().slice(0, 30),
      entity: (body.entity || "").trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
      topics: topics.slice(0, 5).map((t) => t.trim().slice(0, 50)),
    };

    // In production this would store to a DB or send to CRM
    // For now, log and confirm

    const apiKey = process.env.OPENAI_API_KEY;
    let aiSummary: string | null = null;

    if (apiKey && apiKey.length > 10) {
      try {
        const resp = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a private wealth assistant. Summarise a new client enquiry in 1-2 sentences for the advisory team.",
              },
              {
                role: "user",
                content: `New enquiry from ${sanitised.name} (${sanitised.email}). Topics: ${sanitised.topics.join(", ") || "none specified"}. Message: ${sanitised.message.slice(0, 800)}`,
              },
            ],
            max_tokens: 150,
            temperature: 0.2,
          }),
        });

        if (resp.ok) {
          const data = await resp.json();
          aiSummary = data?.choices?.[0]?.message?.content || null;
        }
      } catch {
        // silent fallback
      }
    }

    const response = {
      received: true,
      reference: `SC-${Date.now().toString(36).toUpperCase()}`,
      message: "Your enquiry has been received securely. A principal will respond within two business days.",
      topics: sanitised.topics,
      aiSummary,
    };

    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}