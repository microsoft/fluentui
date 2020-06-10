import hash from '@emotion/hash';
import { ICSSInJSStyle } from '@fluentui/styles';
import {
  // @ts-ignore
  isSupport,
  // @ts-ignore
  isMediaQuery,
  // @ts-ignore
  isNestedSelector,
  // @ts-ignore
  isUndefinedValue,
  // @ts-ignore
  normalizeNestedProperty,
  // @ts-ignore
  processStyleWithPlugins,
  // @ts-ignore
  generateCombinedMediaQuery,
  // @ts-ignore
  generateCSSSelector,
  RULE_TYPE,
} from 'fela-utils';
import { IRenderer } from 'fela';

// eslint-disable-next-line import/no-extraneous-dependencies
import objectReduce from 'fast-loops/lib/objectReduce';
// eslint-disable-next-line import/no-extraneous-dependencies
import cssifyObject from 'css-in-js-utils/lib/cssifyObject';

function isPlainObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

function generateMonolithicClassName(style: ICSSInJSStyle, prefix: string): string {
  const hashedName = hash(JSON.stringify(style));

  return `${prefix}${hashedName}`;
}

type MonoRenderer = IRenderer & {
  cache: Record<string, any>;
  _emitChange: (change: any) => void;
  _renderStyle: (style: ICSSInJSStyle, props: Record<string, any>) => string;
  _renderStyleToCache: (className: string, style: Object, pseudo?: string, media?: string, support?: string) => void;
  _renderStyleToClassNames: (style: ICSSInJSStyle) => string;
};

export default function monolithicRenderer(renderer: MonoRenderer): MonoRenderer {
  renderer._renderStyleToCache = (
    className: string,
    style: Object,
    pseudo: string = '',
    media: string = '',
    support: string = '',
  ) => {
    const ruleSet = objectReduce(
      style,
      (ruleset, value, property) => {
        if (isPlainObject(value)) {
          if (isNestedSelector(property)) {
            renderer._renderStyleToCache(className, value, pseudo + normalizeNestedProperty(property), media, support);
          } else if (isMediaQuery(property)) {
            const combinedMediaQuery = generateCombinedMediaQuery(media, property.slice(6).trim());

            renderer._renderStyleToCache(className, value, pseudo, combinedMediaQuery, support);
          } else if (isSupport(property)) {
            const combinedSupport = generateCombinedMediaQuery(support, property.slice(9).trim());
            renderer._renderStyleToCache(className, value, pseudo, media, combinedSupport);
          } else {
            console.warn(`The object key "${property}" is not a valid nested key in Fela. 
Maybe you forgot to add a plugin to resolve it? 
Check http://fela.js.org/docs/basics/Rules.html#styleobject for more information.`);
          }
        } else if (!isUndefinedValue(value)) {
          ruleset[property] = value;
        }

        return ruleset;
      },
      {},
    );

    if (Object.keys(ruleSet).length > 0) {
      const css = cssifyObject(ruleSet);
      const selector = generateCSSSelector(className, pseudo);

      const change = {
        type: RULE_TYPE,
        className,
        selector,
        declaration: css,
        media,
        pseudo,
        support,
      };
      const declarationReference = selector + media + support;

      renderer.cache[declarationReference] = change;
      renderer._emitChange(change);
    }
  };

  renderer._renderStyleToClassNames = (style: ICSSInJSStyle): string => {
    if (Object.keys(style).length === 0) {
      return '';
    }

    const className = generateMonolithicClassName(style, 'css-');

    if (!renderer.cache.hasOwnProperty(className)) {
      renderer._renderStyleToCache(className, style);
      renderer.cache[className] = {};
    }

    return className;
  };

  renderer._renderStyle = (style: ICSSInJSStyle, props: Record<string, any>): string => {
    const processedStyle = processStyleWithPlugins(renderer, style, RULE_TYPE, props);

    return renderer._renderStyleToClassNames(processedStyle);
  };

  return renderer;
}
