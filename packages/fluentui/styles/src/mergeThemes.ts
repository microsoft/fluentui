import * as _ from 'lodash';

import { callable } from './callable';
import {
  ComponentSlotStyle,
  ComponentSlotStylesInput,
  ComponentSlotStylesPrepared,
  ComponentVariablesInput,
  ComponentVariablesPrepared,
  FontFace,
  SiteVariablesInput,
  SiteVariablesPrepared,
  StaticStyle,
  ThemeAnimation,
  ThemeComponentStylesInput,
  ThemeComponentStylesPrepared,
  ThemeComponentVariablesInput,
  ThemeComponentVariablesPrepared,
  ThemeInput,
  ThemePrepared,
} from './types';

import { isEnabled as isDebugEnabled } from './debugEnabled';
import { deepmerge } from './deepmerge';
import { objectKeyToValues } from './objectKeysToValues';
import { toCompactArray } from './toCompactArray';
import { withDebugId } from './withDebugId';

export const emptyTheme: ThemePrepared = {
  siteVariables: {
    fontSizes: {},
  },
  componentVariables: {},
  componentStyles: {},
  fontFaces: [],
  staticStyles: [],
  animations: {},
};

// ----------------------------------------
// Component level merge functions
// ----------------------------------------

/**
 * Merges a single component's styles (keyed by component part) with another component's styles.
 */
export const mergeComponentStyles__PROD = (
  ...sources: (ComponentSlotStylesInput | null | undefined)[]
): ComponentSlotStylesPrepared => {
  const initial: ComponentSlotStylesPrepared = {};

  return sources.reduce<ComponentSlotStylesPrepared>((partStylesPrepared, stylesByPart) => {
    // The of "[].forEach()" instead of "_.forEach" has zero sense, but somehow it solves a reported memory leak.
    // There is no 100% confidence that it actually fixes anything.
    if (_.isPlainObject(stylesByPart)) {
      Object.keys(stylesByPart).forEach(partName => {
        const partStyle = stylesByPart[partName];

        // Break references to avoid an infinite loop.
        // We are replacing functions with a new ones that calls the originals.
        const originalTarget = partStylesPrepared[partName];
        const originalSource = partStyle;

        // if there is no source, merging is a no-op, skip it
        if (
          typeof originalSource === 'undefined' ||
          originalSource === null ||
          (typeof originalSource === 'object' && Object.keys(originalSource).length === 0)
        ) {
          return;
        }

        // no target means source doesn't need to merge onto anything
        // just ensure source is callable (prepared format)
        if (typeof originalTarget === 'undefined') {
          partStylesPrepared[partName] = callable(originalSource);
          return;
        }

        // We have both target and source, replace with merge fn
        partStylesPrepared[partName] = styleParam => {
          // originalTarget is always prepared, fn is guaranteed
          return _.merge(originalTarget(styleParam), callable(originalSource)(styleParam));
        };
      });
    }

    return partStylesPrepared;
  }, initial);
};

export const mergeComponentStyles__DEV = (
  ...sources: (ComponentSlotStylesInput | null | undefined)[]
): ComponentSlotStylesPrepared => {
  if (!isDebugEnabled) {
    return mergeComponentStyles__PROD(...sources);
  }
  const initial: ComponentSlotStylesPrepared = {};

  return sources.reduce<ComponentSlotStylesPrepared>((partStylesPrepared, stylesByPart) => {
    _.forEach(stylesByPart, (partStyle, partName) => {
      // Break references to avoid an infinite loop.
      // We are replacing functions with a new ones that calls the originals.
      const originalTarget = partStylesPrepared[partName];
      const originalSource = partStyle;

      // if there is no source, merging is a no-op, skip it
      if (
        typeof originalSource === 'undefined' ||
        originalSource === null ||
        (typeof originalSource === 'object' && Object.keys(originalSource).length === 0)
      ) {
        return;
      }

      // no target means source doesn't need to merge onto anything
      // just ensure source is callable (prepared format) and has _debug
      if (typeof originalTarget === 'undefined') {
        partStylesPrepared[partName] = styleParam => {
          // originalTarget is always prepared, fn is guaranteed, _debug always exists
          const { _debug = undefined, ...styles } = callable(originalSource)(styleParam) || {};

          // new object required to prevent circular JSON structure error in <Debug />
          return {
            ...styles,
            _debug: _debug || [{ styles: { ...styles }, debugId: stylesByPart._debugId }],
          };
        };

        return;
      }

      // We have both target and source, replace with merge fn
      partStylesPrepared[partName] = styleParam => {
        // originalTarget is always prepared, fn is guaranteed, _debug always exists
        const { _debug: targetDebug, ...targetStyles } = originalTarget(styleParam);
        const { _debug: sourceDebug = undefined, ...sourceStyles } = callable(originalSource)(styleParam) || {};

        const merged = _.merge(targetStyles, sourceStyles);
        merged._debug = targetDebug.concat(sourceDebug || { styles: sourceStyles, debugId: stylesByPart._debugId });
        return merged;
      };
    });

    return partStylesPrepared;
  }, initial);
};

export const mergeComponentStyles: (
  ...sources: (ComponentSlotStylesInput | null | undefined)[]
) => ComponentSlotStylesPrepared =
  process.env.NODE_ENV === 'production' ? mergeComponentStyles__PROD : mergeComponentStyles__DEV;

/**
 * Merges a single component's variables with another component's variables.
 */
export const mergeComponentVariables__PROD = (...sources: ComponentVariablesInput[]): ComponentVariablesPrepared => {
  const initial = () => ({});

  // filtering is required as some arguments can be undefined
  const filteredSources = sources.filter(Boolean);

  // a short circle to avoid calls of deepmerge()
  if (filteredSources.length === 1) {
    return typeof filteredSources[0] === 'function' ? filteredSources[0] : callable(filteredSources[0]);
  }

  return filteredSources.reduce<ComponentVariablesPrepared>((acc, next) => {
    return function mergeComponentVariables(...args) {
      const accumulatedVariables = acc(...args);
      const fn = typeof next === 'function' ? next : callable(next);
      const computedComponentVariables = fn(...args);

      return deepmerge(accumulatedVariables, computedComponentVariables);
    };
  }, initial);
};

export const mergeComponentVariables__DEV = (...sources: ComponentVariablesInput[]): ComponentVariablesPrepared => {
  if (!isDebugEnabled) {
    return mergeComponentVariables__PROD(...sources);
  }
  const initial = () => ({});

  return sources.reduce<ComponentVariablesPrepared>((acc, next) => {
    return siteVariables => {
      const { _debug = [], ...accumulatedVariables } = acc(siteVariables);
      const { _debug: computedDebug = undefined, _debugId = undefined, ...computedComponentVariables } =
        callable(next)(siteVariables) || {};

      const merged = deepmerge(accumulatedVariables, computedComponentVariables);

      merged._debug = _debug.concat(
        computedDebug || {
          resolved: computedComponentVariables,
          debugId: _debugId,
          input: siteVariables
            ? siteVariables._invertedKeys && callable(next)(siteVariables._invertedKeys)
            : callable(next)(),
        },
      );
      return merged;
    };
  }, initial);
};

export const mergeComponentVariables =
  process.env.NODE_ENV === 'production' ? mergeComponentVariables__PROD : mergeComponentVariables__DEV;

// ----------------------------------------
// Theme level merge functions
// ----------------------------------------

/**
 * Site variables can safely be merged at each Provider in the tree.
 * They are flat objects and do not depend on render-time values, such as props.
 */
export const mergeSiteVariables__PROD = (
  ...sources: (SiteVariablesInput | null | undefined)[]
): SiteVariablesPrepared => {
  const initial: SiteVariablesPrepared = {
    fontSizes: {},
  };
  return deepmerge(initial, ...sources);
};

export const mergeSiteVariables__DEV = (
  ...sources: (SiteVariablesInput | null | undefined)[]
): SiteVariablesPrepared => {
  if (!isDebugEnabled) {
    return mergeSiteVariables__PROD(...sources);
  }

  const initial: SiteVariablesPrepared = {
    fontSizes: {},
  };

  return sources.reduce<SiteVariablesPrepared>((acc, next) => {
    const { _debug = [], ...accumulatedSiteVariables } = acc;
    const { _debug: computedDebug = undefined, _invertedKeys = undefined, _debugId = undefined, ...nextSiteVariables } =
      next || {};

    const merged = deepmerge({ ...accumulatedSiteVariables, _invertedKeys: undefined }, nextSiteVariables);
    merged._debug = _debug.concat(computedDebug || { resolved: nextSiteVariables, debugId: _debugId });
    merged._invertedKeys = _invertedKeys || objectKeyToValues(merged, key => `siteVariables.${key}`);
    return merged;
  }, initial);
};

export const mergeSiteVariables =
  process.env.NODE_ENV === 'production' ? mergeSiteVariables__PROD : mergeSiteVariables__DEV;

/**
 * Component variables can be objects, functions, or an array of these.
 * The functions must be called with the final result of siteVariables, otherwise
 *   the component variable objects would have no ability to apply siteVariables.
 * Therefore, componentVariables must be resolved by the component at render time.
 * We instead pass down call stack of component variable functions to be resolved later.
 */

export const mergeThemeVariables__PROD = (
  ...sources: (ThemeComponentVariablesInput | null | undefined)[]
): ThemeComponentVariablesPrepared => {
  const displayNames = _.union(..._.map(sources, _.keys));
  return displayNames.reduce((componentVariables, displayName) => {
    componentVariables[displayName] = mergeComponentVariables(..._.map(sources, displayName));
    return componentVariables;
  }, {});
};

export const mergeThemeVariables__DEV = (
  ...sources: (ThemeComponentVariablesInput | null | undefined)[]
): ThemeComponentVariablesPrepared => {
  if (!isDebugEnabled) {
    return mergeThemeVariables__PROD(...sources);
  }

  const displayNames = _.union(..._.map(sources, _.keys));
  return displayNames.reduce((componentVariables, displayName) => {
    componentVariables[displayName] = mergeComponentVariables(
      ..._.map(sources, source => source && withDebugId(source[displayName], source._debugId)),
    );
    return componentVariables;
  }, {});
};

export const mergeThemeVariables =
  process.env.NODE_ENV === 'production' ? mergeThemeVariables__PROD : mergeThemeVariables__DEV;

/**
 * See mergeThemeVariables() description.
 * Component styles adhere to the same pattern as component variables, except
 *   that they return style objects.
 */
export const mergeThemeStyles = (
  ...sources: (ThemeComponentStylesInput | null | undefined)[]
): ThemeComponentStylesPrepared => {
  const initial: ThemeComponentStylesPrepared = {};

  return sources.reduce<ThemeComponentStylesPrepared>((themeComponentStyles, next) => {
    _.forEach(next, (stylesByPart, displayName) => {
      themeComponentStyles[displayName] = mergeComponentStyles(
        themeComponentStyles[displayName],
        withDebugId(stylesByPart, (next as ThemeComponentStylesPrepared & { _debugId: string })._debugId),
      );
    });

    return themeComponentStyles;
  }, initial);
};

export const mergeFontFaces = (...sources: FontFace[]) => {
  return toCompactArray<FontFace>(...sources);
};

export const mergeStaticStyles = (...sources: StaticStyle[]) => {
  return toCompactArray<StaticStyle>(...sources);
};

export const mergeAnimations = (...sources: { [key: string]: ThemeAnimation }[]): { [key: string]: ThemeAnimation } => {
  return Object.assign({}, ...sources);
};

export const mergeStyles = (...sources: ComponentSlotStyle[]) => {
  return (...args) => {
    return sources.reduce((acc, next) => {
      return _.merge(acc, callable(next)(...args));
    }, {});
  };
};

export const mergeThemes = (...themes: ThemeInput[]): ThemePrepared => {
  return themes.reduce<ThemePrepared>(
    (acc: ThemePrepared, next: ThemeInput) => {
      if (!next) return acc;
      const nextDebugId = next['_debugId'];

      acc.siteVariables = mergeSiteVariables(acc.siteVariables, withDebugId(next.siteVariables, nextDebugId));

      acc.componentVariables = mergeThemeVariables(
        acc.componentVariables,
        withDebugId(next.componentVariables, nextDebugId),
      );

      acc.componentStyles = mergeThemeStyles(acc.componentStyles, withDebugId(next.componentStyles, nextDebugId));

      acc.fontFaces = mergeFontFaces(...acc.fontFaces, ...(next.fontFaces || []));

      acc.staticStyles = mergeStaticStyles(...acc.staticStyles, ...(next.staticStyles || []));

      acc.animations = mergeAnimations(acc.animations, next.animations);

      return acc;
    },
    // .reduce() will modify "emptyTheme" object, so we should clone it before actual usage
    { ...emptyTheme },
  );
};
