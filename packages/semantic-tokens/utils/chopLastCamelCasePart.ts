export const chopLastCamelCasePart = (str: string): string => {
  // Handle all camel case including multiple capital letters (i.e. ctrlComposerInputShadowXOffset -> ctrlComposerInputShadowX)
  const matches = str.match(/([A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+)/g);
  if (!matches || matches.length <= 1) return str;
  return matches.slice(0, -1).join('');
};
