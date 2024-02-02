/**
 * @type {import('@svgr/core').Config}
 */
export default {
  ext: "jsx",
  index: true,
  plugins: ["@svgr/plugin-jsx", "@svgr/plugin-prettier"],
  template: (variables, { tpl }) => {
    return tpl`
${variables.imports};

${variables.interfaces};

/**
 * @param {React.SVGProps<SVGSVGElement>} props
 */
export default function ${variables.componentName}(${variables.props}) {
  return ${variables.jsx}
}
`;
  },
};
