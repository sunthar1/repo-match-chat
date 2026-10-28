"use client";

import { FormEvent, useState } from "react";

type Repo = {
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  score?: number;
  reason?: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  repos?: Repo[];
  keywords?: string[];
};

const starterPrompt =
  "I need a React dashboard with authentication, charts, and a clean admin UI for a SaaS app.";

export default function HomePage() {
  const [input, setInput] = useState(starterPrompt);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "I can look through GitHub repositories and rank the best matches for your project requirements.",
      keywords: ["React", "dashboard", "auth", "charts", "SaaS"],
      repos: [],
    },
  ]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = input.trim();
    if (!value || loading) return;

    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: value }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: value }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.summary || "Here are the best repo matches.",
          repos: data.repos || [],
          keywords: data.keywords || [],
        },
      ]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to find matching repositories.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I hit an error: ${message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="app-card">
        <div className="topbar">
          <div>
            <p className="eyebrow">AI repo discovery</p>
            <h1>Repo Match Chat</h1>
          </div>
          <div className="tag-group">
            <span>GitHub connector</span>
            <span>OpenAI / Ollama</span>
          </div>
        </div>

        <div className="chat-window">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`message ${message.role}`}>
              <div className="bubble">
                <p>{message.content}</p>

                {message.keywords && message.keywords.length > 0 && (
                  <div className="keyword-row">
                    {message.keywords.map((keyword) => (
                      <span key={keyword} className="keyword-pill">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}

                {message.repos && message.repos.length > 0 && (
                  <div className="repo-list">
                    {message.repos.map((repo) => (
                      <a
                        key={repo.full_name}
                        className="repo-card"
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="repo-header">
                          <div>
                            <strong>{repo.full_name}</strong>
                            <div className="meta-row">
                              <span>{repo.language || "Unknown"}</span>
                              <span>★ {repo.stargazers_count}</span>
                            </div>
                          </div>
                          {typeof repo.score === "number" && (
                            <span className="score-badge">{repo.score}%</span>
                          )}
                        </div>

                        <p>{repo.description || "No description available."}</p>
                        {repo.reason && <small>{repo.reason}</small>}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="composer">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder="Describe the project you need, for example: 'I need a Python service with Stripe billing and a React frontend'"
          />
          <div className="controls">
            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Find matching repos"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
