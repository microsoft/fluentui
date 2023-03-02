import * as _ from 'lodash';

import { callable } from './callable';
import {
  ComponentSlotStyle,
  ComponentSlotStylesInput,
  ComponentSlotStylesPrepared,
  ComponentVariablesInput,
  ComponentVariablesObject,
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
export const mergeComponentStyles__PROD: typeof mergeComponentStyles = (stylesA, stylesB) => {
  const result = {};

  if (stylesA) {
    Object.keys(stylesA).forEach(partName => {
      const slotA = stylesA[partName];
      const slotB = stylesB?.[partName];

      // if there is no source, merging is a no-op, skip it
      if (typeof slotA === 'undefined' || slotA === null) {
        return;
      }

      // no target means source doesn't need to merge onto anything
      // just ensure source is callable (prepared format)
      if (typeof slotB === 'undefined' || slotB === null) {
        result[partName] = typeof slotA === 'function' ? slotA : () => slotA;
        return;
      }

      if (slotA === slotB) {
        result[partName] = typeof slotA === 'function' ? slotA : () => slotA;
      }
    });
  }

  if (stylesB) {
    Object.keys(stylesB).forEach(partName => {
      const slotA = stylesA?.[partName];
      const slotB = stylesB[partName];

      // if there is no source, merging is a no-op, skip it
      if (typeof slotB === 'undefined' || slotB === null) {
        return;
      }

      // no target means source doesn't need to merge onto anything
      // just ensure source is callable (prepared format)
      if (typeof slotA === 'undefined' || slotA === null) {
        result[partName] = typeof slotB === 'function' ? slotB : () => slotB;
        return;
      }

      if (slotA === slotB) {
        return;
      }

      // We have both target and source, replace with merge fn
      result[partName] = function mergedStyleFunction(styleParam) {
        // originalTarget is always prepared, fn is guaranteed
        return _.merge(
          typeof slotA === 'function' ? slotA(styleParam) : slotA,
          typeof slotB === 'function' ? slotB(styleParam) : slotB,
        );
      };
    });
  }

  return result;
};

export const mergeComponentStyles__DEV: typeof mergeComponentStyles = (stylesA, stylesB) => {
  if (!isDebugEnabled) {
    return mergeComponentStyles__PROD(stylesA, stylesB);
  }

  const mergedKeys = [...(stylesA ? Object.keys(stylesA) : []), ...(stylesB ? Object.keys(stylesB) : [])];
  const result = {};

  mergedKeys.forEach(slotName => {
    const slotA = styleParam => {
      const { _debug = undefined, ...styles } = callable(stylesA?.[slotName])(styleParam) || {};

      // new object required to prevent circular JSON structure error in <Debug />
      return {
        ...styles,
        _debug: _debug || [{ styles: { ...styles }, debugId: stylesA?._debugId }],
      };
    };

    const slotB = styleParam => {
      const { _debug = undefined, ...styles } = callable(stylesB?.[slotName])(styleParam) || {};

      // new object required to prevent circular JSON structure error in <Debug />
      return {
        ...styles,
        _debug: _debug || [{ styles: { ...styles }, debugId: stylesB?._debugId }],
      };
    };

    if (stylesA?.[slotName] && stylesB?.[slotName]) {
      // We have both, replace with merge fn
      result[slotName] = styleParam => {
        // slot* are always prepared, fn is guaranteed, _debug always exists
        const { _debug: debugA, ...resolvedStylesA } = slotA(styleParam);
        const { _debug: debugB, ...resolvedStylesB } = slotB(styleParam);

        const merged = _.merge(resolvedStylesA, resolvedStylesB);

        merged._debug = debugA.concat(debugB || { styles: resolvedStylesB, debugId: resolvedStylesB._debugId });

        return merged;
      };
    } else if (stylesA?.[slotName]) {
      result[slotName] = slotA;
    } else if (stylesB?.[slotName]) {
      result[slotName] = slotB;
    }
  });

  return result;
};

export const mergeComponentStyles: (
  stylesA: ComponentSlotStylesInput | null | undefined,
  stylesB: ComponentSlotStylesInput | null | undefined,
) => ComponentSlotStylesPrepared =
  process.env.NODE_ENV === 'production' ? mergeComponentStyles__PROD : mergeComponentStyles__DEV;

/**
 * Merges a single component's variables with another component's variables.
 */
export const mergeComponentVariables__PROD = (
  variablesA: ComponentVariablesInput | undefined,
  variablesB: ComponentVariablesInput | undefined,
): ComponentVariablesPrepared => {
  if (variablesA && variablesB) {
    return function mergedComponentVariables(
      siteVariables: SiteVariablesPrepared | undefined,
    ): ComponentVariablesObject {
      const resolvedVariablesA = typeof variablesA === 'function' ? variablesA(siteVariables) : variablesA || {};
      const resolvedVariablesB = typeof variablesB === 'function' ? variablesB(siteVariables) : variablesB || {};

      return deepmerge(resolvedVariablesA, resolvedVariablesB);
    };
  }

  if (variablesA) {
    return typeof variablesA === 'function' ? variablesA : () => variablesA || {};
  }

  if (variablesB) {
    return typeof variablesB === 'function' ? variablesB : () => variablesB || {};
  }

  return () => ({});
};

export const mergeComponentVariables__DEV: typeof mergeComponentVariables__PROD = (
  variablesA,
  variablesB,
): ComponentVariablesPrepared => {
  if (!isDebugEnabled) {
    return mergeComponentVariables__PROD(variablesA, variablesB);
  }
  const initial = () => ({});

  return [variablesA, variablesB].reduce<ComponentVariablesPrepared>((acc, next) => {
    return siteVariables => {
      const { _debug = [], ...accumulatedVariables } = acc(siteVariables);
      const {
        _debug: computedDebug = undefined,
        _debugId = undefined,
        ...computedComponentVariables
      } = callable(next)(siteVariables) || {};

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
  siteVariablesA: SiteVariablesInput | undefined,
  siteVariablesB: SiteVariablesInput | undefined,
): SiteVariablesPrepared => {
  const initial: SiteVariablesPrepared = {
    fontSizes: {},
  };

  if (siteVariablesA && siteVariablesB) {
    return deepmerge(initial, siteVariablesA, siteVariablesB);
  }

  if (siteVariablesA) {
    return { ...initial, ...siteVariablesA };
  }

  return { ...initial, ...siteVariablesB };
};

export const mergeSiteVariables__DEV: typeof mergeSiteVariables__PROD = (
  siteVariablesA,
  siteVariablesB,
): SiteVariablesPrepared => {
  if (!isDebugEnabled) {
    return mergeSiteVariables__PROD(siteVariablesA, siteVariablesB);
  }

  const initial: SiteVariablesPrepared = {
    fontSizes: {},
  };

  return [siteVariablesA, siteVariablesB].reduce<SiteVariablesPrepared>((acc, next) => {
    const { _debug = [], ...accumulatedSiteVariables } = acc;
    const {
      _debug: computedDebug = undefined,
      _invertedKeys = undefined,
      _debugId = undefined,
      ...nextSiteVariables
    } = next || {};

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
  themeComponentVariablesA: ThemeComponentVariablesInput | undefined,
  themeComponentVariablesB: ThemeComponentVariablesInput | undefined,
): ThemeComponentVariablesPrepared => {
  if (themeComponentVariablesA && themeComponentVariablesB) {
    const displayNames = _.union(..._.map([themeComponentVariablesA, themeComponentVariablesB], _.keys));

    return displayNames.reduce((componentVariables, displayName) => {
      componentVariables[displayName] = mergeComponentVariables(
        themeComponentVariablesA[displayName],
        themeComponentVariablesB[displayName],
      );

      return componentVariables;
    }, {});
  }

  if (themeComponentVariablesA) {
    return Object.fromEntries(
      Object.entries(themeComponentVariablesA).map(([displayName, variables]) => {
        return [displayName, mergeComponentVariables(undefined, variables)];
      }),
    );
  }

  if (themeComponentVariablesB) {
    return Object.fromEntries(
      Object.entries(themeComponentVariablesB).map(([displayName, variables]) => {
        return [displayName, mergeComponentVariables(undefined, variables)];
      }),
    );
  }

  return {};
};

export const mergeThemeVariables__DEV: typeof mergeThemeVariables__PROD = (
  themeComponentVariablesA,
  themeComponentVariablesB,
) => {
  if (!isDebugEnabled) {
    return mergeThemeVariables__PROD(themeComponentVariablesA, themeComponentVariablesB);
  }

  const displayNames = _.union(..._.map([themeComponentVariablesA, themeComponentVariablesB], _.keys));

  return displayNames.reduce((componentVariables, displayName) => {
    componentVariables[displayName] = mergeComponentVariables(
      themeComponentVariablesA && withDebugId(themeComponentVariablesA[displayName], themeComponentVariablesA._debugId),
      themeComponentVariablesB && withDebugId(themeComponentVariablesB[displayName], themeComponentVariablesB._debugId),
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
const mergeThemeStyles__PROD = (
  themeComponentStylesA: ThemeComponentStylesInput | undefined,
  themeComponentStylesB: ThemeComponentStylesInput | undefined,
): ThemeComponentStylesPrepared => {
  if (themeComponentStylesA && themeComponentStylesB) {
    const displayNames = _.union(..._.map([themeComponentStylesA, themeComponentStylesB], _.keys));

    return displayNames.reduce((themeComponentStyles, displayName) => {
      themeComponentStyles[displayName] = mergeComponentStyles(
        themeComponentStylesA[displayName],
        themeComponentStylesB[displayName],
      );

      return themeComponentStyles;
    }, {});
  }

  if (themeComponentStylesA) {
    return Object.fromEntries(
      Object.entries(themeComponentStylesA).map(([displayName, styles]) => {
        return [displayName, mergeComponentStyles(undefined, styles)];
      }),
    );
  }

  if (themeComponentStylesB) {
    return Object.fromEntries(
      Object.entries(themeComponentStylesB).map(([displayName, styles]) => {
        return [displayName, mergeComponentStyles(undefined, styles)];
      }),
    );
  }

  return {};
};

const mergeThemeStyles__DEV: typeof mergeThemeStyles__PROD = (componentStylesA, componentStylesB) => {
  if (!isDebugEnabled) {
    return mergeThemeStyles__PROD(componentStylesA, componentStylesB);
  }

  const initial: ThemeComponentStylesPrepared = {};

  return [componentStylesA, componentStylesB].reduce<ThemeComponentStylesPrepared>((themeComponentStyles, next) => {
    _.forEach(next, (stylesByPart, displayName) => {
      themeComponentStyles[displayName] = mergeComponentStyles(
        themeComponentStyles[displayName],
        withDebugId(stylesByPart, (next as ThemeComponentStylesPrepared & { _debugId: string })._debugId),
      );
    });

    return themeComponentStyles;
  }, initial);
};

export const mergeThemeStyles = process.env.NODE_ENV === 'production' ? mergeThemeStyles__PROD : mergeThemeStyles__DEV;

export const mergeFontFaces = (fontFacesA: FontFace[] | undefined, fontFacesB: FontFace[] | undefined): FontFace[] => {
  return [...(fontFacesA || []), ...(fontFacesB || [])];
};

export const mergeStaticStyles = (
  staticStylesA: StaticStyle[] | undefined,
  staticStylesB: StaticStyle[] | undefined,
): StaticStyle[] => {
  return [...(staticStylesA || []), ...(staticStylesB || [])];
};

export const mergeAnimations = (
  animationsA: { [key: string]: ThemeAnimation } | undefined,
  animationsB: { [key: string]: ThemeAnimation } | undefined,
): { [key: string]: ThemeAnimation } => {
  return { ...animationsA, ...animationsB };
};

export const mergeStyles = (...sources: ComponentSlotStyle[]) => {
  return (...args) => {
    return sources.reduce((acc, next) => {
      return _.merge(acc, callable(next)(...args));
    }, {});
  };
};

export const mergeThemes = (
  themeA: ThemeInput | ThemePrepared | undefined,
  themeB: ThemeInput | ThemePrepared | undefined,
): ThemePrepared => {
  const debugIdA = themeA?.['_debugId'];
  const debugIdB = themeB?.['_debugId'];

  if (themeA && themeB) {
    return {
      animations: mergeAnimations(themeA.animations, themeB.animations),
      componentVariables: mergeThemeVariables(
        withDebugId(themeA.componentVariables, debugIdA),
        withDebugId(themeB.componentVariables, debugIdB),
      ),
      componentStyles: mergeThemeStyles(
        withDebugId(themeA.componentStyles, debugIdA),
        withDebugId(themeB.componentStyles, debugIdB),
      ),
      fontFaces: mergeFontFaces(themeA.fontFaces, themeB.fontFaces),
      siteVariables: mergeSiteVariables(
        withDebugId(themeA.siteVariables, debugIdA),
        withDebugId(themeB.siteVariables, debugIdB),
      ),
      staticStyles: mergeStaticStyles(themeA.staticStyles, themeB.staticStyles),
    };
  }

  if (themeA) {
    return {
      animations: mergeAnimations(undefined, themeA.animations),
      componentVariables: mergeThemeVariables(undefined, withDebugId(themeA.componentVariables, debugIdA)),
      componentStyles: mergeThemeStyles(undefined, withDebugId(themeA.componentStyles, debugIdA)),
      fontFaces: mergeFontFaces(undefined, themeA.fontFaces),
      siteVariables: mergeSiteVariables(undefined, withDebugId(themeA.siteVariables, debugIdA)),
      staticStyles: mergeStaticStyles(undefined, themeA.staticStyles),
    };
  }

  if (themeB) {
    return {
      animations: mergeAnimations(undefined, themeB.animations),
      componentVariables: mergeThemeVariables(undefined, withDebugId(themeB.componentVariables, debugIdB)),
      componentStyles: mergeThemeStyles(undefined, withDebugId(themeB.componentStyles, debugIdB)),
      fontFaces: mergeFontFaces(undefined, themeB.fontFaces),
      siteVariables: mergeSiteVariables(undefined, withDebugId(themeB.siteVariables, debugIdB)),
      staticStyles: mergeStaticStyles(undefined, themeB.staticStyles),
    };
  }

  return { ...emptyTheme };
};
