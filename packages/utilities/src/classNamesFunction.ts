import { mergeCssSets, Stylesheet } from '@fluentui/merge-styles';
import { getRTL } from './rtl';
import { getWindow } from './dom';
import type { IStyleSet, IProcessedStyleSet, IStyleFunctionOrObject } from '@fluentui/merge-styles';
import type { StyleFunction } from './styled';

const MAX_CACHE_COUNT = 50;
const DEFAULT_SPECIFICITY_MULTIPLIER = 5;

let _memoizedClassNames = 0;

const stylesheet = Stylesheet.getInstance();

if (stylesheet && stylesheet.onReset) {
  stylesheet.onReset(() => _memoizedClassNames++);
}

// Note that because of the caching nature within the classNames memoization,
// I've disabled this rule to simply be able to work with any types.
/* eslint-disable @typescript-eslint/no-explicit-any */

// This represents a prop we attach to each Map to indicate the cached return value
// associated with the graph node.
const retVal = '__retval__';

interface IRecursiveMemoNode extends Map<any, IRecursiveMemoNode> {
  [retVal]?: string;
}

type AppWindow = (Window & { FabricConfig?: { enableClassNameCacheFullWarning?: boolean } }) | undefined;

export interface IClassNamesFunctionOptions {
  /**
   * Disables class caching for scenarios where styleProp parts mutate frequently.
   */
  disableCaching?: boolean;

  /**
   * Size of the cache. It overwrites default cache size when defined.
   */
  cacheSize?: number;

  /**
   * Set to true if component base styles are implemented in scss instead of css-in-js.
   */
  useStaticStyles?: boolean;
}

/**
 * Creates a getClassNames function which calls getStyles given the props, and injects them
 * into mergeStyleSets.
 *
 * Note that the props you pass in on every render should be in the same order and
 * immutable (numbers, strings, and booleans). This will allow the results to be memoized. Violating
 * these will cause extra recalcs to occur.
 */
export function classNamesFunction<TStyleProps extends {}, TStyleSet extends IStyleSet<TStyleSet>>(
  options: IClassNamesFunctionOptions = {},
): (
  getStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined,
  styleProps?: TStyleProps,
) => IProcessedStyleSet<TStyleSet> {
  // We build a trie where each node is a Map. The map entry key represents an argument
  // value, and the entry value is another node (Map). Each node has a `__retval__`
  // property which is used to hold the cached response.

  // To derive the response, we can simply ensure the arguments are added or already
  // exist in the trie. At the last node, if there is a `__retval__` we return that. Otherwise
  // we call the `getStyles` api to evaluate, cache on the property, and return that.
  let map: IRecursiveMemoNode = new Map();
  let styleCalcCount = 0;
  let getClassNamesCount = 0;
  let currentMemoizedClassNames = _memoizedClassNames;

  const getClassNames = (
    styleFunctionOrObject: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined,
    styleProps: TStyleProps = {} as TStyleProps,
  ): IProcessedStyleSet<TStyleSet> => {
    // If useStaticStyles is true, styleFunctionOrObject returns slot to classname mappings.
    // If there is also no style overrides, we can skip merge styles completely and
    // simply return the result from the style funcion.
    if (
      options.useStaticStyles &&
      typeof styleFunctionOrObject === 'function' &&
      (styleFunctionOrObject as StyleFunction<TStyleProps, TStyleSet>).__noStyleOverride__
    ) {
      return styleFunctionOrObject(styleProps) as IProcessedStyleSet<TStyleSet>;
    }

    getClassNamesCount++;
    let current: Map<any, any> = map;
    const { theme } = styleProps as any;
    const rtl = theme && theme.rtl !== undefined ? theme.rtl : getRTL();

    const disableCaching = options.disableCaching;

    // On reset of our stylesheet, reset memoized cache.
    if (currentMemoizedClassNames !== _memoizedClassNames) {
      currentMemoizedClassNames = _memoizedClassNames;
      map = new Map();
      styleCalcCount = 0;
    }

    if (!options.disableCaching) {
      current = _traverseMap(map, styleFunctionOrObject as any);
      current = _traverseMap(current, styleProps);
    }

    if (disableCaching || !(current as any)[retVal]) {
      if (styleFunctionOrObject === undefined) {
        (current as any)[retVal] = {} as IProcessedStyleSet<TStyleSet>;
      } else {
        (current as any)[retVal] = mergeCssSets(
          [
            (typeof styleFunctionOrObject === 'function'
              ? styleFunctionOrObject(styleProps)
              : styleFunctionOrObject) as IStyleSet<TStyleSet>,
          ],
          {
            shadowConfig: (styleFunctionOrObject as StyleFunction<TStyleProps, TStyleSet>).__shadowConfig__,
            rtl: !!rtl,
            specificityMultiplier: options.useStaticStyles ? DEFAULT_SPECIFICITY_MULTIPLIER : undefined,
          },
        );
      }

      if (!disableCaching) {
        styleCalcCount++;
      }
    }

    if (styleCalcCount > (options.cacheSize || MAX_CACHE_COUNT)) {
      const win = getWindow() as AppWindow;
      if (win?.FabricConfig?.enableClassNameCacheFullWarning) {
        // eslint-disable-next-line no-console
        console.warn(
          `Styles are being recalculated too frequently. Cache miss rate is ${styleCalcCount}/${getClassNamesCount}.`,
        );
        // eslint-disable-next-line no-console
        console.trace();
      }

      map.clear();
      styleCalcCount = 0;

      // Mutate the options passed in, that's all we can do.
      options.disableCaching = true;
    }

    // Note: the retVal is an attached property on the Map; not a key in the Map. We use this attached property to
    // cache the return value for this branch of the graph.
    return (current as any)[retVal];
  };

  return getClassNames;
}

function _traverseEdge(current: Map<any, any>, value: any): Map<any, any> {
  value = _normalizeValue(value);

  if (!current.has(value)) {
    current.set(value, new Map<any, any>());
  }

  return current.get(value);
}

function _traverseMap(current: Map<any, any>, inputs: any[] | Object): Map<any, any> {
  if (typeof inputs === 'function') {
    const cachedInputsFromStyled = (inputs as StyleFunction<any, any>).__cachedInputs__;
    if (cachedInputsFromStyled) {
      // The styled helper will generate the styles function and will attach the cached
      // inputs (consisting of the default styles, customzied styles, and user provided styles.)
      // These should be used as cache keys for deriving the memoized value.
      for (const input of (inputs as any).__cachedInputs__) {
        current = _traverseEdge(current, input);
      }
    } else {
      current = _traverseEdge(current, inputs);
    }
  } else if (typeof inputs === 'object') {
    for (const propName in inputs) {
      if (inputs.hasOwnProperty(propName)) {
        current = _traverseEdge(current, (inputs as any)[propName]);
      }
    }
  }

  return current;
}

function _normalizeValue(value: any): string {
  switch (value) {
    case undefined:
      return '__undefined__';
    case null:
      return '__null__';
    default:
      return value;
  }
}
