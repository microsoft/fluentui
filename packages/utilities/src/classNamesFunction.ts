import { mergeCssSets, IStyleSet, IProcessedStyleSet, Stylesheet } from '@uifabric/merge-styles';
import { IStyleFunctionOrObject } from '@uifabric/merge-styles';
import { getRTL } from './rtl';

const MAX_CACHE_COUNT = 50;
let _memoizedClassNames = 0;

const stylesheet = Stylesheet.getInstance();

if (stylesheet && stylesheet.onReset) {
  stylesheet.onReset(() => _memoizedClassNames++);
}

// Note that because of the caching nature within the classNames memoization,
// I've disabled this rule to simply be able to work with any types.
// tslint:disable:no-any

// This represents a prop we attach to each Map to indicate the cached return value
// associated with the graph node.
const RetVal = '__retval__';

interface IRecursiveMemoNode extends Map<any, IRecursiveMemoNode> {
  [RetVal]?: string;
}

export interface IClassNamesFunctionOptions {
  /**
   * Disables class caching for scenarios where styleProp parts mutate frequently.
   */
  disableCaching?: boolean;
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
  options: IClassNamesFunctionOptions = {}
): (getStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined, styleProps?: TStyleProps) => IProcessedStyleSet<TStyleSet> {
  // We build a trie where each node is a Map. The map entry key represents an argument
  // value, and the entry value is another node (Map). Each node has a `__retval__`
  // property which is used to hold the cached response.

  // To derive the response, we can simply ensure the arguments are added or already
  // exist in the trie. At the last node, if there is a `__retval__` we return that. Otherwise
  // we call the `getStyles` api to evaluate, cache on the property, and return that.
  let map: IRecursiveMemoNode = new Map();
  let resultCount = 0;
  let currentMemoizedClassNames = _memoizedClassNames;

  const getClassNames = (
    styleFunctionOrObject: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined,
    styleProps: TStyleProps = {} as TStyleProps
  ): IProcessedStyleSet<TStyleSet> => {
    let current: Map<any, any> = map;
    const { theme } = styleProps as any;
    const rtl = (theme && theme.rtl) || getRTL();

    const disableCaching = options.disableCaching;

    // On reset of our stylesheet, reset memoized cache.
    if (currentMemoizedClassNames !== _memoizedClassNames) {
      currentMemoizedClassNames = _memoizedClassNames;
      map = new Map();
      resultCount = 0;
    }

    if (!options.disableCaching) {
      current = _traverseMap(map, styleFunctionOrObject as any);
      current = _traverseMap(current, styleProps);
    }

    if (disableCaching || !(current as any)[RetVal]) {
      if (styleFunctionOrObject === undefined) {
        (current as any)[RetVal] = {} as IProcessedStyleSet<TStyleSet>;
      } else {
        (current as any)[RetVal] = mergeCssSets(
          [
            (typeof styleFunctionOrObject === 'function' ? styleFunctionOrObject(styleProps) : styleFunctionOrObject) as IStyleSet<
              TStyleSet
            >
          ],
          { rtl: !!rtl }
        );
      }

      if (!disableCaching) {
        resultCount++;
      }
    }

    if (resultCount > MAX_CACHE_COUNT) {
      map.clear();
      resultCount = 0;

      // Mutate the options passed in, that's all we can do.
      options.disableCaching = true;

      // Note: this code is great for debugging problems with styles being recaculated, but commenting it out
      // to avoid confusing consumers.

      // if (process.env.NODE_ENV !== 'production') {
      //  console.log('Styles are being recalculated far too frequently. Something is mutating the class over and over.');
      //  // tslint:disable-next-line:no-console
      //  console.trace();
      // }
    }

    // Note: the RetVal is an attached property on the Map; not a key in the Map. We use this attached property to
    // cache the return value for this branch of the graph.
    return (current as any)[RetVal];
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
  // The styled helper will generate the styles function and will attach the cached
  // inputs (consisting of the default styles, customzied styles, and user provided styles.)
  // These should be used as cache keys for deriving the memoized value.
  if (typeof inputs === 'function' && (inputs as any).__cachedInputs__) {
    for (const input of (inputs as any).__cachedInputs__) {
      current = _traverseEdge(current, input);
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
