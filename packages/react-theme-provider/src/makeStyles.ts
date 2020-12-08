import hashString from '@emotion/hash';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Properties as CSSProperties } from 'csstype';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { expand } from 'inline-style-expand-shorthand';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as _Stylis from 'stylis';
import { convertProperty } from 'rtl-css-js/core';

import { cssifyDeclaration } from './cssifyDeclaration';
import { insertStyles } from './insertStyles';
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

const canUseCSSVariables = window.CSS && CSS.supports('color', 'var(--c)');

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Stylis = (_Stylis as any).default || _Stylis;

const stylis = new Stylis({
  cascade: false,
  compress: false,
  global: false,
  keyframe: false,
  preserve: false,
  semicolon: false,
});

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

// function createCSSVariablesProxy(tokens: any) {
//   const g = {
//     // @ts-ignore
//     get(target: any, key: any) {
//       if (isObject(target[key])) {
//         return new Proxy({ ...target[key], value: (target.value ?? '') + '-' + key }, g);
//       }
//
//       return `var(--theme${target.value ?? ''}-${key})`;
//     },
//   };
//
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
    } else if (typeof propValue === 'string' || typeof propValue === 'number') {
      const className = HASH_PREFIX + hashString(selector + propName + propValue);

      // cssfied union of property & value, i.e. `{ color: "red" }`
      let declaration = cssifyDeclaration(propName, propValue);
      const css = stylis('', `.${className}${selector}{${declaration}}`);

      // uniq key based on property & selector, used for merging later
      const key = selector + propName;

      // TODO: what can actually flip in RTL?!
      const rtl = convertProperty(propName, propValue);
      const flippedInRtl = rtl.key !== propName || rtl.value !== propValue;

      if (flippedInRtl) {
        declaration = cssifyDeclaration(rtl.key, rtl.value);
        const rtlCSS = stylis('', `.r${className}${selector}{${declaration}}`);

        // There is no sense to store RTL className as it's "r" + regular className
        result[key] = [className, css, rtlCSS];
      } else {
        result[key] = [className, css];
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
function matchesSelectors(matchers: any, selectors: any): boolean {
  if (matchers === null) {
    return true;
  }

  let matches = true;

  // eslint-disable-next-line guard-for-in
  for (const matcherName in matchers) {
    const matcherValue = matchers[matcherName];
    const matchesSelector =
      // eslint-disable-next-line eqeqeq
      matcherValue == selectors[matcherName] ||
      // https://stackoverflow.com/a/19277873/6488546
      // find less tricky way
      // eslint-disable-next-line eqeqeq
      (matcherValue === false && selectors[matcherName] == null);

    if (!matchesSelector) {
      matches = false;
      break;
    }
  }

  return matches;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveStylesToClasses(definitions: any[], tokens: any) {
  return definitions.map(definition => {
    const matchers = definition[0];
    const styles = definition[1];
    const resolvedStyles = definition[2];

    const areTokenDependantStyles = typeof styles === 'function';

    if (canUseCSSVariables) {
      // we can always use prebuilt styles in this case and static cache in runtime

      if (resolvedStyles) {
        return [matchers, resolvedStyles];
      }

      // if static cache is not present, eval it and mutate original object

      definition[2] = resolveStyles(areTokenDependantStyles ? styles(tokens) : styles);

      return [matchers, definition[2]];
    }

    // if CSS variables are not supported we have to re-eval only functions, otherwise static cache can be reused

    if (areTokenDependantStyles) {
      // An additional level of cache based on tokens to avoid style computation for IE11

      const path = [tokens, styles];
      const resolvedStyles1 = graphGet(graph, path);

      if (resolvedStyles1) {
        return [matchers, resolvedStyles1];
      }

      const resolveStyles2 = resolveStyles(styles(tokens));
      graphSet(graph, path, resolveStyles2);

      return [matchers, resolveStyles2];
    }

    if (resolvedStyles) {
      return [matchers, resolvedStyles];
    }

    definition[2] = resolveStyles(styles);

    return [matchers, definition[2]];
  });
}

/**
 * TODO: Update it with something proper...
 * CAN WORK WITHOUT REACT!
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeNonReactStyles(styles: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/naming-convention
  return function ___(selectors: any, options: any, ...classNames: (string | undefined)[]): string {
    // If CSS variables are present we can use CSS variables proxy like in build time
    const tokens = options.tokens; // canUseCSSVariables ? createCSSVariablesProxy(options.tokens) : options.tokens;
    const resolvedStyles = resolveStylesToClasses(styles, tokens);

    const nonMakeClasses: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const overrides: any = {};

    // overrides?.__styles ? styles.concat(overrides?.__styles) : styles,
    // tokens,

    classNames.forEach(className => {
      if (typeof className === 'string') {
        className.split(' ').forEach(cName => {
          if (options.target.cache[cName] !== undefined) {
            overrides[options.target.cache[cName][0]] = options.target.cache[cName][1];
          } else {
            nonMakeClasses.push(cName);
          }
        });
      }
    });

    // console.log('classNames', classNames);
    // console.log('overrides', overrides);
    // console.log('resolvedClasses', resolvedClasses);

    // console.log(classNames, resolvedClasses, overrides);

    // TODO: make me faster???

    const matchedDefinitions = resolvedStyles.reduce((acc, definition) => {
      if (matchesSelectors(definition[0], selectors)) {
        acc.push(definition[1]);
      }

      return acc;
    }, []);
    const resultDefinitions = Object.assign({}, ...matchedDefinitions, overrides);

    return nonMakeClasses.join(' ') + insertStyles(resultDefinitions, options.rtl, options.target);
  };
}

const defaultTarget = createTarget(document);

/*
 * A wrapper to connect to a React context. SHOULD USE unified context!!!
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeStyles(styles: any) {
  const result = makeNonReactStyles(styles);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/naming-convention
  return function ___(selectors: any = {}, ...classNames: string[]): string {
    const { components, effects, fonts, palette, rtl, semanticColors, tokens } = useTheme();

    return result(
      selectors,
      { rtl, tokens: { components, effects, fonts, palette, semanticColors, ...tokens }, target: defaultTarget },
      ...classNames,
    );
  };
}

/*
 * A wrapper to connect to a React context. SHOULD USE unified context!!!
 */
// export function makeNStyles(styles: any) {
//   const result = makeNonReactStyles(styles);
//   console.log('2');

//   return function ___(selectors: any = {}, ...classNames: string[]): string {
//     const { rtl, theme, target } = useFluentContext();

//     return result(selectors, { rtl, tokens: theme.siteVariables, target }, ...classNames);
//   };
// }
