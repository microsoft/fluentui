import { compile, middleware, serialize, stringify } from 'stylis';
import { hyphenateProperty } from './utils/hyphenateProperty';

interface CompileCSSOptions {
  className: string;

  pseudo: string;
  media: string;
  support: string;

  property: string;
  value: number | string;
}

export function compileCSS(options: CompileCSSOptions): string {
  const { className, media, pseudo, support, property, value } = options;

  const cssDeclaration = `{ ${hyphenateProperty(property)}: ${value}; }`;

  // Should be handled by namespace plugin of Stylis, is buggy now
  // Issues are reported:
  // https://github.com/thysultan/stylis.js/issues/253
  // https://github.com/thysultan/stylis.js/issues/252
  if (pseudo.indexOf(':global(') === 0) {
    const globalSelector = /global\((.+)\)/.exec(pseudo)?.[1];
    const shouldIncludeClassName = pseudo.indexOf('&') === pseudo.length - 1;

    const cssRule = shouldIncludeClassName
      ? `${globalSelector} { .${className} ${cssDeclaration} }`
      : `${globalSelector} ${cssDeclaration}`;

    return serialize(compile(cssRule), middleware([stringify]));
  } else {
    let cssRule = `.${className}${pseudo} ${cssDeclaration}`;

    if (media) {
      cssRule = `@media ${media} { ${cssRule} }`;
    }

    if (support) {
      cssRule = `@supports ${support} { ${cssRule} }`;
    }

    return serialize(compile(cssRule), middleware([stringify]));
  }
}
