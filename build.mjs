import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { jsxDir, srcEntries, svgDir } from "./shared.mjs";

gen();

function gen() {
  for (const set of srcEntries) {
    const svgPath = resolve(svgDir, set);
    const jsxPath = resolve(jsxDir, set);

    // Gen icons

    console.info(`[${set}]`, "generating icons");

    const iconsRes = spawnSync("npx", [
      "@svgr/cli",
      svgPath,
      "--out-dir",
      // jsx,
      jsxPath,
    ]);

    if (iconsRes.status !== 0) {
      process.exit(transformRes.status);
    }

    // Compile jsx

    console.info(`[${set}]`, "compiling jsx");

    const compileRes = spawnSync("npx", [
      "tsup",
      // jsx,
      jsxPath,
      "--out-dir",
      set,
      "--format",
      "esm",
      "--dts",
      "--minify",
      "--clean",
    ]);
    if (compileRes.status !== 0) {
      process.exit(compileRes.status);
    }
  }
}
