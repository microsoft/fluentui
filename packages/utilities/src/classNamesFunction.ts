import { mergeStyleSets, IStyleSet, IProcessedStyleSet } from '@uifabric/merge-styles';
import { IStyleFunctionOrObject } from '@uifabric/merge-styles';

const MAX_CACHE_COUNT = 30;

// Note that because of the caching nature within the classNames memoization,
// I've disabled this rule to simply be able to work with any types.
// tslint:disable:no-any

const RetVal = '__retval__';

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
  let map: Map<any, any> = new Map<any, any>();

  const getClassNames = (
    styleFunctionOrObject: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined,
    styleProps: TStyleProps = {} as TStyleProps
  ): IProcessedStyleSet<TStyleSet> => {
    let current: Map<any, any> = map;
    let resultCount = 0;

    for (const propName in styleProps) {
      if (styleProps.hasOwnProperty(propName)) {
        let propValue: any = styleProps[propName];

        if (propValue === undefined) {
          propValue = '__undefined__';
        }
        if (propValue === null) {
          propValue = '__null__';
        }
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
      if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') {
        throw new Error('Styles are being recalculated far too frequently.');
      }
      map.clear();
    }

    return (current as any)[RetVal] as IProcessedStyleSet<TStyleSet>;
  };

  return getClassNames;
}
