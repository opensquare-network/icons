import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { sourcesEntry } from "./shared.mjs";

gen();

function gen() {
  for (const source of sourcesEntry) {
    // Gen icons

    console.info(`[${source}]`, "generating icons");

    const iconsRes = spawnSync("npx", [
      "@svgr/cli",
      resolve("source", source),
      "--out-dir",
      source,
    ]);

    if (iconsRes.status !== 0) {
      process.exit(iconsRes.status);
    }

    // Compile jsx

    console.info(`[${source}]`, "compiling jsx");

    const compileRes = spawnSync("npx", [
      "tsup",
      source,
      "--out-dir",
      source,
      "--format",
      "esm",
      "--dts",
      "--minify",
      "--loader",
      ".js=jsx",
    ]);
    if (compileRes.status !== 0) {
      process.exit(compileRes.status);
    }
  }
}
