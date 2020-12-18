import hashString from '@emotion/hash';
import { Properties as CSSProperties } from 'csstype';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { expand } from 'inline-style-expand-shorthand';
import { convertProperty } from 'rtl-css-js/core';

import { css, getDocument, getWindow } from '@fluentui/utilities';
import { compileCSS } from './runtime/compileCSS';
import { insertStyles } from './insertStyles';
import { tokensToStyleObject } from './tokensToStyleObject';

import {
  makeStyles as makeNonReactStyles,
  MakeStylesDefinition,
  MakeStylesOptions as MakeNonReactStylesOptions,
  MakeStylesRenderer,
  MakeStylesStyleRule,
} from '@fluentui/make-styles';
import { Theme } from './types';
import { useTheme } from './useTheme';

//
//
//

export type Renderer = {
  cache: Record<string, [string, string]>;
  node: HTMLStyleElement;
  index: number;
};
const targets = new WeakMap<Document, Renderer>();

export function createTarget(targetDocument: Document): Renderer {
  let target = targets.get(targetDocument);

  if (target) {
    return target;
  }

  const node = targetDocument.createElement('style');

  node.setAttribute('FCSS', 'RULE');
  targetDocument.head.appendChild(node);

  target = { cache: {}, node, index: 0 };

  targets.set(targetDocument, target);

  return target;
}

//
//
//

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObject(val: any) {
  // eslint-disable-next-line eqeqeq
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

//
//
//

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let window: any;
if (window === undefined) {
  window = getWindow();
}
const canUseCSSVariables = window && window.CSS && CSS.supports('color', 'var(--c)');

//
// IE11 specific
//

// Create graph of inputs to map to output.
const graph = new Map();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphGet = (graphNode: Map<any, any>, path: any[]): any | undefined => {
  for (const key of path) {
    graphNode = graphNode.get(key);

    if (!graphNode) {
      return;
    }
  }

  return graphNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphSet = (graphNode: Map<any, any>, path: any[], value: any) => {
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];

    let current = graphNode.get(key);

    if (!current) {
      current = new Map();

      graphNode.set(key, current);
    }

    graphNode = current;
  }

  graphNode.set(path[path.length - 1], value);
};

//
//
//

const regex = /^(:|\[|>|&)/;

export default function isNestedSelector(property: string): boolean {
  return regex.test(property);
}

function normalizeNestedProperty(nestedProperty: string): string {
  if (nestedProperty.charAt(0) === '&') {
    return nestedProperty.slice(1);
  }

  return nestedProperty;
}

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function createCSSVariablesProxy(tokens: any) {
//   const g = {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     get(target: any, key: any) {
//       if (isObject(target[key])) {
//         return new Proxy({ ...target[key], value: (target.value ?? '') + '-' + key }, g);
//       }

//       return `var(--theme${target.value ?? ''}-${key})`;
//     },
//   };

//   return new Proxy(tokens, g);
// }

const HASH_PREFIX = 'a';

//
//
//

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveStyles(styles: any[], selector = '', result: any = {}): any {
  const expandedStyles = expand(styles);
  const properties = Object.keys(expandedStyles) as (keyof CSSProperties)[];

  properties.forEach(propName => {
    const propValue = expandedStyles[propName];

    // eslint-disable-next-line eqeqeq, no-empty
    if (propValue == null) {
    } else if (isObject(propValue)) {
      if (isNestedSelector(propName)) {
        // console.log(
        //   'nested selectors',
        //   propName,
        //   propValue,
        // );
        resolveStyles(propValue, selector + normalizeNestedProperty(propName), result);
      }
      // TODO: support media queries
      // TODO: support support queries
    } else if (typeof propValue === 'string' || typeof propValue === 'number') {
      const className = HASH_PREFIX + hashString(selector + propName + propValue);
      const compiledCss = compileCSS(className, selector, propName, propValue);

      // uniq key based on property & selector, used for merging later
      const key = selector + propName;

      // TODO: what can actually flip in RTL?!
      const rtl = convertProperty(propName, propValue);
      const flippedInRtl = rtl.key !== propName || rtl.value !== propValue;

      if (flippedInRtl) {
        const rtlCSS = compileCSS('r' + className, selector, rtl.key, rtl.value);

        // There is no sense to store RTL className as it's "r" + regular className
        result[key] = [className, compiledCss, rtlCSS];
      } else {
        result[key] = [className, compiledCss];
      }

      // console.log('EVAL', selector, propName, propValue);
      // console.log('KEY', key);
      // console.log('CSS', css);

      // }
    }
  });

  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function matchersToBits(definitions: any, matchers: any) {
  if (!definitions.mapping) {
    let i = 0;
    definitions.mapping = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    definitions.forEach((definition: any) => {
      const definitionMatchers = definition[0];

      if (definitionMatchers === null) {
        return null;
      }

      Object.keys(definitionMatchers).forEach(matcherName => {
        const matcherValue = definitionMatchers[matcherName];
        const maskKey = '' + matcherName + matcherValue;

        // eslint-disable-next-line no-bitwise
        definitions.mapping[maskKey] = 1 << i;
        i++;
      });
    }, {});
  }

  if (matchers === null) {
    return 0;
  }

  return selectorsToBits(definitions.mapping, matchers);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function selectorsToBits(mapping: any, selectors: any): number {
  let mask = 0;

  // eslint-disable-next-line guard-for-in
  for (const selectorName in selectors) {
    const selectorValue = selectors[selectorName];
    const selectorInBits = mapping['' + selectorName + selectorValue];

    mask += selectorInBits || 0; // can be undefined
  }

  return mask;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveStylesToClasses(definitions: any[], tokens: any) {
  const resolvedStylesToClasses = definitions.map((definition, i) => {
    // console.log(definition);
    const matchers = definition[0];
    const styles = definition[1];
    const resolvedStyles = definition[2];

    const areTokenDependantStyles = typeof styles === 'function';

    if (canUseCSSVariables) {
      // we can always use prebuilt styles in this case and static cache in runtime

      if (resolvedStyles) {
        return [matchers, null, resolvedStyles];
      }

      // matchers should be also converted to bit masks
      definitions[i][0] = matchersToBits(definitions, matchers);

      // if static cache is not present, eval it and mutate original object
      definitions[i][2] = resolveStyles(areTokenDependantStyles ? styles(tokens) : styles);

      return [definition[0], null, definition[2]];
    }

    // if CSS variables are not supported we have to re-eval only functions, otherwise static cache can be reused
    if (areTokenDependantStyles) {
      // An additional level of cache based on tokens to avoid style computation for IE11

      const path = [tokens, styles];
      const ie11ResolvedStyles = graphGet(graph, path);

      if (ie11ResolvedStyles) {
        return [matchers, ie11ResolvedStyles];
      }

      // matchers should be also converted to bit masks
      definitions[i][0] = matchersToBits(definitions, matchers);

      const innerIe11ResolvedStyles = resolveStyles(styles(tokens));
      graphSet(graph, path, innerIe11ResolvedStyles);

      return [definitions[i][0], null, innerIe11ResolvedStyles];
    }

    if (resolvedStyles) {
      return [definitions[i][0], null, resolvedStyles];
    }

    // matchers should be also converted to bit masks
    definitions[i][0] = matchersToBits(definitions, matchers);
    definitions[i][2] = resolveStyles(styles);

    return [definitions[i][0], null, definition[2]];
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  resolvedStylesToClasses.mapping = definitions.mapping;

  return resolvedStylesToClasses;
}

/**
 * TODO: Update it with something proper...
 * CAN WORK WITHOUT REACT!
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makePrevNonReactStyles(styles: any) {
  const cxCache: Record<string, string> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/naming-convention
  return function ___(selectors: any, options: any, ...classNames: (string | undefined)[]): string {
    // If CSS variables are present we can use CSS variables proxy like in build time

    let tokens;
    let resolvedStyles;

    if (process.env.NODE_ENV === 'production') {
      tokens = canUseCSSVariables ? null : options.tokens;
      resolvedStyles = canUseCSSVariables ? styles : resolveStylesToClasses(styles, tokens);
    } else {
      tokens = options.tokens; // canUseCSSVariables ? createCSSVariablesProxy(options.tokens) : options.tokens;
      resolvedStyles = resolveStylesToClasses(styles, tokens);
    }

    // Dumper for static styles
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // console.log(JSON.stringify(resolvedStyles.map(d => [d[0], null, d[1]])));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // console.log(JSON.stringify(resolvedStyles.mapping));

    let nonMakeClasses: string = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const overrides: any = {};
    let overridesCx = '';

    classNames.forEach(className => {
      if (typeof className === 'string') {
        className.split(' ').forEach(cName => {
          if (options.target.cache[cName] !== undefined) {
            overrides[options.target.cache[cName][0]] = options.target.cache[cName][1];
            overridesCx += ' ' + cName;
          } else {
            nonMakeClasses += ' ' + cName;
          }
        });
      }
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const selectorsMask = selectorsToBits(resolvedStyles.mapping, selectors);

    const overridesHash = overridesCx === '' ? '' : overridesCx;
    const cxCacheKey = selectorsMask + '' + overridesHash;

    if (canUseCSSVariables && cxCache[cxCacheKey] !== undefined) {
      // TODO: OOPS, Does not support MW
      return nonMakeClasses + ' ' + cxCache[cxCacheKey];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchedDefinitions = resolvedStyles.reduce((acc: any, definition: any) => {
      const matchersInBits = definition[0];

      // eslint-disable-next-line no-bitwise
      if (matchersInBits === 0 || (!!(matchersInBits & selectorsMask) && selectorsMask >= matchersInBits)) {
        acc.push(definition[2]);
      }

      return acc;
    }, []);

    const resultDefinitions = Object.assign({}, ...matchedDefinitions, overrides);
    const resultClasses = nonMakeClasses + insertStyles(resultDefinitions, options.rtl, options.target);

    cxCache[cxCacheKey] = resultClasses;

    return resultClasses;
  };
}

let document: Document | undefined;
if (document === undefined) {
  document = getDocument();
}
let defaultTarget: Renderer;
if (document) {
  defaultTarget = createTarget(document);
}

export interface PrevMakeStylesOptions {
  classNames?: (string | undefined)[];
  componentName?: string;
}

/*
 * A wrapper to connect to a React context. SHOULD USE unified context!!!
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makePrevStyles(styles: any) {
  const resolvedStyles = makePrevNonReactStyles(styles);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/naming-convention
  return function ___(selectors: any = {}, styleOptions: PrevMakeStylesOptions = {}): string {
    const { components = {}, effects, fonts, palette, rtl, semanticColors, tokens } = useTheme();
    const { classNames = [], componentName } = styleOptions;
    let resolvedVariantStyles;

    // Evaluate variants if they exist for the current component
    if (componentName && components[componentName]) {
      const { variants } = components[componentName];
      if (variants) {
        const prefix = '--' + componentName.toLowerCase();
        const variantStyles = [];

        for (const variant in variants) {
          // Account for changing default variant
          if (variant === 'root') {
            variantStyles.push([null, tokensToStyleObject(variants[variant], prefix)]);
          } else {
            variantStyles.push([{ variant: variant }, tokensToStyleObject(variants[variant], prefix)]);
          }
        }

        resolvedVariantStyles = makePrevNonReactStyles(variantStyles);
      }
    }

    const result = css(
      resolvedStyles(
        selectors,
        { rtl, tokens: { effects, fonts, palette, semanticColors, ...tokens }, target: defaultTarget },
        ...(classNames || []),
      ),
      resolvedVariantStyles &&
        resolvedVariantStyles(selectors, {
          rtl,
          tokens: { effects, fonts, palette, semanticColors, ...tokens },
          target: defaultTarget,
        }),
    );

    return result;
  };
}

export type MakeStylesOptions<Tokens> = Omit<MakeNonReactStylesOptions<Tokens>, 'renderer'> & {
  componentName?: string;
};

const renderer: MakeStylesRenderer = {
  id: 'renderer',
  insertDefinitions: insertStyles,
};

export function makeStyles<Selectors, Tokens>(definitions: MakeStylesDefinition<Selectors, Tokens>[]) {
  // const computeClasses = makeNonReactStyles(definitions);

  const resolvedStyles = makeNonReactStyles<Selectors, Tokens | Theme>(definitions);

  return function useClasses(
    selectors: Selectors,
    options: MakeStylesOptions<Tokens | Theme>,
    ...classNames: (string | undefined)[]
  ) {
    const { components = {}, effects, fonts, palette, rtl, semanticColors, tokens } = useTheme();
    const { componentName } = options;
    let resolvedVariantStyles;

    console.log(useTheme());

    // Evaluate variants if they exist for the current component
    if (componentName && components[componentName]) {
      const { variants } = components[componentName];
      if (variants) {
        const prefix = '--' + componentName.toLowerCase();
        const variantStyles: MakeStylesDefinition<Selectors, Tokens | Theme>[] = [];

        for (const variant in variants) {
          // Account for changing default variant
          if (variant === 'root') {
            variantStyles.push([null, tokensToStyleObject(variants[variant], prefix) as MakeStylesStyleRule<Tokens>]);
          } else {
            variantStyles.push([
              (variantSelectors: Selectors & { variant: string }) => variantSelectors.variant === variant,
              tokensToStyleObject(variants[variant], prefix) as MakeStylesStyleRule<Tokens>,
            ]);
          }
        }
        console.log(variantStyles);

        resolvedVariantStyles = makeNonReactStyles(variantStyles);
      }
    }

    const result = css(
      resolvedStyles(
        selectors,
        {
          renderer,
          rtl: options.rtl || rtl,
          tokens: { effects, fonts, palette, semanticColors, ...tokens, ...options.tokens } as Theme,
        },
        ...(classNames || []),
      ),
      resolvedVariantStyles &&
        resolvedVariantStyles(selectors, {
          renderer,
          rtl: options.rtl || rtl,
          tokens: { effects, fonts, palette, semanticColors, ...tokens, ...options.tokens } as Theme,
        }),
    );

    return result;
  };
}
