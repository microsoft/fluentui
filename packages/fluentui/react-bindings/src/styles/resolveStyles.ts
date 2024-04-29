import { RendererParam } from '@fluentui/react-northstar-styles-renderer';
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
import cx from 'classnames';
import * as _ from 'lodash';

import { ComponentSlotClasses, ResolveStylesOptions } from './types';

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
export const resolveStyles = (
  options: ResolveStylesOptions,
  resolvedVariables: ComponentVariablesObject,
): ResolveStylesResult => {
  const {
    allDisplayNames,
    className: componentClassName,
    theme,
    primaryDisplayName,
    componentProps,
    inlineStylesProps,
    rtl,
    disableAnimations,
    renderer,
    performance: performanceFlags,
    telemetry,
  } = options;

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

  if (allDisplayNames.length === 1) {
    mergedStyles = theme.componentStyles[allDisplayNames[0]] || { root: () => ({}) };
  } else {
    const styles = allDisplayNames.map(displayName => theme.componentStyles[displayName]).filter(Boolean);

    if (styles.length > 0) {
      mergedStyles = styles.reduce<ComponentSlotStylesPrepared>((acc, styles) => {
        return mergeComponentStyles(acc, styles);
      }, {});
    } else {
      mergedStyles = { root: () => ({}) };
    }
  }

  if (!noInlineStylesOverrides) {
    mergedStyles = mergeComponentStyles(
      mergedStyles,
      mergeComponentStyles(
        design && withDebugId({ root: design } as ComponentSlotStylesInput, 'props.design'),
        styles && withDebugId({ root: styles } as ComponentSlotStylesInput, 'props.styles'),
      ),
    );
  }

  const styleParam: ComponentStyleFunctionParam = {
    props: componentProps,
    variables: resolvedVariables,
    theme,
    rtl,
    disableAnimations,
  };

  // Heads Up! Keep in sync with Design.tsx render logic
  const rendererParam: RendererParam = {
    direction: rtl ? 'rtl' : 'ltr',
    disableAnimations,
    displayName: allDisplayNames.join(':'), // does not affect styles, only used by useEnhancedRenderer in docs
    sanitizeCss: performanceFlags.enableSanitizeCssPlugin,
  };

  const resolvedStylesDebug: Record<string, { styles: Object }[]> = {};

  if (cacheEnabled && theme) {
    if (!stylesCache.has(theme)) {
      stylesCache.set(theme, {});
    }
    if (!classesCache.has(theme)) {
      classesCache.set(theme, {});
    }
  }

  const propsCacheKey = cacheEnabled ? JSON.stringify(componentProps) : '';
  const variablesCacheKey =
    cacheEnabled && performanceFlags.enableBooleanVariablesCaching ? JSON.stringify(variables) : '';
  const componentCacheKey = cacheEnabled
    ? `${allDisplayNames.join(':')}:${propsCacheKey}:${variablesCacheKey}:${styleParam.rtl}${
        styleParam.disableAnimations
      }`
    : '';

  if (typeof Proxy === 'undefined') {
    //
    //
    // IE11 branch of code, feel free to remove later.
    // Keep it sync with another branch below!
    //
    //

    const resolvedStyles: Record<string, ICSSInJSStyle> = {};
    const classes: Record<string, string> = {};

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
            resolvedStylesDebug[slotName] = (resolvedStyles[slotName] as any)?.['_debug'];
            delete (resolvedStyles[slotName] as any)?.['_debug'];
          }

          if (telemetry?.enabled && telemetry.performance[primaryDisplayName]) {
            telemetry.performance[primaryDisplayName].msResolveStylesTotal += performance.now() - telemetryPartStart;
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
          if (cacheEnabled && theme) {
            const classesThemeCache = classesCache.get(theme) || {};

            //
            // Cached styles
            //

            if (classesThemeCache[slotCacheKey] || classesThemeCache[slotCacheKey] === '') {
              if (telemetry?.performance[primaryDisplayName]) {
                if (slotName === 'root') {
                  telemetry.performance[primaryDisplayName].stylesRootCacheHits++;
                } else {
                  telemetry.performance[primaryDisplayName].stylesSlotsCacheHits++;
                }
              }

              return slotName === 'root'
                ? cx(componentClassName, classesThemeCache[slotCacheKey], className)
                : classesThemeCache[slotCacheKey];
            }
          }

          //
          // Lazy eval
          //

          if (classes[lazyEvaluationKey]) {
            return slotName === 'root'
              ? cx(componentClassName, classes[lazyEvaluationKey], className)
              : classes[lazyEvaluationKey];
          }

          // this resolves the getter magic
          const styleObj = resolvedStyles[slotName];
          const telemetryPartStart = telemetry?.enabled ? performance.now() : 0;

          if (styleObj) {
            classes[lazyEvaluationKey] = renderer.renderRule(styleObj, rendererParam);

            if (cacheEnabled && theme) {
              classesCache.set(theme, {
                ...classesCache.get(theme),
                [slotCacheKey]: classes[lazyEvaluationKey],
              });
            }
          }

          const resultClassName =
            slotName === 'root'
              ? cx(componentClassName, classes[lazyEvaluationKey], className)
              : classes[lazyEvaluationKey];

          if (telemetry?.enabled && telemetry.performance[primaryDisplayName]) {
            telemetry.performance[primaryDisplayName].msRenderStylesTotal += performance.now() - telemetryPartStart;
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
  }

  const resolvedStyles = new Proxy<Record<string, ICSSInJSStyle>>(
    {},
    {
      get(target, slotName: string) {
        const slotCacheKey = componentCacheKey + slotName;

        // If caching enabled and entry exists, get from cache, avoid lazy evaluation
        if (cacheEnabled && theme) {
          const stylesThemeCache = stylesCache.get(theme) || {};
          if (stylesThemeCache[slotCacheKey]) {
            return stylesThemeCache[slotCacheKey];
          }
        }

        if (target[slotName]) {
          return target[slotName];
        }

        const telemetryPartStart = telemetry?.enabled ? performance.now() : 0;

        // resolve/render slot styles once and cache
        target[slotName] = mergedStyles[slotName]?.(styleParam);

        if (cacheEnabled && theme) {
          stylesCache.set(theme, {
            ...stylesCache.get(theme),
            [slotCacheKey]: target[slotName],
          });
        }

        if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
          resolvedStylesDebug[slotName] = (target[slotName] as any)?.['_debug'];
          delete (target[slotName] as any)?.['_debug'];
        }

        if (telemetry?.enabled && telemetry.performance[primaryDisplayName]) {
          telemetry.performance[primaryDisplayName].msResolveStylesTotal += performance.now() - telemetryPartStart;
        }

        return target[slotName];
      },
    },
  );
  const classes = new Proxy<Record<string, string>>(
    {},
    {
      get(target, slotName: string) {
        const slotCacheKey = componentCacheKey + slotName;

        if (cacheEnabled && theme) {
          const classesThemeCache = classesCache.get(theme) || {};

          //
          // Cached styles
          //

          if (classesThemeCache[slotCacheKey] || classesThemeCache[slotCacheKey] === '') {
            if (telemetry?.performance[primaryDisplayName]) {
              if (slotName === 'root') {
                telemetry.performance[primaryDisplayName].stylesRootCacheHits++;
              } else {
                telemetry.performance[primaryDisplayName].stylesSlotsCacheHits++;
              }
            }

            return slotName === 'root'
              ? cx(componentClassName, classesThemeCache[slotCacheKey], className)
              : classesThemeCache[slotCacheKey];
          }
        }

        //
        // Lazy eval
        //

        if (target[slotName]) {
          return slotName === 'root' ? cx(componentClassName, target[slotName], className) : target[slotName];
        }

        // this resolves the getter magic
        const styleObj = resolvedStyles[slotName];
        const telemetryPartStart = telemetry?.enabled ? performance.now() : 0;

        if (styleObj) {
          target[slotName] = renderer.renderRule(styleObj, rendererParam);

          if (cacheEnabled && theme) {
            classesCache.set(theme, {
              ...classesCache.get(theme),
              [slotCacheKey]: target[slotName],
            });
          }
        }

        const resultClassName =
          slotName === 'root' ? cx(componentClassName, target[slotName], className) : target[slotName];

        if (telemetry?.enabled && telemetry.performance[primaryDisplayName]) {
          telemetry.performance[primaryDisplayName].msRenderStylesTotal += performance.now() - telemetryPartStart;
        }

        return resultClassName;
      },
    },
  );

  return {
    resolvedStyles,
    resolvedStylesDebug,
    classes,
  };
};
