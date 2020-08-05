import { ComponentSlotStyle, DebugData, PropsWithVarsAndStyles } from '@fluentui/styles';
import { ProviderContextPrepared } from '../context';

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
// TODO: restrict typings for "animationName"
export type ComponentDesignProp<P = {}, V = {}> = ComponentSlotStyle<P, V> | ComponentSlotStyle<P, V>[];

export type PrimitiveProps = Record<string, boolean | number | string | undefined>;

export type ResolveStylesOptions = Omit<ProviderContextPrepared, 'target'> & {
  className?: string;
  allDisplayNames: string[];
  primaryDisplayName: string;
  componentProps: Record<string, any>;
  inlineStylesProps: PropsWithVarsAndStyles & { design?: ComponentDesignProp };
  rtl: boolean;
  saveDebug: (debug: DebugData | null) => void;
};
