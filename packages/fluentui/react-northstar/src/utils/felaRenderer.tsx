import { Renderer } from '@fluentui/react-bindings';
import { createRenderer as createFelaRenderer } from 'fela';
import felaPluginEmbedded from 'fela-plugin-embedded';
import felaPluginFallbackValue from 'fela-plugin-fallback-value';
import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer';
import felaPluginPrefixer from 'fela-plugin-prefixer';
import felaPluginRtl from 'fela-plugin-rtl';

import felaDisableAnimationsPlugin from './felaDisableAnimationsPlugin';
import felaExpandCssShorthandsPlugin from './felaExpandCssShorthandsPlugin';
import felaFocusVisibleEnhancer from './felaFocusVisibleEnhancer';
import felaInvokeKeyframesPlugin from './felaInvokeKeyframesPlugin';
import felaSanitizeCss from './felaSanitizeCssPlugin';

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

const rendererConfig = {
  devMode: felaDevMode,
  filterClassName,
  enhancers: [felaFocusVisibleEnhancer],
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
    felaPluginPrefixer(),

    felaExpandCssShorthandsPlugin(),

    // Heads up!
    // This is required after fela-plugin-prefixer to resolve the array of fallback values prefixer produces.
    felaPluginFallbackValue(),

    felaPluginRtl(),
  ],
};

export const createRenderer = (): Renderer => {
  let usedRenderers = 0;
  const renderer = (createFelaRenderer(rendererConfig) as unknown) as Renderer & {
    listeners: [];
    nodes: Record<string, HTMLElement>;
    updateSubscription: Function | undefined;
  };

  renderer.registerUsage = () => {
    usedRenderers += 1;
  };
  renderer.unregisterUsage = () => {
    usedRenderers -= 1;

    if (usedRenderers === 0) {
      renderer.listeners = [];
      renderer.nodes = {};
      renderer.updateSubscription = undefined;
    }
  };

  return renderer;
};

export const felaRenderer = createRenderer();
