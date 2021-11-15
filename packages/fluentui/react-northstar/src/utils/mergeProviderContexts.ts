import {
  ProviderContextPrepared,
  ProviderContextInput,
  StylesContextPerformance,
  StylesContextPerformanceInput,
} from '@fluentui/react-bindings';
import { CreateRenderer } from '@fluentui/react-northstar-styles-renderer';
import { mergeThemes } from '@fluentui/styles';

import { isBrowser } from './isBrowser';

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
