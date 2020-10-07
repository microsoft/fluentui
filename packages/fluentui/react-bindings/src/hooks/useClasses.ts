/* eslint-disable */

import hash from '@emotion/hash';
import { RendererParam } from '@fluentui/react-northstar-styles-renderer';
import {
  ComponentSlotStyle,
  ComponentSlotStylesInput,
  ComponentSlotStylesPrepared,
  ComponentStyleFunctionParam,
  ComponentVariablesInput,
  ComponentVariablesObject,
  ICSSInJSStyle,
  mergeComponentStyles,
  withDebugId,
} from '@fluentui/styles';
import cx from 'classnames';
import * as _ from 'lodash';

import { useFluentContext } from '../context';
import { ComponentDesignProp, PrimitiveProps } from '../styles/types';

type UseStylesOptions<StyleProps extends PrimitiveProps> = {
  /** A classname that will be added by default to all instances of a component on the `root` slot. */
  className?: string;

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

export const useClasses = <StyleProps extends PrimitiveProps>(
  displayName: string,
  options: UseStylesOptions<StyleProps>,
): string => {
  const { disableAnimations, performance: performanceFlags, telemetry, theme, renderer, rtl } = useFluentContext();
  const {
    className: componentClassName = process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
    mapPropsToStyles = () => ({} as StyleProps),
    mapPropsToInlineStyles = () => ({} as InlineStyleProps<StyleProps>),
  } = options;

  const componentStylesProps = mapPropsToStyles();
  const inlineStylesProps = mapPropsToInlineStyles();

  //
  // To compute styles we are going through three stages:
  // - resolve variables (siteVariables => componentVariables + props.variables)
  // - resolve styles (with resolvedVariables & props.styles & props.design)
  // - compute classes (with resolvedStyles)
  // - conditionally add sources for evaluating debug information to component

  const telemetryVariablesStart = telemetry?.enabled ? performance.now() : 0;

  let resolvedVariablesHash: string = '';
  let resolvedVariables: ComponentVariablesObject = {};

  if (typeof theme.componentVariables[displayName] === 'function') {
    // @ts-ignore
    if (theme.componentVariables[displayName].__hash) {
      // @ts-ignore
      resolvedVariables = theme.componentVariables[displayName].__resolved;
      // @ts-ignore
      resolvedVariablesHash = theme.componentVariables[displayName].__hash;
    } else {
      resolvedVariables = theme.componentVariables[displayName](theme.siteVariables);
      resolvedVariablesHash = hash(JSON.stringify(resolvedVariables));

      // @ts-ignore
      theme.componentVariables[displayName].__resolved = resolvedVariables;
      // @ts-ignore
      theme.componentVariables[displayName].__hash = resolvedVariablesHash;
    }
  } else if (typeof theme.componentVariables[displayName] !== 'undefined') {
    throw new Error();
  }

  if (telemetry?.enabled && telemetry.performance[displayName]) {
    telemetry.performance[displayName].msResolveVariablesTotal += performance.now() - telemetryVariablesStart;
  }

  const { className, design, styles, variables } = inlineStylesProps;
  const noInlineStylesOverrides = !(design || styles);

  let noVariableOverrides = performanceFlags.enableBooleanVariablesCaching || !variables;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    if (!performanceFlags.enableStylesCaching && performanceFlags.enableBooleanVariablesCaching) {
      throw new Error(
        '@fluentui/react-northstar: Please check your "performance" settings on "Provider", to enable "enableBooleanVariablesCaching" you need to enable "enableStylesCaching"',
      );
    }
  }

  if (performanceFlags.enableBooleanVariablesCaching) {
    if (_.isPlainObject(variables)) {
      const hasOnlyBooleanVariables = Object.keys(variables).every(
        variableName =>
          variables[variableName] === null ||
          typeof variables[variableName] === 'undefined' ||
          typeof variables[variableName] === 'boolean',
      );

      if (!hasOnlyBooleanVariables) {
        noVariableOverrides = false;
      }
    } else if (!_.isNil(variables)) {
      noVariableOverrides = false;
    }
  }

  const cacheEnabled = performanceFlags.enableStylesCaching && noInlineStylesOverrides && noVariableOverrides;

  // Merge theme styles with inline overrides if any
  let mergedStyles: ComponentSlotStylesPrepared;

  if (noInlineStylesOverrides) {
    mergedStyles = theme.componentStyles[displayName];
  } else {
    mergedStyles = mergeComponentStyles(
      theme.componentStyles[displayName],
      design && withDebugId({ root: design }, 'props.design'),
      styles && withDebugId({ root: styles } as ComponentSlotStylesInput, 'props.styles'),
    );
  }

  const styleParam: ComponentStyleFunctionParam = {
    disableAnimations,
    props: componentStylesProps,
    theme,
    rtl,
    variables: resolvedVariables,
  };

  // Heads Up! Keep in sync with Design.tsx render logic
  const rendererParam: RendererParam = {
    direction: rtl ? 'rtl' : 'ltr',
    disableAnimations,
    displayName, // does not affect styles, only used by useEnhancedRenderer in docs
    sanitizeCss: performanceFlags.enableSanitizeCssPlugin,
  };

  const propsCacheKey = cacheEnabled ? JSON.stringify(componentStylesProps) : '';
  const variablesCacheKey =
    cacheEnabled && performanceFlags.enableBooleanVariablesCaching ? JSON.stringify(variables) : '';
  const componentCacheKey = cacheEnabled
    ? `${displayName}:${propsCacheKey}:${variablesCacheKey}:${styleParam.rtl}${styleParam.disableAnimations}${resolvedVariablesHash}`
    : '';

  let resolvedStyles: ICSSInJSStyle;
  const telemetryStylesStart = telemetry?.enabled ? performance.now() : 0;

  if (cacheEnabled && noInlineStylesOverrides) {
    // @ts-ignore
    if (mergedStyles.root[componentCacheKey]) {
      // @ts-ignore
      resolvedStyles = mergedStyles.root[componentCacheKey];
    } else {
      resolvedStyles = mergedStyles.root(styleParam);
      // @ts-ignore
      mergedStyles.root[componentCacheKey] = resolvedStyles;
    }
  } else {
    resolvedStyles = mergedStyles.root(styleParam);
  }

  if (telemetry?.enabled && telemetry.performance[displayName]) {
    telemetry.performance[displayName].msResolveStylesTotal += performance.now() - telemetryStylesStart;
  }

  let classes: string = '';
  const telemetryClassesStart = telemetry?.enabled ? performance.now() : 0;

  if (cacheEnabled && noInlineStylesOverrides) {
    // @ts-ignore
    if (mergedStyles.root[componentCacheKey + 'classes']) {
      // @ts-ignore
      classes = mergedStyles.root[componentCacheKey + 'classes'];

      if (telemetry?.performance[displayName]) {
        telemetry.performance[displayName].stylesRootCacheHits++;
      }
    } else {
      classes = renderer.renderRule(resolvedStyles, rendererParam);
      // @ts-ignore
      mergedStyles.root[componentCacheKey + 'classes'] = classes;
    }
  } else {
    classes = renderer.renderRule(resolvedStyles, rendererParam);
  }

  if (telemetry?.performance[displayName]) {
    telemetry.performance[displayName].msRenderStylesTotal += performance.now() - telemetryClassesStart;
  }

  return cx(componentClassName, classes, className);
};
