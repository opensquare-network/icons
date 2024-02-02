import fs from "node:fs";
import path from "node:path";
import {
  srcDir,
  srcEntries,
  svgDir,
  transformColors,
  transformIgnoreStartsWith,
} from "../shared.mjs";
import fg from "fast-glob";

transform();

function transform() {
  for (const set of srcEntries) {
    console.info(`[${set}]`, "transform svg currentColor");

    const srcSetPath = path.resolve(srcDir, set);
    const svgSetPath = path.resolve(svgDir, set);

    fs.mkdirSync(svgSetPath, { recursive: true });

    const fileObjs = fg.sync("**/*.svg", { cwd: srcSetPath, objectMode: true });

    for (const fileObj of fileObjs) {
      const filename = fileObj.name;
      const srcFilePath = path.resolve(srcDir, set, filename);
      const svgFilePath = path.resolve(svgDir, set, filename);

      if (
        transformIgnoreStartsWith.some((prefix) =>
          filename.toLowerCase().startsWith(prefix),
        )
      ) {
        fs.copyFileSync(srcFilePath, svgFilePath);
      } else {
        let res = fs.readFileSync(srcFilePath, "utf-8");

        Object.entries(transformColors).forEach(([from, to]) => {
          res = res.replaceAll(from, to);
        });

        fs.writeFileSync(svgFilePath, res);
      }
    }
  }
}
