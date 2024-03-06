import { spawnSync } from "node:child_process";
import { resolve, basename } from "node:path";
import { jsxDir, srcEntries, svgDir } from "./shared.mjs";
import fg from "fast-glob";
import { writeFileSync } from "node:fs";

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
      console.error(iconsRes.stderr.toString());
      process.exit(iconsRes.status);
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
      console.error(compileRes.stderr.toString());
      process.exit(compileRes.status);
    }

    // HACK: force override `{set}/index.d.ts`
    // did not know why the first file ignored
    console.info(`[${set}]`, "overriding `index.d.ts`");

    const dtsFiles = fg.sync("**/*.d.ts", {
      cwd: set,
      ignore: ["index.d.ts"],
    });
    const dtsString =
      dtsFiles
        .map((filename) => {
          const dtsExtname = ".d.ts";
          const name = basename(filename, dtsExtname);

          return `export { default as ${name} } from './${name}.js';`;
        })
        .join("\n") + `\nimport 'react'`;

    writeFileSync(resolve(set, "index.d.ts"), dtsString, "utf8");
  }
}
