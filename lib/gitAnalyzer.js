import simpleGit from "simple-git";
const git = simpleGit();

export async function analyzeGit() {
  try {
    const log = await git.log({ n: 5 });
    let output = "";
    log.all.forEach(c => {
      output += `- ${c.date} ${c.author_name}: ${c.message}\n`;
    });
    return output || "No recent commits found.";
  } catch (err) {
    return "Git analysis failed: " + err.message;
  }
}
