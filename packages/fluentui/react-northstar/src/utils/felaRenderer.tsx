import { Renderer } from '@fluentui/react-bindings';
import { createRenderer as createFelaRenderer, IRenderer } from 'fela';
import felaPluginEmbedded from 'fela-plugin-embedded';
import felaPluginFallbackValue from 'fela-plugin-fallback-value';
import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer';
import felaPluginRtl from 'fela-plugin-rtl';
// @ts-ignore
import { generateCSSSelector, RULE_TYPE } from 'fela-utils';

import felaDisableAnimationsPlugin from './felaDisableAnimationsPlugin';
import felaExpandCssShorthandsPlugin from './felaExpandCssShorthandsPlugin';
import felaFocusVisibleEnhancer from './felaFocusVisibleEnhancer';
import felaInvokeKeyframesPlugin from './felaInvokeKeyframesPlugin';
import felaSanitizeCss from './felaSanitizeCssPlugin';
import felaStylisEnhancer from './felaStylisEnhancer';

let felaDevMode = false;

try {
  // eslint-disable-next-line no-undef
  felaDevMode = !!window.localStorage.felaDevMode;
} catch {}

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  if (felaDevMode) {
    /* eslint-disable-next-line no-console */
    console.warn(
      [
        '@fluentui/react-northstar:',
        'You are running Fela in development mode and this can cause performance degrades.',
        'To disable it please paste `delete window.localStorage.felaDevMode` to your browsers console and reload current page.',
      ].join(' '),
    );
  } else {
    /* eslint-disable-next-line no-console */
    console.warn(
      [
        '@fluentui/react-northstar:',
        'You are running Fela in production mode.',
        'This limits your ability to edit styles in browsers development tools.',
        'To enable development mode please paste `window.localStorage.felaDevMode = true` to your browsers console and reload the page.',
      ].join(' '),
    );
  }
}

// Blacklist contains a list of classNames that are used by FontAwesome
// https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use
const blacklistedClassNames = ['fa', 'fas', 'far', 'fal', 'fab'];

const filterClassName = (className: string): boolean =>
  className.indexOf('ad') === -1 && blacklistedClassNames.indexOf(className) === -1;

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

const felaStaticEnhancer = (renderer: IRenderer): IRenderer => {
  // @ts-ignore
  const existingRenderStyle = renderer._renderStyle.bind(renderer);

  // @ts-ignore
  renderer._renderStyle = (style, props): string => {
    const newStyle = {};
    let classes = '';

    for (const property in style) {
      const value = style[property];

      if (value?.__specialFlag) {
        // @ts-ignore
        if (renderer.cache[value.declaration]) {
          // @ts-ignore
          classes = classes + ' ' + renderer.cache[value.declaration].className;
        } else {
          const className =
            // @ts-ignore
            renderer.selectorPrefix + generateClassName(renderer.getNextRuleIdentifier, renderer.filterClassName);

          const declaration = value.declaration;
          const selector = generateCSSSelector(className, '' /* pseudo */);

          const change = {
            type: RULE_TYPE,
            className,
            selector,
            declaration,
            pseudo: '',
            media: '',
            support: '',
            DO_NOT_PROCESS_BY_STYLIS: true,
          };

          // @ts-ignore
          renderer.cache[value.declaration] = change;
          // @ts-ignore
          renderer._emitChange(change);

          classes = classes + ' ' + className;
        }
      } else {
        newStyle[property] = value;
      }
    }
    // console.log(existingRenderStyle(newStyle, props))
    return classes + ' ' + existingRenderStyle(newStyle, props);
  };

  return renderer;
};

const rendererConfig = {
  devMode: felaDevMode,
  filterClassName,
  enhancers: [felaStaticEnhancer, felaFocusVisibleEnhancer, felaStylisEnhancer],
  plugins: [
    felaDisableAnimationsPlugin(),

    // is necessary to prevent accidental style typos
    // from breaking ALL the styles on the page
    felaSanitizeCss({
      skip: ['content', 'keyframe'],
    }),

    felaPluginPlaceholderPrefixer(),
    felaInvokeKeyframesPlugin(),
    felaPluginEmbedded(),

    felaExpandCssShorthandsPlugin(),

    // Heads up!
    // This is required after fela-plugin-prefixer to resolve the array of fallback values prefixer produces.
    felaPluginFallbackValue(),

    felaPluginRtl(),
  ],
};

export const createRenderer = (): Renderer => createFelaRenderer(rendererConfig) as Renderer;

export const felaRenderer = createRenderer();
