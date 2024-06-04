import { ComposePreparedOptions } from '../compose';
import { ComponentSlotStyle, ComponentSlotStylesResolved, ComponentVariablesInput, DebugData } from '@fluentui/styles';
import * as React from 'react';
import cx from 'classnames';

import { useFluentContext } from '../context';
import { ComponentDesignProp, ComponentSlotClasses, PrimitiveProps } from '../styles/types';
import { getStyles } from '../styles/getStyles';

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
  mapPropsToInlineStyles?: () => InlineStyleProps<any>;

  /**
   * All components props, should be used only if component was created by `compose()`. Will be replaced in future with
   * better approach.
   */
  unstable_props?: Record<string, any>;

  /** A current mode for text direction (ltr or rtl). */
  rtl?: boolean;

  unstyled?: boolean;
};

export type UseStylesResult = {
  classes: ComponentSlotClasses;
  styles: ComponentSlotStylesResolved;
};

type InlineStyleProps<ComponentProps extends {}> = {
  /** Additional CSS class name(s) to apply.  */
  className?: string;

  design?: ComponentDesignProp;

  /** Additional CSS styles to apply to the component instance.  */
  styles?: ComponentSlotStyle<ComponentProps, any>; // TODO: see if we can improve it

  /** Override for theme site variables to allow modifications of component styling via themes. */
  variables?: ComponentVariablesInput;
};

export const useStyles = <StyleProps extends PrimitiveProps>(
  displayName: string,
  options: UseStylesOptions<StyleProps>,
): UseStylesResult => {
  const context = useFluentContext();

  // Stores debug information for component.
  const debug = React.useRef<{ fluentUIDebug: DebugData | null }>({ fluentUIDebug: null });

  if (options.unstyled) {
    const componentClassName = options.composeOptions?.className || options.className;
    const classNameProp = options.mapPropsToInlineStyles?.().className;
    return { classes: { root: cx(componentClassName, classNameProp) }, styles: {} };
  }

  const {
    className = process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
    composeOptions,
    mapPropsToStyles = () => ({} as StyleProps),
    mapPropsToInlineStyles = () => ({} as InlineStyleProps<any>),
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

  const { classes, styles: resolvedStyles } = getStyles({
    // Input values
    allDisplayNames: composeOptions?.displayNames || [displayName],
    className: composeOptions?.className || className,
    primaryDisplayName: composeOptions?.displayName || displayName,
    componentProps: {
      ...componentStylesProps,
      ...composeStylesProps,
    },
    inlineStylesProps: mapPropsToInlineStyles(),

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
