import {
  ProviderContextPrepared,
  ProviderContextInput,
  StylesContextPerformance,
  StylesContextPerformanceInput,
} from '@fluentui/react-bindings';
import { CreateRenderer, Renderer } from '@fluentui/react-northstar-styles-renderer';
import { mergeThemes } from '@fluentui/styles';

import { isBrowser } from './isBrowser';

const defaultDocument = { document: 'document' };
const registeredRenderers = new WeakMap<Document | typeof defaultDocument, Renderer>();

export const getRenderer = (createRenderer: CreateRenderer, target?: Document): Renderer => {
  let actualTarget: Document | typeof defaultDocument = target || defaultDocument;

  // A valid comparisons, default renderer will be used
  if (!isBrowser() || typeof target === 'undefined') {
    actualTarget = defaultDocument;
  }

  // SSR logic will be handled by condition above
  // eslint-disable-next-line no-undef
  if (isBrowser() && target === document) {
    actualTarget = defaultDocument;
  }

  if (registeredRenderers.has(actualTarget)) {
    return registeredRenderers.get(actualTarget);
  }

  // To avoid errors related to SSR as `document` may not exist we are using a fake object `defaultDocument`.
  // When a value matches `defaultDocument` we will pass `undefined` to `createRenderer()` and it should handle it
  // properly.
  const createdRenderer = createRenderer(actualTarget === defaultDocument ? undefined : (actualTarget as Document));
  registeredRenderers.set(actualTarget, createdRenderer);

  return createdRenderer;
};

export const mergePerformanceOptions = (
  target: StylesContextPerformance | StylesContextPerformanceInput,
  ...sources: StylesContextPerformanceInput[]
) => {
  return Object.assign(target, ...sources);
};

export const mergeBooleanValues = (target, ...sources) => {
  return sources.reduce((acc, next) => {
    return typeof next === 'boolean' ? next : acc;
  }, target);
};

export const mergeProviderContexts = (
  createRenderer: CreateRenderer,
  ...contexts: (ProviderContextInput | ProviderContextPrepared)[]
): ProviderContextPrepared => {
  const emptyContext: ProviderContextPrepared = {
    theme: {
      siteVariables: {
        fontSizes: {},
      },
      componentVariables: {},
      componentStyles: {},
      fontFaces: [],
      staticStyles: [],
      animations: {},
    },
    rtl: false,
    disableAnimations: false,
    target: isBrowser() ? document : undefined, // eslint-disable-line no-undef
    performance: {
      enableSanitizeCssPlugin: process.env.NODE_ENV !== 'production',
      enableStylesCaching: true,
      enableVariablesCaching: true,
      enableBooleanVariablesCaching: false,
    },
    telemetry: undefined,
    renderer: undefined,
  };

  return contexts.reduce<ProviderContextPrepared>(
    (acc: ProviderContextPrepared, next: ProviderContextInput | ProviderContextPrepared) => {
      if (!next) return acc;

      acc.theme = mergeThemes(acc.theme, next.theme);

      // Latest RTL value wins
      const mergedRTL = mergeBooleanValues(acc.rtl, next.rtl);
      if (typeof mergedRTL === 'boolean') {
        acc.rtl = mergedRTL;
      }

      // Use provided renderer if it is defined
      acc.target = next.target || acc.target;
      acc.renderer = getRenderer(createRenderer, acc.target);

      // Latest disableAnimations value wins
      const mergedDisableAnimations = mergeBooleanValues(acc.disableAnimations, next.disableAnimations);
      if (typeof mergedDisableAnimations === 'boolean') {
        acc.disableAnimations = mergedDisableAnimations;
      }

      acc.performance = mergePerformanceOptions(acc.performance, next.performance || {});

      acc.telemetry = next.telemetry || acc.telemetry;

      return acc;
    },
    emptyContext,
  );
};
