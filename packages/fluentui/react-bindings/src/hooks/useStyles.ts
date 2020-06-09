import {
  ComponentSlotStyle,
  ComponentSlotStylesResolved,
  ComponentVariablesInput,
  DebugData,
  emptyTheme,
} from '@fluentui/styles';
import * as React from 'react';
// @ts-ignore We have this export in package, but it is not present in typings
import { ThemeContext } from 'react-fela';

import {
  ComponentDesignProp,
  ComponentSlotClasses,
  PrimitiveProps,
  RendererRenderRule,
  StylesContextPerformance,
  StylesContextValue,
} from '../styles/types';
import getStyles from '../styles/getStyles';

type UseStylesOptions<StyleProps extends PrimitiveProps> = {
  className?: string;
  mapPropsToStyles?: () => StyleProps;
  mapPropsToInlineStyles?: () => InlineStyleProps<StyleProps>;
  rtl?: boolean;
};

type UseStylesResult = {
  classes: ComponentSlotClasses;
  styles: ComponentSlotStylesResolved;
};

type InlineStyleProps<StyleProps> = {
  /** Additional CSS class name(s) to apply.  */
  className?: string;

  design?: ComponentDesignProp;

  /** Additional CSS styles to apply to the component instance.  */
  styles?: ComponentSlotStyle<StyleProps, any>; // TODO: see if we can improve it

  /** Override for theme site variables to allow modifications of component styling via themes. */
  variables?: ComponentVariablesInput;
};

export const defaultPerformanceFlags: StylesContextPerformance = {
  enableSanitizeCssPlugin: process.env.NODE_ENV !== 'production',
  enableStylesCaching: true,
  enableVariablesCaching: true,
  enableBooleanVariablesCaching: false,
};

const defaultContext: StylesContextValue<{ renderRule: RendererRenderRule }> = {
  disableAnimations: false,
  performance: defaultPerformanceFlags,
  renderer: { renderRule: () => '' },
  theme: emptyTheme,
  telemetry: undefined,
};

const useStyles = <StyleProps extends PrimitiveProps>(
  displayName: string,
  options: UseStylesOptions<StyleProps>,
): UseStylesResult => {
  const context: StylesContextValue<{ renderRule: RendererRenderRule }> =
    React.useContext(ThemeContext) || defaultContext;

  const {
    className = process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
    mapPropsToStyles = () => ({} as StyleProps),
    mapPropsToInlineStyles = () => ({} as InlineStyleProps<StyleProps>),
    rtl = false,
  } = options;

  // Stores debug information for component.
  const debug = React.useRef<{ fluentUIDebug: DebugData | null }>({ fluentUIDebug: null });
  const { classes, styles: resolvedStyles } = getStyles({
    // Input values
    className,
    displayNames: [displayName],
    props: {
      ...mapPropsToStyles(),
      ...mapPropsToInlineStyles(),
    },

    // Context values
    disableAnimations: context.disableAnimations,
    renderer: context.renderer,
    rtl,
    saveDebug: fluentUIDebug => (debug.current = { fluentUIDebug }),
    theme: context.theme,
    performance: context.performance,
    telemetry: context.telemetry,
  });

  return { classes, styles: resolvedStyles };
};

export default useStyles;
