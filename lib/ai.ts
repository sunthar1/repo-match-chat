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

function extractKeywords(requirement: string): string[] {
  const cleaned = requirement
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const tokens = cleaned.split(" ").filter((token) => token.length > 2);
  return [...new Set(tokens)].slice(0, 6);
}

export function buildGitHubQuery(requirement: string): string {
  const keywords = extractKeywords(requirement);
  if (!keywords.length) return "open source";

  const preferredLanguage =
    keywords.includes("python")
      ? "python"
      : keywords.includes("javascript") || keywords.includes("node") || keywords.includes("typescript")
        ? "javascript"
        : keywords.includes("go")
          ? "go"
          : keywords.includes("rust")
            ? "rust"
            : "";

  const baseQuery = keywords.join(" ");
  return preferredLanguage ? `${baseQuery} language:${preferredLanguage}` : baseQuery;
}

export async function searchGitHubRepos(requirement: string, limit = 6): Promise<RepoSearchResult[]> {
  const query = buildGitHubQuery(requirement);
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+in:name,description,readme&sort=stars&order=desc&per_page=${limit}`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "repo-match-chat/1.0",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, {
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
