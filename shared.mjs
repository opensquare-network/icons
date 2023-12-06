import fs from "node:fs";

/**
 * @description `source` folder names
 */
export const srcEntries = getSrcEntries();

/**
 * @returns {string[]}
 */
function getSrcEntries() {
  const sources = fs.readdirSync("src");
  return sources.filter((name) => name !== ".DS_Store");
}
