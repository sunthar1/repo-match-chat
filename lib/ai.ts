export type ProviderType = "openai" | "ollama" | "auto";

export type ApiSettings = {
  githubToken?: string;
  provider?: ProviderType;
  apiKey?: string;
  baseUrl?: string;
  model?: string;
};

export type RepoSearchResult = {
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  owner: string;
  topics: string[];
};

export type RankedRepo = RepoSearchResult & {
  score: number;
  reason: string;
};

export function buildGitHubQuery(requirement: string): string {
  const cleaned = requirement
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "starter";

  const tokens = cleaned.split(" ").filter((token) => token.length > 2);
  const preferredLanguage =
    tokens.includes("python")
      ? "python"
      : tokens.includes("javascript") || tokens.includes("node") || tokens.includes("typescript")
        ? "javascript"
        : tokens.includes("go")
          ? "go"
          : tokens.includes("rust")
            ? "rust"
            : "";

  const uniqueKeywords = [...new Set(tokens)].slice(0, 5);
  const userQuery = uniqueKeywords.join(" ");

  return preferredLanguage ? `${userQuery} language:${preferredLanguage}` : userQuery;
}

export async function searchGitHubRepos(
  requirement: string,
  limit = 8,
  settings: ApiSettings = {},
): Promise<RepoSearchResult[]> {
  const query = buildGitHubQuery(requirement);
  const url = new URL("https://api.github.com/search/repositories");
  url.searchParams.set("q", `${query} in:name,description,readme`);
  url.searchParams.set("sort", "stars");
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", String(limit));

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "repo-match-chat/1.0",
  };

  const token = settings.githubToken || process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${text}`);
  }

  const data = (await response.json()) as { items?: any[] };
  const items = data.items || [];

  return items.map((item) => ({
    full_name: item.full_name,
    description: item.description,
    html_url: item.html_url,
    language: item.language,
    stargazers_count: item.stargazers_count || 0,
    owner: item.owner?.login || "unknown",
    topics: Array.isArray(item.topics) ? item.topics : [],
  }));
}

