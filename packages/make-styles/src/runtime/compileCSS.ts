import { hyphenateProperty } from './utils/hyphenateProperty';
import { normalizeNestedProperty } from './utils/normalizeNestedProperty';
import { compileCSSRules } from './compileCSSRules';

export interface CompileCSSOptions {
  className: string;

  pseudo: string;
  media: string;
  support: string;

  property: string;
  value: number | string;
  unstable_cssPriority: number;

  rtlClassName?: string;
  rtlProperty?: string;
  rtlValue?: number | string;
}

function repeatSelector(selector: string, times: number) {
  return new Array(times + 2).join(selector);
}

export function compileCSS(options: CompileCSSOptions): [string /* ltr definition */, string? /* rtl definition */] {
  const {
    className,
    media,
    pseudo,
    support,
    property,
    rtlClassName,
    rtlProperty,
    rtlValue,
    value,
    unstable_cssPriority,
  } = options;

  const classNameSelector = repeatSelector(`.${className}`, unstable_cssPriority);
  const cssDeclaration = `{ ${hyphenateProperty(property)}: ${value}; }`;

  let rtlClassNameSelector: string | null = null;
  let rtlCSSDeclaration: string | null = null;

  if (rtlProperty && rtlClassName) {
    rtlClassNameSelector = repeatSelector(`.${rtlClassName}`, unstable_cssPriority);
    rtlCSSDeclaration = `{ ${hyphenateProperty(rtlProperty)}: ${rtlValue}; }`;
  }

  let cssRule = '';

  // Should be handled by namespace plugin of Stylis, is buggy now
  // Issues are reported:
  // https://github.com/thysultan/stylis.js/issues/253
  // https://github.com/thysultan/stylis.js/issues/252
  if (pseudo.indexOf(':global(') === 0) {
    // 👇 :global(GROUP_1)GROUP_2
    const GLOBAL_PSEUDO_REGEX = /global\((.+)\)(.+)?/;
    const [, globalSelector, restPseudo = ''] = GLOBAL_PSEUDO_REGEX.exec(pseudo)!;

    // should be normalized to handle ":global(SELECTOR) &"
    const normalizedPseudo = normalizeNestedProperty(restPseudo.trim());

    const ltrRule = `${classNameSelector}${normalizedPseudo} ${cssDeclaration}`;
    const rtlRule = rtlProperty ? `${rtlClassNameSelector}${normalizedPseudo} ${rtlCSSDeclaration}` : '';

    cssRule = `${globalSelector} { ${ltrRule}; ${rtlRule} }`;
  } else {
    cssRule = `${classNameSelector}${pseudo} ${cssDeclaration};`;

    if (rtlProperty) {
      cssRule = `${cssRule}; ${rtlClassNameSelector}${pseudo} ${rtlCSSDeclaration};`;
    }
  }

  if (media) {
    cssRule = `@media ${media} { ${cssRule} }`;
  }

  if (support) {
    cssRule = `@supports ${support} { ${cssRule} }`;
  }

  return compileCSSRules(cssRule) as [string, string?];
}
