import { ComposePreparedOptions } from '@fluentui/react-compose';
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
  StylesContextValue,
} from '../styles/types';
import getStyles from '../styles/getStyles';

type UseStylesOptions<StyleProps extends PrimitiveProps> = {
  /** A classname that will be added by default to all instances of a component on the `root` slot. */
  className?: string;

  /** An options from compose(), should be used only if component was created by `compose()`. */
  composeOptions?: ComposePreparedOptions;

  /**
   * A mapping from component's props to styles functions props. Can be only primitive types as they will be used for
   * cache keys.
   */
  mapPropsToStyles?: () => StyleProps;

  /**
   * A set props of that contain mapping for props that perform inline styles overrides, for example `styles` or
   * `variables`.
   */
  mapPropsToInlineStyles?: () => InlineStyleProps<StyleProps>;

  /**
   * All components props, should be used only if component was created by `compose()`. Will be replaced in future with
   * better approach.
   */
  unstable_props?: Record<string, any>;

  /** A current mode for text direction (ltr or rtl). */
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

const defaultContext: StylesContextValue<{ renderRule: RendererRenderRule }> = {
  rtl: false,
  disableAnimations: false,
  performance: {
    enableSanitizeCssPlugin: process.env.NODE_ENV !== 'production',
    enableStylesCaching: true,
    enableVariablesCaching: true,
    enableBooleanVariablesCaching: false,
  },
  renderer: { renderRule: () => '' },
  theme: emptyTheme,
};

const useStyles = <StyleProps extends PrimitiveProps>(
  displayName: string,
  options: UseStylesOptions<StyleProps>,
): UseStylesResult => {
  const context: StylesContextValue<{ renderRule: RendererRenderRule }> =
    React.useContext(ThemeContext) || defaultContext;

  const {
    className = process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
    composeOptions,
    mapPropsToStyles = () => ({} as StyleProps),
    mapPropsToInlineStyles = () => ({} as InlineStyleProps<StyleProps>),
    unstable_props = {},
    rtl = false,
  } = options;
  const componentStylesProps = mapPropsToStyles();

  // `composeProps` should include all props including stylesProps as they can contain state
  const composeProps = { ...unstable_props, ...componentStylesProps };
  const composeStylesProps = composeOptions?.mapPropsToStylesPropsChain?.reduce(
    (acc, fn) => ({ ...acc, ...fn(composeProps) }),
    {},
  );

  // Stores debug information for component.
  const debug = React.useRef<{ fluentUIDebug: DebugData | null }>({ fluentUIDebug: null });
  const { classes, styles: resolvedStyles } = getStyles({
    // Input values
    className: composeOptions?.className || className,
    displayNames: composeOptions?.displayNames || [displayName],
    props: {
      ...componentStylesProps,
      ...mapPropsToInlineStyles(),
      ...composeStylesProps,
    },

    // Context values
    disableAnimations: context.disableAnimations,
    renderer: context.renderer,
    rtl,
    saveDebug: fluentUIDebug => (debug.current = { fluentUIDebug }),
    theme: context.theme,
    performance: context.performance,
  });

  return { classes, styles: resolvedStyles };
};

export default useStyles;
