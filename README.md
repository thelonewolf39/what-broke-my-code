# 🕵️‍♂️ What Broke My Code?
> Your friendly command-line detective for mysterious build failures.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Made with ❤️](https://img.shields.io/badge/made%20with-%E2%9D%A4%EF%B8%8F-red)](#)
[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Build Passing](https://img.shields.io/badge/build-passing-success)](#)

---

## 💡 What is this?

When your code suddenly stops working and you have no idea why, run:

```bash
wbmc
```

and let the **Code Detective** get to work.  
It inspects your repo, recent commits, dependencies, and error logs to tell you *who* (or *what*) broke your build — and *why.*

---

## 🧠 How It Works

`What Broke My Code` runs a quick forensic analysis:

1. 🕵️ Checks your **recent commits** for suspicious diffs  
2. 🧩 Scans **dependencies** for version jumps  
3. ⚙️ Parses **logs** for recurring or new error patterns  
4. 🧮 Scores each suspect by likelihood  
5. 🧾 Prints a human-readable report (with optional sarcasm)

Example:

```
🕵️  What Broke My Code Report

- Build failed: 'Cannot find module src/utils/helpers.js'
- Recent commit "refactor logger" (f2a7c1) touched that file
- Dependency "chalk" updated from 4.1.2 → 5.0.0 (breaking change)

Likely cause: chalk update + refactor conflict

Suggestion: revert chalk to ^4.1.2 or fix import in helpers.js
```

---

## 🚀 Installation

### Using npm
```bash
npm install -g chalk
npm login --registry=https://npm.pkg.github.com
npm install -g @thelonewolf39/what-broke-my-code --registry=https://npm.pkg.github.com
```
You will need a PAT with scopes of read:package.

---

## 🔧 Usage

```bash
wbmc                # run default analysis
wbmc --since 2d     # only check commits from the last 2 days
wbmc --scan logs/   # scan custom log folder
wbmc --fix          # auto-suggest possible quick fixes
wbmc --snark        # enable sarcastic output mode
```

---

## ⚙️ Features

| Feature | Description |
|----------|-------------|
| 🔍 Git Forensics | Analyzes last few commits for breaking changes |
| 📦 Dependency Diff | Detects upgrades or removals that might break things |
| 🧾 Log Parser | Scans build/test logs for new or recurring errors |
| 🧠 Smart Ranking | Scores suspects based on change frequency and severity |
| 💬 Snark Mode | Adds developer-friendly (or unfriendly) commentary |
| 🧰 Offline Friendly | No APIs, no cloud, all local detective work |

---

## 🧩 Future Plans

- [ ] VSCode extension integration  
- [ ] GitHub Action version (`wbmc-action`)  
- [ ] “Blame Friend” feature (tags the teammate who last touched it 😉)  
- [ ] More language parsers (Java, Rust, Go)

---

## 🖼️ Demo

*(coming soon)*  
Include a short GIF or screenshot of the CLI report here once ready.

---

## 🤝 Contributing

PRs are welcome!  
If you’d like to add support for a new language, dependency manager, or log format, just open an issue or submit a pull request.

---

## 📜 License

MIT — do whatever you want, just don’t blame **WBMC** when your code breaks *again.*

---

## 💬 Example Snark Mode Output

```
🕵️ WBMC: You renamed the function and forgot to update the import.
         Again. You absolute menace.
```

---

⭐ **Star this repo** if you’ve ever said “It worked yesterday, I swear.”
