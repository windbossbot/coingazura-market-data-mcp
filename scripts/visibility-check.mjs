import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
const launchGuide = fs.readFileSync(path.join(root, "LAUNCHGUIDE.md"), "utf8");

const checks = [
  {
    name: "package metadata",
    ok: Boolean(packageJson.name && packageJson.version && packageJson.repository?.url && packageJson.homepage)
  },
  {
    name: "npm bin entry",
    ok: Boolean(packageJson.bin?.["coingazura-market-data-mcp"])
  },
  {
    name: "README has install/run/security",
    ok: readme.includes("## Install") && readme.includes("## Run") && readme.includes("## Security Notes")
  },
  {
    name: "launch guide has listing/security/status",
    ok: launchGuide.includes("## Listing Details") &&
      launchGuide.includes("## Security / Safety") &&
      launchGuide.includes("## Status")
  }
];

const failed = checks.filter((check) => !check.ok);

if (failed.length > 0) {
  throw new Error(`Visibility check failed: ${failed.map((check) => check.name).join("; ")}`);
}

console.log(JSON.stringify({ ok: true, checks }, null, 2));
