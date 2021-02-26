import { compile, middleware, prefixer, rulesheet, serialize, stringify } from 'stylis';
import { hyphenateProperty } from './utils/hyphenateProperty';

interface CompileCSSOptions {
  className: string;

  pseudo: string;
  media: string;
  support: string;

  property: string;
  value: number | string;

  unstable_cssPriority: number;
}

function repeatSelector(selector: string, times: number) {
  return new Array(times + 2).join(selector);
}

export function compileCSSRule(cssRule: string): string {
  return serialize(compile(cssRule), middleware([prefixer, stringify]));
}

export function compileCSSRules(cssRules: string): string[] {
  const rules: string[] = [];

  serialize(
    compile(cssRules),
    middleware([
      prefixer,
      stringify,

      // 💡 we are using `.insertRule()` API for DOM operations, which does not support
      // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
      // individual rules to be used with this API
      rulesheet(rule => rules.push(rule)),
    ]),
  );

  return rules;
}

export function compileCSS(options: CompileCSSOptions): string {
  const { className, media, pseudo, support, property, value, unstable_cssPriority } = options;

  const cssDeclaration = `{ ${hyphenateProperty(property)}: ${value}; }`;

  // Should be handled by namespace plugin of Stylis, is buggy now
  // Issues are reported:
  // https://github.com/thysultan/stylis.js/issues/253
  // https://github.com/thysultan/stylis.js/issues/252
  if (pseudo.indexOf(':global(') === 0) {
    const globalSelector = /global\((.+)\)/.exec(pseudo)?.[1];
    const shouldIncludeClassName = pseudo.indexOf('&') === pseudo.length - 1;

    // TODO: should we support case when className is not included
    // given same functionality is supported by `makeStaticStyles`?
    const cssRule = shouldIncludeClassName
      ? `${globalSelector} { .${className} ${cssDeclaration} }`
      : `${globalSelector} ${cssDeclaration}`;

    return serialize(compile(cssRule), middleware([stringify]));
  } else {
    const classNameSelector = repeatSelector(`.${className}`, unstable_cssPriority);
    let cssRule = `${classNameSelector}${pseudo} ${cssDeclaration}`;

    if (media) {
      cssRule = `@media ${media} { ${cssRule} }`;
    }

    if (support) {
      cssRule = `@supports ${support} { ${cssRule} }`;
    }

    return compileCSSRule(cssRule);
  }
}
