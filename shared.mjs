import fs from "node:fs";
import { resolve } from "node:path";

export const srcDir = resolve("src");
export const svgDir = resolve("svg");
export const jsxDir = resolve("jsx");

export const srcEntries = getSrcEntries();

export const transformIgnoreStartsWith = [
  "signal",
  "identity",
  "logo",
  "project",
  "network",
  "wallet",
  "badge",
  "footer",
  "product",
  "chain",
  "placeholder",
];

export const transformColors = {
  "#1e2134": "currentColor",
  "#1E2134": "currentColor",
  "#101828": "currentColor",
};

/**
 * @returns {string[]}
 */
function getSrcEntries() {
  const sources = fs.readdirSync("src");
  return sources.filter((name) => name !== ".DS_Store");
}
