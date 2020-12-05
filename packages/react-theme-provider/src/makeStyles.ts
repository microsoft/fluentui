import hashString from '@emotion/hash';
// @ts-ignore
// import { useFluentContext } from '@fluentui/react-bindings';
import * as CSS from 'csstype';
// @ts-ignore
import { expand } from 'inline-style-expand-shorthand';
// @ts-ignore
import * as _Stylis from 'stylis';
import { convertProperty } from 'rtl-css-js/core';

import { cssifyDeclaration } from './cssifyDeclaration';
import { insertStyles } from './insertStyles';
import { useTheme } from './useTheme';

function isObject(val: any) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

//
//
//

//
//
//

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

function createTokensProxy(tokens: any) {
  const g = {
    // @ts-ignore
    get(target: any, key: any) {
      if (isObject(target[key])) {
        return new Proxy({ ...target[key], value: (target.value ?? '') + '-' + key }, g);
      }

      return `var(--theme${target.value ?? ''}-${key})`;
    },
  };

  return new Proxy(tokens, g);
}

const HASH_PREFIX = 'a';

//
//
//

function resolveStyles(styles: any[], selector = '', result: any = {}): any {
  const expandedStyles = expand(styles);
  const properties = Object.keys(expandedStyles) as (keyof CSS.Properties)[];

  properties.forEach(propName => {
    const propValue = expandedStyles[propName];

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
      const declaration = cssifyDeclaration(propName, propValue);
      const css = stylis('', `.${className}${selector}{${declaration}}`);

      // uniq key based on property & selector, used for merging later
      const key = selector + propName;

      // TODO: what can actually flip in RTL?!
      const rtl = convertProperty(propName, propValue);
      const flippedInRtl = rtl.key !== propName || rtl.value !== propValue;

      if (flippedInRtl) {
        const declaration = cssifyDeclaration(rtl.key, rtl.value);
        const rtlCSS = stylis('', `.r${className}${selector}{${declaration}}`);

        result[key] = [className, css, 'r' + className, rtlCSS];
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

// function resolveMatches(styles, selectors) {
//   const matchedStyles = styles.reduce((acc, definition) => {
//
//   })
// }

function matchesSelectors(matcher: any, selectors: any): boolean {
  let matches = true;

  if (isObject(matcher)) {
    Object.keys(matcher).forEach(matcherName => {
      const matcherValue = matcher[matcherName];
      const matchesSelector =
        matcherValue == selectors[matcherName] ||
        // https://stackoverflow.com/a/19277873/6488546
        // find less tricky way
        (matcherValue === false && selectors[matcherName] == null);

      if (!matchesSelector) {
        matches = false;
      }
    });
  }

  return matches;
}

function resolveStylesToClasses(styles: any[], tokens: any) {
  return styles.map(definition => {
    return [
      definition[0],
      resolveStyles(
        typeof definition[1] === 'function' ? definition[1](tokens /*createTokensProxy(tokens)*/) : definition[1],
      ),
    ];
  });
}

const DEFINITION_CACHE: Record<string, [string, string]> = {};

/**
 * TODO: Update it with something proper...
 * CAN WORK WITHOUT REACT!
 */
export function makeNonReactStyles(styles: any) {
  return function ___(selectors: any, options: any, ...classNames: (string | undefined)[]): string {
    console.log(options.tokens);
    const resolvedClasses = resolveStylesToClasses(styles, options.tokens);

    const nonMakeClasses: string[] = [];
    const overrides: any = {};

    // overrides?.__styles ? styles.concat(overrides?.__styles) : styles,
    // tokens,

    classNames.forEach(className => {
      if (typeof className === 'string') {
        className.split(' ').forEach(className => {
          if (DEFINITION_CACHE[className] !== undefined) {
            overrides[DEFINITION_CACHE[className][0]] = DEFINITION_CACHE[className][1];
          } else {
            nonMakeClasses.push(className);
          }
        });
      }
    });

    // console.log('classNames', classNames);
    // console.log('overrides', overrides);
    // console.log('resolvedClasses', resolvedClasses);

    // console.log(classNames, resolvedClasses, overrides);

    // TODO: make me faster???

    const matchedDefinitions = resolvedClasses.reduce((acc, definition) => {
      if (matchesSelectors(definition[0], selectors)) {
        return Object.assign(acc, definition[1]);
      }

      return acc;
    }, {});
    const resultDefinitions = { ...matchedDefinitions, ...overrides };

    return nonMakeClasses.join(' ') + insertStyles(resultDefinitions, DEFINITION_CACHE, options.rtl, options.target);
  };
}

/*
 * A wrapper to connect to a React context. SHOULD USE unified context!!!
 */
export function makeStyles(styles: any) {
  const result = makeNonReactStyles(styles);

  return function ___(selectors: any = {}, ...classNames: string[]): string {
    const { components, effects, fonts, palette, rtl, semanticColors, tokens } = useTheme();

    return result(
      selectors,
      { rtl, tokens: { components, effects, fonts, palette, semanticColors, ...tokens } },
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
