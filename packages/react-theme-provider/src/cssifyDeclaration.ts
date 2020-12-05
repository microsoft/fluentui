const uppercasePattern = /[A-Z]/g;
const msPattern = /^ms-/;
const cache: Record<string, string> = {};

function toHyphenLower(match: string): string {
  return '-' + match.toLowerCase();
}

function hyphenateProperty(name: string) {
  if (cache.hasOwnProperty(name)) {
    return cache[name];
  }

  const hName = name.replace(uppercasePattern, toHyphenLower);
  return (cache[name] = msPattern.test(hName) ? '-' + hName : hName);
}

export function cssifyDeclaration(property: string, value: string | number) {
  return hyphenateProperty(property) + ':' + value;
}
