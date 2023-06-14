import fs from "node:fs";

/**
 * @description `source` folder names
 */
export const sourcesEntry = getSourcesEntry();

/**
 * @returns {string[]}
 */
function getSourcesEntry() {
  const sources = fs.readdirSync("source");
  return sources;
}
