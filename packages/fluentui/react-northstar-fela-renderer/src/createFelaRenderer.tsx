import { createRenderer, IStyle, TPlugin } from 'fela';
import felaPluginEmbedded from 'fela-plugin-embedded';
import felaPluginFallbackValue from 'fela-plugin-fallback-value';
import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer';
import felaPluginRtl from 'fela-plugin-rtl';

import { insertChange } from './dom/insertChange';
import { felaDisableAnimationsPlugin } from './felaDisableAnimationsPlugin';
import { felaExpandCssShorthandsPlugin } from './felaExpandCssShorthandsPlugin';
import { felaFocusVisibleEnhancer } from './felaFocusVisibleEnhancer';
import { felaInvokeKeyframesPlugin } from './felaInvokeKeyframesPlugin';
import { felaPerformanceEnhancer } from './felaPerformanceEnhancer';
import { felaSanitizeCssPlugin } from './felaSanitizeCssPlugin';
import { felaStylisEnhancer } from './felaStylisEnhancer';
import type { CreateRenderer, FelaRenderer, FelaRendererChange, FelaRendererParam } from './types';

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
  devMode: false,
  filterClassName,
  enhancers: [
    function felaPendingChangesEnhancer(felaRenderer: FelaRenderer) {
      felaRenderer._emitChange = change => {
        // Only handle "RULE" & "KEYFRAME" changes to insert
        if (change.type === 'RULE' || change.type === 'KEYFRAME') {
          felaRenderer._pendingChanges.add(change);
          return;
        }

        // "clear" is allowed only in tests
        if (process.env.NODE_ENV === 'test') {
          if (change.type === 'CLEAR') {
            felaRenderer._pendingChanges.clear();
            felaRenderer.nodes = {};
            felaRenderer.scoreIndex = {};

            return;
          }
        }

        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error('FelaRenderer: _emitChange() should not be called.');
        }
      };

      return felaRenderer;
    },
    felaPerformanceEnhancer,
    felaFocusVisibleEnhancer,
    felaStylisEnhancer,
  ],
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

  return (targetDocument = typeof document === 'undefined' ? undefined : document) => {
    let usedRenderers: number = 0;

    const felaRenderer = createRenderer(rendererConfig) as FelaRenderer & {
      _emitChange: (change: FelaRendererChange) => void;
    };

    felaRenderer._pendingChanges = new Set<FelaRendererChange>();

    if (nonce) {
      felaRenderer.styleNodeAttributes = {
        nonce,
      };
    }

    return {
      registerUsage: () => {
        usedRenderers += 1;
      },
      unregisterUsage: () => {
        usedRenderers -= 1;

        if (usedRenderers === 0) {
          felaRenderer.nodes = {};
        }
      },

      renderRule: (styles, param) => {
        const felaParam: FelaRendererParam = {
          ...param,
          theme: { direction: param.direction },
        };

        return felaRenderer.renderRule(() => styles as unknown as IStyle, felaParam);
      },
      insertPendingRules: () => {
        if (targetDocument && felaRenderer._pendingChanges.size > 0) {
          felaRenderer._pendingChanges.forEach(change => {
            insertChange(felaRenderer, targetDocument, change);
          });
          felaRenderer._pendingChanges.clear();
        }
      },

      // getOriginalRenderer() is implemented only for tests to be compatible with jest-react-fela expectations.
      getOriginalRenderer: (): FelaRenderer => {
        if (process.env.NODE_ENV !== 'test') {
          throw new Error('This method implements private API and can be used only in tests');
        }

        return felaRenderer;
      },
    };
  };
}
