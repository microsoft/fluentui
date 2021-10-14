import { reduceToClassNameForSlots } from './runtime/reduceToClassNameForSlots';
import { resolveStyleRulesForSlots } from './resolveStyleRulesForSlots';
import { CSSClassesMapBySlot, CSSRulesByBucket, MakeStylesOptions, StylesBySlots } from './types';

export function makeStyles<Slots extends string | number, Tokens>(
  stylesBySlots: StylesBySlots<Slots, Tokens>,
  unstable_cssPriority: number = 0,
) {
  const insertionCache: Record<string, boolean> = {};

  let classesMapBySlot: CSSClassesMapBySlot<Slots> | null = null;
  let cssRules: CSSRulesByBucket | null = null;

  let ltrClassNamesForSlots: Record<Slots, string> | null = null;
  let rtlClassNamesForSlots: Record<Slots, string> | null = null;

  const id = Math.random().toString(16).slice(2);

  function computeClasses(options: MakeStylesOptions): Record<Slots, string> {
    const { dir, renderer } = options;

    if (classesMapBySlot === null) {
      [classesMapBySlot, cssRules] = resolveStyleRulesForSlots(id, stylesBySlots, unstable_cssPriority);
    }

    const isLTR = dir === 'ltr';
    // As RTL classes are different they should have a different cache key for insertion
    const rendererId = isLTR ? renderer.id : renderer.id + 'r';

    if (isLTR) {
      if (ltrClassNamesForSlots === null) {
        [ltrClassNamesForSlots] = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    } else {
      if (rtlClassNamesForSlots === null) {
        [rtlClassNamesForSlots] = reduceToClassNameForSlots(classesMapBySlot, dir);
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
