import fs from "fs-extra";
import path from "path";

export async function checkDeps() {
  const pkgPath = path.join(process.cwd(), "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    const deps = Object.entries(pkg.dependencies || {});
    if (deps.length === 0) return "No dependencies found.";
    return deps.map(([name, version]) => {
      // simulate detecting an update
      const updated = Math.random() > 0.7 ? " (recently updated!)" : "";
      return `- ${name}: ${version}${updated}`;
    }).join("\n");
  }
  return "No package.json found.";
}
