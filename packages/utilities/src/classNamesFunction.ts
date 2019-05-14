import { mergeStyleSets, IStyleSet, IProcessedStyleSet } from '@uifabric/merge-styles';
import { IStyleFunctionOrObject } from '@uifabric/merge-styles';

const MAX_CACHE_COUNT = 50;

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

  const getClassNames = (
    styleFunctionOrObject: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined,
    styleProps: TStyleProps = {} as TStyleProps
  ): IProcessedStyleSet<TStyleSet> => {
    let current: Map<any, any> = map;
    const disableCaching = options.disableCaching || !!styleProps;

    if (!options.disableCaching) {
      current = _traverseMap(map, styleFunctionOrObject as any);
      current = _traverseMap(current, styleProps);
    }

    if (disableCaching || !(current as any)[RetVal]) {
      if (styleFunctionOrObject === undefined) {
        (current as any)[RetVal] = {} as IProcessedStyleSet<TStyleSet>;
      } else if (Array.isArray(styleFunctionOrObject)) {
        (current as any)[RetVal] = mergeStyleSets(...(styleFunctionOrObject as any).map(_derive, styleProps));
      } else {
        (current as any)[RetVal] = mergeStyleSets(
          typeof styleFunctionOrObject === 'function' ? styleFunctionOrObject(styleProps) : styleFunctionOrObject
        );
      }

      if (!disableCaching) {
        resultCount++;
      }
    }

    if (resultCount > MAX_CACHE_COUNT) {
      map.clear();
      resultCount = 0;
      options.disableCaching = true;

      if (process.env.NODE_ENV !== 'production') {
        console.log('Styles are being recalculated far too frequently. Something is mutating the class over and over.');
        // tslint:disable-next-line:no-console
        console.trace();
      }
    }

    return (current as any)[RetVal] as IProcessedStyleSet<TStyleSet>;
  };

  return getClassNames;
}

function _derive(obj: any): any {
  return typeof obj === 'function' ? obj(this) : obj;
}

function _traverseEdge(current: Map<any, any>, value: any): Map<any, any> {
  value = _normalizeValue(value);

  if (!current.has(value)) {
    current.set(value, new Map<any, any>());
  }

  return current.get(value);
}

function _traverseMap(current: Map<any, any>, inputs: any[] | Object): Map<any, any> {
  if (Array.isArray(inputs)) {
    for (let i = 0; i < inputs.length; i++) {
      current = _traverseEdge(current, inputs[i]);
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
