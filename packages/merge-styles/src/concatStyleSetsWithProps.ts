import { concatStyleSets } from './concatStyleSets';
import { IStyleSet } from './IStyleSet';
import { IStyleFunctionOrObject } from './IStyleFunction';

/**
 * Concatenates style sets into one, but resolves functional sets using the given props.
 * @param styleProps - Props used to resolve functional sets.
 * @param allStyles - Style sets, which can be functions or objects.
 */
export function concatStyleSetsWithProps<TStyleProps, TStyleSet extends IStyleSet<TStyleSet>>(
  styleProps: TStyleProps,
  ...allStyles: (IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined)[]
): Partial<TStyleSet> {
  const result: Partial<TStyleSet>[] = [];
  for (const styles of allStyles) {
    if (styles) {
      result.push(typeof styles === 'function' ? styles(styleProps) : styles);
    }
  }
  if (result.length === 1) {
    return result[0] as Partial<TStyleSet>;
  } else if (result.length) {
    // cliffkoh: I cannot figure out how to avoid the cast to any here.
    // It is something to do with the use of Omit in IStyleSet.
    // It might not be necessary once  Omit becomes part of lib.d.ts (when we remove our own Omit and rely on
    // the official version).
    // tslint:disable-next-line:no-any
    return concatStyleSets(...(result as any)) as any;
  }
  return {};
}
