import { Renderer } from '@fluentui/react-northstar-styles-renderer';
import { createRenderer, IConfig, IRenderer, IStyle, TPlugin } from 'fela';
import felaPluginEmbedded from 'fela-plugin-embedded';
import felaPluginFallbackValue from 'fela-plugin-fallback-value';
import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer';
import felaPluginRtl from 'fela-plugin-rtl';
import * as React from 'react';
import { RendererProvider } from 'react-fela';

import { felaDisableAnimationsPlugin } from './felaDisableAnimationsPlugin';
import { felaExpandCssShorthandsPlugin } from './felaExpandCssShorthandsPlugin';
import { felaFocusVisibleEnhancer } from './felaFocusVisibleEnhancer';
import { felaInvokeKeyframesPlugin } from './felaInvokeKeyframesPlugin';
import { felaPerformanceEnhancer } from './felaPerformanceEnhancer';
import { felaSanitizeCssPlugin } from './felaSanitizeCssPlugin';
import { felaStylisEnhancer } from './felaStylisEnhancer';
import { insertRule } from './makeStylesCompat';
import { FelaRenderer, FelaRendererParam } from './types';
import type { MakeStylesRenderer } from './makeStylesCompat';

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

const filterClassName = (): boolean => {
  return true;
};

type CreateFelaRenderer = (target?: Document, makeStylesRenderer?: MakeStylesRenderer) => Renderer;

export const createFelaRenderer: CreateFelaRenderer = (target, makeStylesRenderer) => {
  const rendererConfig: IConfig = {
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
  const felaRenderer = createRenderer(rendererConfig) as FelaRenderer;

  felaRenderer.isCompat = !!makeStylesRenderer;
  let usedRenderers: number = 0;

  // rehydration disabled to avoid leaking styles between renderers
  // https://github.com/rofrischmann/fela/blob/master/docs/api/fela-dom/rehydrate.md
  const Provider: React.FC = props => {
    if (felaRenderer.isCompat) {
      if (!felaRenderer.updateSubscription) {
        felaRenderer.updateSubscription = insertRule(target, makeStylesRenderer!);
        felaRenderer.subscribe(felaRenderer.updateSubscription);
      }

      return <>{props.children}</>;
    }

    return (
      <RendererProvider renderer={felaRenderer} {...{ rehydrate: false, targetDocument: target }}>
        {props.children}
      </RendererProvider>
    );
  };

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

      return felaRenderer.renderRule(() => (styles as unknown) as IStyle, felaParam);
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
