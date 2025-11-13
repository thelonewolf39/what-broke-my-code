import fs from "fs-extra";
import path from "path";

export async function parseLogs() {
  const logDir = path.join(process.cwd(), "sample_logs");
  const logFile = path.join(logDir, "error.log");

  if (!fs.existsSync(logFile)) return "No logs found.";

  const content = await fs.readFile(logFile, "utf-8");
  const errorLines = content.split("\n").filter(line => line.toUpperCase().includes("ERROR"));

  return errorLines.length > 0 ? errorLines.join("\n") : "No errors detected.";
}
