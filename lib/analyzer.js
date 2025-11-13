import chalk from "chalk";
import { fetchRecentCommits, fetchCommitFiles } from "./github.js";
import { parseLogs } from "./logParser.js";
import { checkDeps } from "./depChecker.js";

/**
 * Analyze GitHub repo and local logs, rank likely breaking commits
 */
export async function analyzeRepo(token, owner, repo, branch = "main") {
  let report = "";

  // 1️⃣ Parse local logs
  const logResult = await parseLogs();
  const errorFiles = extractFilesFromLogs(logResult); // array of filenames
  report += chalk.green("📝 Log Analysis:\n") + logResult + "\n";

  // 2️⃣ Fetch recent commits
  const commits = await fetchRecentCommits(owner, repo, token, branch, 10);
  const rankedCommits = [];

  for (const c of commits) {
    const files = await fetchCommitFiles(c.filesChangedUrl, token);
    let score = 0;

    // Increase score for each file mentioned in logs
    files.forEach(f => {
      if (errorFiles.includes(f)) score += 5;
      if (f === "package.json") score += 2; // dependency changes
    });

    rankedCommits.push({ ...c, files, score });
  }

  rankedCommits.sort((a, b) => b.score - a.score);

  // 3️⃣ Generate commit report
  report += chalk.green("\n🔍 Likely Breaking Commits:\n");
  rankedCommits.forEach(c => {
    report += `- ${c.date} ${c.author}: ${c.message} (score: ${c.score})\n`;
    if (c.files.length > 0) report += `  Files changed: ${c.files.join(", ")}\n`;
    report += `  Link: https://github.com/${owner}/${repo}/commit/${c.sha}\n\n`;
  });

  // 4️⃣ Dependency check
  const depResult = await checkDeps();
  report += chalk.green("📦 Dependencies:\n") + depResult + "\n";

  // 5️⃣ Snarky detective note
  const snark = [
    "I think this commit is guilty.",
    "Someone broke the build again.",
    "Check the files mentioned above — classic mistake.",
    "Blame the last person who touched package.json."
  ];
  report += chalk.magenta("\n🕵️ Detective Note: ") + snark[Math.floor(Math.random() * snark.length)];

  return report;
}

/**
 * Extract filenames/modules from log lines mentioning ERROR
 * Example: "ERROR in src/utils/helpers.js: something broke"
 */
function extractFilesFromLogs(logContent) {
  const files = [];
  const lines = logContent.split("\n");
  lines.forEach(line => {
    if (line.toUpperCase().includes("ERROR")) {
      const match = line.match(/([\/\w.-]+\.\w+)/); // crude file path match
      if (match) files.push(match[1]);
    }
  });
  return files;
}
