// import { Renderer } from '@fluentui/react-bindings';
import { createRenderer as createFelaRenderer, IRenderer } from 'fela';
import felaPluginEmbedded from 'fela-plugin-embedded';
import felaPluginFallbackValue from 'fela-plugin-fallback-value';
import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer';
import felaPluginRtl from 'fela-plugin-rtl';

import felaDisableAnimationsPlugin from './felaDisableAnimationsPlugin';
import felaExpandCssShorthandsPlugin from './felaExpandCssShorthandsPlugin';
import felaFocusVisibleEnhancer from './felaFocusVisibleEnhancer';
import felaInvokeKeyframesPlugin from './felaInvokeKeyframesPlugin';
import felaSanitizeCss from './felaSanitizeCssPlugin';
import { RULE_TYPE } from 'fela-utils';
import * as Stylis from 'stylis';

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
        '@fluentui/react:',
        'You are running Fela in development mode and this can cause performance degrades.',
        'To disable it please paste `delete window.localStorage.felaDevMode` to your browsers console and reload current page.'
      ].join(' ')
    );
  } else {
    /* eslint-disable-next-line no-console */
    console.warn(
      [
        '@fluentui/react:',
        'You are running Fela in production mode.',
        'This limits your ability to edit styles in browsers development tools.',
        'To enable development mode please paste `window.localStorage.felaDevMode = true` to your browsers console and reload the page.'
      ].join(' ')
    );
  }
}

// Blacklist contains a list of classNames that are used by FontAwesome
// https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use
const blacklistedClassNames = ['fa', 'fas', 'far', 'fal', 'fab'];

const filterClassName = (className: string): boolean => className.indexOf('ad') === -1 && blacklistedClassNames.indexOf(className) === -1;

type Renderer = IRenderer & {
  cache: Record<string, RendererChange>;
  _emitChange?: (change: RendererChange) => void;
};

type RendererChange = {
  type: 'RULE' | 'KEYFRAME' | 'FONT' | 'STATIC' | 'CLEAR';
  className: string;
  selector: string;
  declaration: string;
  pseudo: string;
  media: string;
  support: string;
};

const stylis = new Stylis({
  cascade: false,
  compress: false,
  global: false,
  keyframe: false,
  preserve: false,
  semicolon: false
});

const felaStylis = (renderer: Renderer) => ({
  ...renderer,
  _emitChange: (change: RendererChange) => {
    if (change.type === RULE_TYPE) {
      // const pseudo = change.pseudo ? change.pseudo.replace(':focus-visible', ':focus') : undefined;
      // const selector = `html[data-whatinput="keyboard"] ${change.selector.replace(':focus-visible', ':focus')}`;

      // const declarationReference = _.findKey(renderer.cache, change);
      // const enhancedChange = {
      //   ...change,
      //   pseudo,
      //   selector
      // };

      // if (change.declaration === 'display:grid') {
      // console.log(change);
      const prefixed = stylis('', change.declaration);
      const enhancedChange = {
        ...change,
        declaration: prefixed.slice(1, -1)
      };
      // console.log(prefixed, change.declaration);
      // }

      // Fela has two types for rendering:
      // - DOM via subscriptions that's why `_emitChange()` is replaced, it will notify all
      //   subscriptions
      // - static rendering, it directly accesses `.cache` via `clusterCache()` and generates
      //   stylesheets from changes
      // renderer.cache[declarationReference] = enhancedChange;
      renderer._emitChange(enhancedChange);

      return;
    }

    renderer._emitChange(change);
  }
});

const rendererConfig = {
  devMode: felaDevMode,
  filterClassName,
  enhancers: [felaFocusVisibleEnhancer, felaStylis],
  plugins: [
    felaDisableAnimationsPlugin(),

    // is necessary to prevent accidental style typos
    // from breaking ALL the styles on the page
    felaSanitizeCss({
      skip: ['content', 'keyframe']
    }),

    felaPluginPlaceholderPrefixer(),
    felaInvokeKeyframesPlugin(),
    felaPluginEmbedded(),
    // felaPluginPrefixer(),

    felaExpandCssShorthandsPlugin(),

    // Heads up!
    // This is required after fela-plugin-prefixer to resolve the array of fallback values prefixer produces.
    felaPluginFallbackValue(),

    felaPluginRtl()
  ]
};

export const createRenderer = (): Renderer => createFelaRenderer(rendererConfig) as Renderer;

export const felaRenderer = createRenderer();
