import {
  AccessibilityActionHandlers,
  ComponentSlotClasses,
  FocusZone,
  getElementType,
  deprecated_getTelemetry as getTelemetry,
  getUnhandledProps,
  ReactAccessibilityBehavior,
  unstable_getAccessibility as getAccessibility,
  unstable_getStyles as getStyles,
  ProviderContextPrepared,
} from '@fluentui/react-bindings';
import { noopRenderer } from '@fluentui/react-northstar-styles-renderer';
import {
  emptyTheme,
  ComponentSlotStylesResolved,
  ComponentVariablesObject,
  DebugData,
  PropsWithVarsAndStyles,
  ThemePrepared,
} from '@fluentui/styles';
import * as _ from 'lodash';
import * as React from 'react';

import { Props } from '../types';
import { logProviderMissingWarning } from './providerMissingHandler';

export interface RenderResultConfig<P> {
  ElementType: React.ElementType<P>;
  classes: ComponentSlotClasses;
  unhandledProps: Props;
  variables: ComponentVariablesObject;
  styles: ComponentSlotStylesResolved;
  accessibility: ReactAccessibilityBehavior;
  rtl: boolean;
  theme: ThemePrepared;
}

export type RenderComponentCallback<P> = (config: RenderResultConfig<P>) => any;

export interface RenderConfig<P> {
  className?: string;
  displayName: string;
  handledProps: string[];
  props: PropsWithVarsAndStyles;
  state: Record<string, any>;
  actionHandlers: AccessibilityActionHandlers;
  render: RenderComponentCallback<P>;
  saveDebug: (debug: DebugData | null) => void;
  isFirstRenderRef: React.MutableRefObject<boolean>;
}

export const renderComponent = <P extends {}>(
  config: RenderConfig<P>,
  context?: ProviderContextPrepared,
): React.ReactElement<P> => {
  const { className, displayName, handledProps, props, state, actionHandlers, render, saveDebug = () => {} } = config;

  if (_.isEmpty(context)) {
    logProviderMissingWarning();
  }

  const { setStart, setEnd } = getTelemetry(displayName, context.telemetry, config.isFirstRenderRef);
  const rtl = context.rtl || false;

  setStart();

  const ElementType = getElementType(props) as React.ReactType<P>;
  const unhandledProps = getUnhandledProps(handledProps, props);
  const stateAndProps = { ...state, ...props };

  const accessibility: ReactAccessibilityBehavior = getAccessibility(
    displayName,
    props.accessibility,
    stateAndProps,
    rtl,
    actionHandlers,
  );
  const { classes, variables, styles, theme } = getStyles({
    allDisplayNames: [displayName],
    className,
    disableAnimations: context.disableAnimations || false,
    primaryDisplayName: displayName,
    componentProps: stateAndProps,
    inlineStylesProps: stateAndProps,
    renderer: context.renderer || noopRenderer,
    rtl,
    saveDebug,
    theme: context.theme || emptyTheme,
    performance: {
      ...context.performance,
      // we cannot enable caching for class components
      enableStylesCaching: false,
      enableBooleanVariablesCaching: false,
    },
    telemetry: context.telemetry,
  });

  const resolvedConfig: RenderResultConfig<P> = {
    ElementType,
    unhandledProps,
    classes,
    variables,
    styles,
    accessibility,
    rtl,
    theme,
  };

  if (accessibility.focusZone) {
    const originalElementType = resolvedConfig.ElementType;

    resolvedConfig.ElementType = FocusZone as any;
    resolvedConfig.unhandledProps = {
      ...resolvedConfig.unhandledProps,
      ...accessibility.focusZone.props,
    };
    resolvedConfig.unhandledProps.as = originalElementType;
    resolvedConfig.unhandledProps.isRtl = resolvedConfig.rtl;
  }

  const element = render(resolvedConfig);
  setEnd();

  return element;
};
