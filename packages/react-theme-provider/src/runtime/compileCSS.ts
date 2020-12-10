// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { compile, middleware, serialize, stringify } from 'stylis';

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

  // TODO: ensure how it works
  // if property is CSS variables, do not hyphenate it

  const hName = name.replace(uppercasePattern, toHyphenLower);
  return (cache[name] = msPattern.test(hName) ? '-' + hName : hName);
}

export function compileCSS(className: string, selector: string, property: string, value: number | string): string {
  const cssDeclaration = `{ ${hyphenateProperty(property)}: ${value}; }`;

  // Should be handled by namespace plugin of Stylis, is buggy now
  // Issues are reported:
  // https://github.com/thysultan/stylis.js/issues/253
  // https://github.com/thysultan/stylis.js/issues/252
  if (selector.indexOf(':global(') === 0) {
    const globalSelector = /global\((.+)\)/.exec(selector)?.[1];
    const shouldIncludeClassName = selector.indexOf('&') === selector.length - 1;

    const css = shouldIncludeClassName
      ? `${globalSelector} { .${className} ${cssDeclaration} }`
      : `${globalSelector} ${cssDeclaration}`;

    return serialize(compile(css), middleware([stringify]));
  }

  const resolvedCss = `.${className}${selector} ${cssDeclaration}`;

  return serialize(compile(resolvedCss), middleware([stringify]));
}
