import { noopRenderer, Renderer } from '@fluentui/react-northstar-styles-renderer';
import { emptyTheme, ThemeInput, ThemePrepared } from '@fluentui/styles';
import * as React from 'react';

import { Telemetry } from './telemetry/types';

export interface StylesContextPerformance {
  enableSanitizeCssPlugin: boolean;
  enableStylesCaching: boolean;
  enableVariablesCaching: boolean;
  enableBooleanVariablesCaching: boolean;
}

export type StylesContextPerformanceInput = Partial<StylesContextPerformance>;

export type ProviderContextInput = {
  rtl?: boolean;
  disableAnimations?: boolean;
  performance?: StylesContextPerformanceInput;
  renderer?: Renderer;
  theme?: ThemeInput;
  target?: Document;
  telemetry?: Telemetry;
};

export type ProviderContextPrepared = {
  rtl: boolean;
  disableAnimations: boolean;
  performance: StylesContextPerformance;
  renderer: Renderer;
  theme: ThemePrepared;
  telemetry: Telemetry | undefined;
  // `target` can be undefined for SSR
  target: Document | undefined;
};

export const defaultPerformanceFlags: StylesContextPerformance = {
  enableSanitizeCssPlugin: process.env.NODE_ENV !== 'production',
  enableStylesCaching: true,
  enableVariablesCaching: true,
  enableBooleanVariablesCaching: false,
};

export const defaultContextValue: ProviderContextPrepared = {
  // A default value for `rtl` is undefined to let compute `Provider` a proper one
  rtl: undefined as any,
  disableAnimations: false,
  performance: defaultPerformanceFlags,
  renderer: noopRenderer,
  theme: emptyTheme,
  telemetry: undefined,
  target: undefined,
};

const FluentContext = React.createContext<ProviderContextPrepared>(defaultContextValue);

export function useFluentContext(): ProviderContextPrepared {
  return React.useContext(FluentContext);
}

export const Unstable_FluentContextProvider = FluentContext.Provider;
