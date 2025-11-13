#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { analyzeRepo } from "../lib/analyzer.js";
import { detectRepo } from "../lib/gitHubConfig.js";

const configDir = path.join(process.env.HOME || process.env.USERPROFILE, ".wbmc");
const configFile = path.join(configDir, "config.json");

async function getGitHubToken() {
  if (fs.existsSync(configFile)) {
    const data = await fs.readJson(configFile);
    if (data.token) return data.token;
  }

  console.log(chalk.yellow("🚨 GitHub PAT not found."));
  const answers = await inquirer.prompt([
    { type: "input", name: "token", message: "Enter your GitHub Personal Access Token (PAT):" }
  ]);

  await fs.ensureDir(configDir);
  await fs.writeJson(configFile, { token: answers.token }, { spaces: 2 });
  return answers.token;
}

async function main() {
  console.log(chalk.blue("🕵️  What Broke My Code - Detective Mode"));

  const token = await getGitHubToken();
  let owner, repo;

  const detected = await detectRepo();
  if (detected) {
    owner = detected.owner;
    repo = detected.repo;
    console.log(chalk.green(`✅ Detected GitHub repo: ${owner}/${repo}`));
  } else {
    // fallback to user input
    const answers = await inquirer.prompt([
      { type: "input", name: "owner", message: "GitHub repo owner:" },
      { type: "input", name: "repo", message: "GitHub repo name:" }
    ]);
    owner = answers.owner;
    repo = answers.repo;
  }

  const report = await analyzeRepo(token, owner, repo);

  console.log(chalk.cyan("\n--- Detective Report ---\n"));
  console.log(report);
}

main();
