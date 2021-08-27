//
// This file is one-to-one copy-paste from Fela source code. It includes `_renderStyleToClassNames()` and all
// non-exported utils.
// A single change is only one line inside `generateDeclarationReference()`.
//

import { ICSSInJSStyle } from '@fluentui/styles';
// @ts-ignore
import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration';
import {
  // @ts-ignore
  generateCombinedMediaQuery,
  // @ts-ignore
  generateCSSSelector,
  // @ts-ignore
  isMediaQuery,
  // @ts-ignore
  isNestedSelector,
  // @ts-ignore
  isSupport,
  // @ts-ignore
  isUndefinedValue,
  // @ts-ignore
  normalizeNestedProperty,
  RULE_TYPE,
} from 'fela-utils';

import { FelaRenderer, FelaRendererChange } from './types';

function isPlainObject(val: any) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

const chars = 'abcdefghijklmnopqrstuvwxyz';
const charLength = chars.length;

function generateUniqueClassName(id: number, className: string = ''): string {
  if (id <= charLength) {
    return chars[id - 1] + className;
  }

  // Bitwise floor as safari performs much faster
  // https://jsperf.com/math-floor-vs-math-round-vs-parseint/55
  return generateUniqueClassName((id / charLength) | 0, chars[id % charLength] + className);
}

function generateClassName(getId: Function, filterClassName: Function = () => true): string {
  const startId = getId();
  const generatedClassName = generateUniqueClassName(startId);

  if (!filterClassName(generatedClassName)) {
    return generateClassName(getId, filterClassName);
  }

  return generatedClassName;
}

function generateDeclarationReference(
  property: string,
  value: any,
  pseudo: string = '',
  media: string = '',
  support: string = '',
): string {
  //
  // This a single perf change here, it removes `camelCaseProperty()` call
  //

  // CHANGE:START
  return support + media + pseudo + property + value;
  // CHANGE:END
}

//

export function felaPerformanceEnhancer(renderer: FelaRenderer) {
  renderer._renderStyleToClassNames = function _renderStyleToClassNames(
    { _className, ...style }: ICSSInJSStyle & { _className?: string },
    pseudo: string = '',
    media: string = '',
    support: string = '',
  ): string {
    let classNames = _className ? ` ${_className}` : '';

    for (const property in style) {
      const value = style[property as keyof ICSSInJSStyle];

      if (isPlainObject(value)) {
        if (isNestedSelector(property)) {
          classNames += renderer._renderStyleToClassNames(
            value as any,
            pseudo + normalizeNestedProperty(property),
            media,
            support,
          );
        } else if (isMediaQuery(property)) {
          const combinedMediaQuery = generateCombinedMediaQuery(media, property.slice(6).trim());
          classNames += renderer._renderStyleToClassNames(value as any, pseudo, combinedMediaQuery, support);
        } else if (isSupport(property)) {
          const combinedSupport = generateCombinedMediaQuery(support, property.slice(9).trim());
          classNames += renderer._renderStyleToClassNames(value as any, pseudo, media, combinedSupport);
        } else {
          // eslint-disable-next-line no-console
          console.warn(`The object key "${property}" is not a valid nested key in Fela.
Maybe you forgot to add a plugin to resolve it?
Check http://fela.js.org/docs/basics/Rules.html#styleobject for more information.`);
        }
      } else {
        const declarationReference = generateDeclarationReference(property, value, pseudo, media, support);

        if (!renderer.cache.hasOwnProperty(declarationReference)) {
          // we remove undefined values to enable
          // usage of optional props without side-effects
          if (isUndefinedValue(value)) {
            renderer.cache[declarationReference] = {
              className: '',
            } as FelaRendererChange;
            /* eslint-disable no-continue */
            continue;
            /* eslint-enable */
          }

          const className =
            renderer.selectorPrefix + generateClassName(renderer.getNextRuleIdentifier, renderer.filterClassName);

          const declaration = cssifyDeclaration(property, value);
          const selector = generateCSSSelector(className, pseudo);

          const change = {
            type: RULE_TYPE,
            className,
            selector,
            declaration,
            pseudo,
            media,
            support,
          };

          renderer.cache[declarationReference] = change;
          renderer._emitChange(change);
        }

        const cachedClassName = renderer.cache[declarationReference].className;

        // only append if we got a class cached
        if (cachedClassName) {
          classNames += ` ${cachedClassName}`;
        }
      }
    }

    return classNames;
  };

  return renderer;
}
