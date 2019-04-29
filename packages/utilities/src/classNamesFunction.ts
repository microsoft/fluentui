import { mergeStyleSets, IStyleSet, IProcessedStyleSet } from '@uifabric/merge-styles';
import { IStyleFunctionOrObject } from '@uifabric/merge-styles';

const MAX_CACHE_COUNT = 30;

// Note that because of the caching nature within the classNames memoization,
// I've disabled this rule to simply be able to work with any types.
// tslint:disable:no-any

// This represents a prop we attach to each Map to indicate the cached return value
// associated with the graph node.
const RetVal = '__retval__';

interface IRecursiveMemoNode extends Map<any, IRecursiveMemoNode> {
  [RetVal]?: string;
}

/**
 * Creates a getClassNames function which calls getStyles given the props, and injects them
 * into mergeStyleSets.
 *
 * Note that the props you pass in on every render should be in the same order and
 * immutable (numbers, strings, and booleans). This will allow the results to be memoized. Violating
 * these will cause extra recalcs to occur.
 */
export function classNamesFunction<TStyleProps extends {}, TStyleSet extends IStyleSet<TStyleSet>>(): (
  getStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined,
  styleProps?: TStyleProps
) => IProcessedStyleSet<TStyleSet> {
  // We build a trie where each node is a Map. The map entry key represents an argument
  // value, and the entry value is another node (Map). Each node has a `__retval__`
  // property which is used to hold the cached response.

  // To derive the response, we can simply ensure the arguments are added or already
  // exist in the trie. At the last node, if there is a `__retval__` we return that. Otherwise
  // we call the `getStyles` api to evaluate, cache on the property, and return that.
  let map: IRecursiveMemoNode = new Map();

  const getClassNames = (
    styleFunctionOrObject: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined,
    styleProps: TStyleProps = {} as TStyleProps
  ): IProcessedStyleSet<TStyleSet> => {
    let current: Map<any, any> = map;
    let resultCount = 0;

    for (const propName in styleProps) {
      if (styleProps.hasOwnProperty(propName)) {
        let propValue: any = _normalizeValue(styleProps[propName]);

        if (!current.has(propValue)) {
          current = current.set(propValue, new Map<any, any>());
        }
        current = current.get(propValue);
      }
    }

    if (!(current as any)[RetVal]) {
      if (styleFunctionOrObject === undefined) {
        (current as any)[RetVal] = {} as IProcessedStyleSet<TStyleSet>;
      } else {
        const styleSet =
          styleFunctionOrObject &&
          (typeof styleFunctionOrObject === 'function' ? styleFunctionOrObject(styleProps!) : styleFunctionOrObject);

        (current as any)[RetVal] = mergeStyleSets(styleSet as TStyleSet);
        resultCount++;
      }
    }

    if (resultCount > MAX_CACHE_COUNT) {
      if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
        throw new Error('Styles are being recalculated far too frequently. Something is mutating the class over and over.');
      }
      map.clear();
    }

    return (current as any)[RetVal] as IProcessedStyleSet<TStyleSet>;
  };

  return getClassNames;
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
