import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const sources = ["subsquare"];

const resolveSource = (s) => resolve("source", s);

gen();

function gen() {
  for (const source of sources) {
    // Gen icons

    console.info(`[${source}]`, "generating icons");

    const iconsRes = spawnSync("npx", [
      "@svgr/cli",
      resolveSource(source),
      "--out-dir",
      source,
    ]);

    if (iconsRes.status !== 0) {
      process.exit(iconsRes.status);
    }

    // Gen types

    console.info(`[${source}]`, "generating types");

    const typesRes = spawnSync("tsc", [
      `${source}/index.js`,
      "--declaration",
      "--emitDeclarationOnly",
      "--allowJs",
      "--lib",
      "es2015",
    ]);
    if (typesRes.status !== 0) {
      process.exit(typesRes.status);
    }
  }
}
