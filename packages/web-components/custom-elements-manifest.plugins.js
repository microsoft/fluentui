const pascalToKebab = (input) => {
  return input
      .split(/\.?(?=[A-Z])/)
      .join('-')
      .toLowerCase();
};

/**
 * @return {import('@custom-elements-manifest/analyzer').Plugin}
 *
 * This plugin adds the tagName after the manifest has been processed
 * See: https://github.com/webcomponents/custom-elements-manifest/blob/main/schema.json
 */
export function tagNameFix() {
  return {
    name: "fluentTagName",
    packageLinkPhase({customElementsManifest, context}){
      customElementsManifest.modules.map((item) => {
        item.declarations.forEach((declaration) => {
          if (declaration.customElement) {
            declaration.tagName = `fluent-${pascalToKebab(declaration.name)}`;
          }
        })
      });
    },
  };
}
