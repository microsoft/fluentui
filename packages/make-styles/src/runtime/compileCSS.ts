import { compile, middleware, serialize, stringify } from 'stylis';
import { hyphenateProperty } from './utils/hyphenateProperty';

export function compileCSS(className: string, selector: string, property: string, value: number | string): string {
  const cssDeclaration = `{ ${hyphenateProperty(property)}: ${value}; }`;

  // Should be handled by namespace plugin of Stylis, is buggy now
  // Issues are reported:
  // https://github.com/thysultan/stylis.js/issues/253
  // https://github.com/thysultan/stylis.js/issues/252
  if (selector.indexOf(':global(') === 0) {
    const globalSelector = /global\((.+)\)/.exec(selector)?.[1];
    const shouldIncludeClassName = selector.indexOf('&') === selector.length - 1;

    const cssRule = shouldIncludeClassName
      ? `${globalSelector} { .${className} ${cssDeclaration} }`
      : `${globalSelector} ${cssDeclaration}`;

    return serialize(compile(cssRule), middleware([stringify]));
  } else {
    const cssRule = `.${className} { ${selector || '&'} ${cssDeclaration} }`;

    return serialize(compile(cssRule), middleware([stringify]));
  }
}
