import { Renderer } from '@fluentui/react-northstar-styles-renderer';
import { DebugData, PropsWithVarsAndStyles, ThemeInput, ThemePrepared, ComponentSlotStyle } from '@fluentui/styles';

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

export interface StylesContextPerformance {
  enableSanitizeCssPlugin: boolean;
  enableStylesCaching: boolean;
  enableVariablesCaching: boolean;
  enableBooleanVariablesCaching: boolean;
}

export type StylesContextPerformanceInput = Partial<StylesContextPerformance>;

export type StylesContextInputValue = {
  rtl?: boolean;
  disableAnimations?: boolean;
  performance?: StylesContextPerformanceInput;
  renderer?: Renderer;
  theme?: ThemeInput;
};

export type StylesContextValue = {
  rtl: boolean;
  disableAnimations: boolean;
  performance: StylesContextPerformance;
  renderer: Renderer;
  theme: ThemePrepared;
  telemetry?: Telemetry;
};

export type PrimitiveProps = Record<string, boolean | number | string | undefined>;

export type ResolveStylesOptions = StylesContextValue & {
  className?: string;
  allDisplayNames: string[];
  primaryDisplayName: string;
  props: PropsWithVarsAndStyles & { design?: ComponentDesignProp };
  rtl: boolean;
  telemetry?: Telemetry;
  saveDebug: (debug: DebugData | null) => void;
};
