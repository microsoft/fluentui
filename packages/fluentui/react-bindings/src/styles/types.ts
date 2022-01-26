import { DebugData, ICSSInJSStyle, PropsWithVarsAndStyles } from '@fluentui/styles';
import { ProviderContextPrepared } from '../context';

// Notice:
// This temporary lives here, will be remove once `animation` prop will be dropped
export type ComponentAnimationProp = {
  name: string;
  delay?: string;
  direction?: string;
  duration?: string;
  fillMode?: string;
  iterationCount?: string;
  playState?: string;
  timingFunction?: string;
  keyframeParams?: object;
};

export type ComponentSlotClasses = Record<string, string>;

// Heads Up!
// Keep in sync with packages/react-proptypes/src/index.ts
export type ComponentDesignProp = {
  display?: ICSSInJSStyle['display'];
  position?: ICSSInJSStyle['position'];

  top?: ICSSInJSStyle['top'];
  bottom?: ICSSInJSStyle['bottom'];
  left?: ICSSInJSStyle['left'];
  right?: ICSSInJSStyle['right'];

  padding?: ICSSInJSStyle['padding'];
  paddingTop?: ICSSInJSStyle['paddingTop'];
  paddingRight?: ICSSInJSStyle['paddingRight'];
  paddingBottom?: ICSSInJSStyle['paddingBottom'];
  paddingLeft?: ICSSInJSStyle['paddingLeft'];

  margin?: ICSSInJSStyle['margin'];
  marginTop?: ICSSInJSStyle['marginTop'];
  marginRight?: ICSSInJSStyle['marginRight'];
  marginBottom?: ICSSInJSStyle['marginBottom'];
  marginLeft?: ICSSInJSStyle['marginLeft'];

  width?: ICSSInJSStyle['width'];
  height?: ICSSInJSStyle['height'];
  minWidth?: ICSSInJSStyle['minWidth'];
  maxWidth?: ICSSInJSStyle['maxWidth'];
  minHeight?: ICSSInJSStyle['minHeight'];
  maxHeight?: ICSSInJSStyle['maxHeight'];
};

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
