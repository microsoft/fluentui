import { reduceToClassNameForSlots } from './runtime/reduceToClassNameForSlots';
import type { MakeStylesOptions, CSSClassesMapBySlot, CSSRulesByBucket } from './types';

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */
export function __styles<Slots extends string>(
  classesMapBySlot: CSSClassesMapBySlot<Slots>,
  cssRules: CSSRulesByBucket,
) {
  const insertionCache: Record<string, boolean> = {};

  let ltrClassNamesForSlots: Record<Slots, string> | null = null;
  let rtlClassNamesForSlots: Record<Slots, string> | null = null;

  function computeClasses(options: Pick<MakeStylesOptions, 'dir' | 'renderer'>): Record<Slots, string> {
    const { dir, renderer } = options;

    const isLTR = dir === 'ltr';
    // As RTL classes are different they should have a different cache key for insertion
    const rendererId = isLTR ? renderer.id : renderer.id + 'r';

    if (isLTR) {
      if (ltrClassNamesForSlots === null) {
        ltrClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    } else {
      if (rtlClassNamesForSlots === null) {
        rtlClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    }

    if (insertionCache[rendererId] === undefined) {
      renderer.insertCSSRules(cssRules!);
      insertionCache[rendererId] = true;
    }

    return isLTR ? (ltrClassNamesForSlots as Record<Slots, string>) : (rtlClassNamesForSlots as Record<Slots, string>);
  }

  return computeClasses;
}
