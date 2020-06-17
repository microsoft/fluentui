import {
  DebugData,
  ICSSInJSStyle,
  PropsWithVarsAndStyles,
  ThemeInput,
  ThemePrepared,
  ComponentSlotStyle,
} from '@fluentui/styles';
import { IRenderer as FelaRenderer } from 'fela';

import { Telemetry } from '../telemetry/types';

// Notice:
// This temporary lives here, will be remove once `animation` prop will be dropped
export type ComponentAnimationProp =
  | {
      name: string;
      delay?: string;
      direction?: string;
      duration?: string;
      fillMode?: string;
      iterationCount?: string;
      playState?: string;
      timingFunction?: string;
      keyframeParams?: object;
    }
  | string;

export type ComponentSlotClasses = Record<string, string>;

// Heads Up!
// Keep in sync with packages/react-proptypes/src/index.ts
export type ComponentDesignProp<P = {}, V = {}> = ComponentSlotStyle<P, V>;

export type RendererParam = {
  theme: { direction: 'ltr' | 'rtl' };
  disableAnimations: boolean;
  displayName: string;
  sanitizeCss: boolean;
};

export type RendererRenderRule = (rule: () => ICSSInJSStyle, param: RendererParam) => string;
export type Renderer = Omit<FelaRenderer, 'renderRule'> & {
  renderRule: RendererRenderRule;
};

export interface StylesContextPerformance {
  enableSanitizeCssPlugin: boolean;
  enableStylesCaching: boolean;
  enableVariablesCaching: boolean;
  enableBooleanVariablesCaching: boolean;
}

export type StylesContextPerformanceInput = Partial<StylesContextPerformance>;

export type StylesContextInputValue<R = Renderer> = {
  rtl?: boolean;
  disableAnimations?: boolean;
  performance?: StylesContextPerformanceInput;
  renderer?: R;
  theme?: ThemeInput;
};

export type StylesContextValue<R = Renderer> = {
  rtl: boolean;
  disableAnimations: boolean;
  performance: StylesContextPerformance;
  renderer: R;
  theme: ThemePrepared;
  telemetry?: Telemetry;
};

export type PrimitiveProps = Record<string, boolean | number | string | undefined>;

export type ResolveStylesOptions = StylesContextValue<{
  renderRule: RendererRenderRule;
}> & {
  className?: string;
  allDisplayNames: string[];
  primaryDisplayName: string;
  props: PropsWithVarsAndStyles & { design?: ComponentDesignProp };
  rtl: boolean;
  telemetry?: Telemetry;
  saveDebug: (debug: DebugData | null) => void;
};
