import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { rankReposAgainstRequirement } from "@/lib/ai";
import { searchGitHubRepos } from "@/lib/github";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = (body?.message || "").trim();
    const settings = body?.settings || {};

    if (!message) {
      return NextResponse.json({ error: "A requirement is required." }, { status: 400 });
    }

    const repos = await searchGitHubRepos(message, 8, settings);
    const ranked = await rankReposAgainstRequirement(message, repos, settings);

    return NextResponse.json({
      summary: ranked.summary,
      keywords: ranked.keywords,
      repos: ranked.repos,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to match repositories.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

