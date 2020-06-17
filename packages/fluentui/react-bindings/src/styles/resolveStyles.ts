import cx from 'classnames';
import {
  ComponentSlotStylesInput,
  ComponentSlotStylesPrepared,
  ComponentSlotStylesResolved,
  ComponentStyleFunctionParam,
  ComponentVariablesObject,
  ICSSInJSStyle,
  isDebugEnabled,
  mergeComponentStyles,
  ThemePrepared,
  withDebugId,
} from '@fluentui/styles';
import { ComponentSlotClasses, RendererParam, ResolveStylesOptions } from '@fluentui/react-bindings';
import * as _ from 'lodash';
import { serializeStyles } from '@emotion/serialize';

export type ResolveStylesResult = {
  resolvedStyles: ComponentSlotStylesResolved;
  resolvedStylesDebug: Record<string, { styles: Object }[]>;
  classes: ComponentSlotClasses;
};

// this weak map is used as cache for the classes
const classesCache = new WeakMap<ThemePrepared, Record<string, string>>();

// this weak map is used as cache for the styles
const stylesCache = new WeakMap<ThemePrepared, Record<string, ICSSInJSStyle>>();

/**
 * Both resolvedStyles and classes are objects of getters with lazy evaluation
 *
 * Additionally if the cacheEnabled option is provided, than the resolved styles
 * and classes are caching the results in WeakMaps. The key of the maps contains the following:
 * - theme
 * - displayName
 * - slot name
 * - styling props
 * - rtl mode
 * - disable animations mode
 */
const resolveStyles = (
  options: ResolveStylesOptions,
  resolvedVariables: ComponentVariablesObject,
  renderStylesInput?: (styles: ICSSInJSStyle) => string,
): ResolveStylesResult => {
  const {
    className: componentClassName,
    theme,
    displayNames,
    props,
    rtl,
    disableAnimations,
    renderer,
    performance: performanceFlags,
    telemetry,
  } = options;

  const { className, design, styles, variables, ...stylesProps } = props;
  const noInlineStylesOverrides = !styles;

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

  if (displayNames.length === 1) {
    mergedStyles = theme.componentStyles[displayNames[0]] || { root: () => ({}) };
  } else {
    mergedStyles = mergeComponentStyles(...displayNames.map(displayName => theme.componentStyles[displayName]));
  }

  if (!noInlineStylesOverrides) {
    mergedStyles = mergeComponentStyles(
      mergedStyles,
      props.design && withDebugId({ root: props.design }, 'props.design'),
      props.styles && withDebugId({ root: props.styles } as ComponentSlotStylesInput, 'props.styles'),
    );
  }

  const styleParam: ComponentStyleFunctionParam = {
    props,
    variables: resolvedVariables,
    theme,
    rtl,
    disableAnimations,
  };

  // Fela plugins rely on `direction` param in `theme` prop instead of RTL
  // Our API should be aligned with it
  // Heads Up! Keep in sync with Design.tsx render logic
  const direction = rtl ? 'rtl' : 'ltr';
  const felaParam: RendererParam = {
    theme: { direction },
    disableAnimations,
    displayName: displayNames.join(':'), // does not affect styles, only used by useEnhancedRenderer in docs
    sanitizeCss: performanceFlags.enableSanitizeCssPlugin,
  };

  const renderStyles = renderStylesInput || ((style: ICSSInJSStyle) => renderer.renderRule(() => style, felaParam));

  const resolvedStyles: Record<string, ICSSInJSStyle> = {};
  const resolvedStylesDebug: Record<string, { styles: Object }[]> = {};
  const classes: Record<string, string> = {};

  if (cacheEnabled && theme) {
    if (!stylesCache.has(theme)) {
      stylesCache.set(theme, {});
    }
    if (!classesCache.has(theme)) {
      classesCache.set(theme, {});
    }
  }

  const propsCacheKey = cacheEnabled ? JSON.stringify(stylesProps) : '';
  const variablesCacheKey =
    cacheEnabled && performanceFlags.enableBooleanVariablesCaching ? JSON.stringify(variables) : '';
  const componentCacheKey = cacheEnabled
    ? `${displayNames.join(':')}:${propsCacheKey}:${variablesCacheKey}:${styleParam.rtl}${styleParam.disableAnimations}`
    : '';

  Object.keys(mergedStyles).forEach(slotName => {
    // resolve/render slot styles once and cache
    const lazyEvaluationKey = `${slotName}__return`;
    const slotCacheKey = componentCacheKey + slotName;

    Object.defineProperty(resolvedStyles, slotName, {
      enumerable: false,
      configurable: false,
      set(val: ICSSInJSStyle) {
        // Add to the cache if it's enabled
        if (cacheEnabled && theme) {
          stylesCache.set(theme, {
            ...stylesCache.get(theme),
            [slotCacheKey]: val,
          });
        }

        resolvedStyles[lazyEvaluationKey] = val;
      },
      get(): ICSSInJSStyle {
        // If caching enabled and entry exists, get from cache, avoid lazy evaluation
        if (cacheEnabled && theme) {
          const stylesThemeCache = stylesCache.get(theme) || {};
          if (stylesThemeCache[slotCacheKey]) {
            return stylesThemeCache[slotCacheKey];
          }
        }

        if (resolvedStyles[lazyEvaluationKey]) {
          return resolvedStyles[lazyEvaluationKey];
        }

        const telemetryPartStart = telemetry?.enabled ? performance.now() : 0;

        // resolve/render slot styles once and cache
        resolvedStyles[lazyEvaluationKey] = mergedStyles[slotName](styleParam);

        if (cacheEnabled && theme) {
          stylesCache.set(theme, {
            ...stylesCache.get(theme),
            [slotCacheKey]: resolvedStyles[lazyEvaluationKey],
          });
        }

        if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
          resolvedStylesDebug[slotName] = resolvedStyles[slotName]['_debug'];
          delete resolvedStyles[slotName]['_debug'];
        }

        if (telemetry?.enabled && telemetry.performance[displayNames[0]]) {
          telemetry.performance[displayNames[0]].msResolveStylesTotal += performance.now() - telemetryPartStart;
        }

        return resolvedStyles[lazyEvaluationKey];
      },
    });

    Object.defineProperty(classes, slotName, {
      enumerable: false,
      configurable: false,
      set(val: string) {
        if (cacheEnabled && theme) {
          classesCache.set(theme, {
            ...classesCache.get(theme),
            [slotCacheKey]: val,
          });
        }

        classes[lazyEvaluationKey] = val;
      },
      get(): string {
        let designClassName = '';
        if (slotName === 'root' && design) {
          const serializedValue = serializeStyles([design as any], {}, styleParam);
          designClassName = `design-${serializedValue.name}`;
          renderer.renderGlobal(serializedValue.styles, `.${componentClassName}.${designClassName}`);
        }

        if (cacheEnabled && theme) {
          const classesThemeCache = classesCache.get(theme) || {};

          //
          // Cached styles
          //

          if (classesThemeCache[slotCacheKey] || classesThemeCache[slotCacheKey] === '') {
            if (telemetry?.performance[displayNames[0]]) {
              if (slotName === 'root') {
                telemetry.performance[displayNames[0]].stylesRootCacheHits++;
              } else {
                telemetry.performance[displayNames[0]].stylesSlotsCacheHits++;
              }
            }

            return slotName === 'root'
              ? cx(componentClassName, classesThemeCache[slotCacheKey], designClassName, className)
              : classesThemeCache[slotCacheKey];
          }
        }

        //
        // Lazy eval
        //

        if (classes[lazyEvaluationKey]) {
          return slotName === 'root'
            ? cx(componentClassName, classes[lazyEvaluationKey], designClassName, className)
            : classes[lazyEvaluationKey];
        }

        // this resolves the getter magic
        const styleObj = resolvedStyles[slotName];
        const telemetryPartStart = telemetry?.enabled ? performance.now() : 0;

        if (renderStyles && styleObj) {
          classes[lazyEvaluationKey] = renderStyles(styleObj);

          if (cacheEnabled && theme) {
            classesCache.set(theme, {
              ...classesCache.get(theme),
              [slotCacheKey]: classes[lazyEvaluationKey],
            });
          }
        }

        const resultClassName =
          slotName === 'root'
            ? cx(componentClassName, classes[lazyEvaluationKey], designClassName, className)
            : classes[lazyEvaluationKey];

        if (telemetry?.enabled && telemetry.performance[displayNames[0]]) {
          telemetry.performance[displayNames[0]].msRenderStylesTotal += performance.now() - telemetryPartStart;
        }

        return resultClassName;
      },
    });
  });

  return {
    resolvedStyles,
    resolvedStylesDebug,
    classes,
  };
};

export default resolveStyles;
