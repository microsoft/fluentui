import { CreateRenderer, Renderer } from '@fluentui/react-northstar-styles-renderer';
import { createRenderer, IRenderer, IStyle, TPlugin } from 'fela';
import felaPluginEmbedded from 'fela-plugin-embedded';
import felaPluginFallbackValue from 'fela-plugin-fallback-value';
import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer';
import felaPluginRtl from 'fela-plugin-rtl';
import * as React from 'react';

import { felaDisableAnimationsPlugin } from './felaDisableAnimationsPlugin';
import { felaExpandCssShorthandsPlugin } from './felaExpandCssShorthandsPlugin';
import { felaFocusVisibleEnhancer } from './felaFocusVisibleEnhancer';
import { felaInvokeKeyframesPlugin } from './felaInvokeKeyframesPlugin';
import { felaPerformanceEnhancer } from './felaPerformanceEnhancer';
import { felaSanitizeCssPlugin } from './felaSanitizeCssPlugin';
import { felaStylisEnhancer } from './felaStylisEnhancer';
import { RendererProvider } from './RendererProvider';
import { FelaRenderer, FelaRendererParam } from './types';

let felaDevMode = false;

try {
  // eslint-disable-next-line no-undef
  felaDevMode = !!window.localStorage.felaDevMode;
} catch {}

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
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

const blocklistedClassNames = [
  // Blocklist contains a list of classNames that are used by FontAwesome
  // https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use
  'fa',
  'fas',
  'far',
  'fal',
  'fab',
  // Used by https://github.com/fullcalendar/fullcalendar
  'fc',
  // .cke is used by CKEditor
  'ck',
  'cke',
];

const filterClassName = (className: string): boolean => {
  // Also ensure that class name does not contain 'ad' as it might
  // cause compatibility issues regarding Ad blockers.
  return className.indexOf('ad') === -1 && blocklistedClassNames.indexOf(className) === -1;
};

const rendererConfig = {
  devMode: felaDevMode,
  filterClassName,
  enhancers: [felaPerformanceEnhancer, felaFocusVisibleEnhancer, felaStylisEnhancer],
  plugins: [
    felaDisableAnimationsPlugin as TPlugin,

    // is necessary to prevent accidental style typos
    // from breaking ALL the styles on the page
    felaSanitizeCssPlugin as TPlugin,

    felaPluginPlaceholderPrefixer(),
    felaInvokeKeyframesPlugin as TPlugin,
    felaPluginEmbedded(),

    felaExpandCssShorthandsPlugin as TPlugin,

    // Heads up!
    // This is required after fela-plugin-prefixer to resolve the array of fallback values prefixer produces.
    felaPluginFallbackValue(),

    felaPluginRtl(),
  ],
};

export type CreateFelaRendererOptions = {
  nonce?: string;
};

export function createFelaRenderer(options: CreateFelaRendererOptions = {}): CreateRenderer {
  const { nonce } = options;

  return () => {
    const felaRenderer = createRenderer(rendererConfig) as FelaRenderer & {
      listeners: [];
      nodes: Record<string, HTMLStyleElement>;
      updateSubscription: Function | undefined;
    };
    let usedRenderers: number = 0;

    if (nonce) {
      felaRenderer.styleNodeAttributes = {
        nonce,
      };
    }

    // rehydration disabled to avoid leaking styles between renderers
    // https://github.com/rofrischmann/fela/blob/master/docs/api/fela-dom/rehydrate.md
    const Provider: Renderer['Provider'] = props => (
      <RendererProvider renderer={felaRenderer} rehydrate={false} targetDocument={props.target}>
        {props.children}
      </RendererProvider>
    );

    return {
      registerUsage: () => {
        usedRenderers += 1;
      },
      unregisterUsage: () => {
        usedRenderers -= 1;

        if (usedRenderers === 0) {
          felaRenderer.listeners = [];
          felaRenderer.nodes = {};
          felaRenderer.updateSubscription = undefined;
        }
      },

      renderFont: font => {
        felaRenderer.renderFont(font.name, font.paths, font.props);
      },
      renderGlobal: felaRenderer.renderStatic,
      renderRule: (styles, param) => {
        const felaParam: FelaRendererParam = {
          ...param,
          theme: { direction: param.direction },
        };

        return felaRenderer.renderRule(() => styles as unknown as IStyle, felaParam);
      },

      // getOriginalRenderer() is implemented only for tests to be compatible with jest-react-fela expectations.
      getOriginalRenderer: (): IRenderer => {
        if (process.env.NODE_ENV !== 'test') {
          throw new Error('This method implements private API and can be used only in tests');
        }

        return felaRenderer;
      },

      Provider,
    };
  };
}
