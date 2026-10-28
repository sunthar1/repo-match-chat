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

export async function searchGitHubRepos(requirement: string, limit = 6): Promise<RepoSearchResult[]> {
  const query = buildGitHubQuery(requirement);
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+in:name,description,readme&sort=stars&order=desc&per_page=${limit}`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "repo-match-chat/1.0",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 },
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
