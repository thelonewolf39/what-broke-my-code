import fetch from "node-fetch";

export async function fetchRecentCommits(owner, repo, token, branch = "main", per_page = 5) {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}&per_page=${per_page}`;

  const res = await fetch(url, {
    headers: { Authorization: `token ${token}` }
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);

  const commits = await res.json();
  return commits.map(c => ({
    sha: c.sha,
    message: c.commit.message,
    author: c.commit.author.name,
    date: c.commit.author.date,
    filesChangedUrl: c.url // later used to fetch changed files
  }));
}

// Optional: fetch changed files per commit
export async function fetchCommitFiles(url, token) {
  const res = await fetch(url, { headers: { Authorization: `token ${token}` } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.files.map(f => f.filename);
}
