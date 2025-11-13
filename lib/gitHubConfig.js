import simpleGit from "simple-git";

const git = simpleGit();

export async function detectRepo() {
  try {
    const remotes = await git.getRemotes(true);
    if (!remotes.length) throw new Error("No git remotes found.");

    // pick 'origin' if exists, otherwise first remote
    const origin = remotes.find(r => r.name === "origin") || remotes[0];
    const url = origin.refs.fetch;

    // Example formats:
    // git@github.com:OWNER/REPO.git
    // https://github.com/OWNER/REPO.git
    let match = url.match(/[:/]([\w.-]+)\/([\w.-]+)(\.git)?$/);
    if (!match) throw new Error(`Could not parse GitHub remote URL: ${url}`);

    const owner = match[1];
    const repo = match[2];

    return { owner, repo };
  } catch (err) {
    console.log("❌ Failed to detect repo:", err.message);
    return null;
  }
}
