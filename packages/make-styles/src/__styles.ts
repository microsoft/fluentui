import { reduceToClassNameForSlots } from './runtime/reduceToClassNameForSlots';
import { MakeStylesOptions, CSSClassesMapBySlot, CSSRulesByBucket, SequenceHash } from './types';
import { MK_DEBUG } from './devtools/store';
import { injectDevTools } from './devtools/injectDevTools';

injectDevTools();

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */
export function __styles<Slots extends string>(
  classesMapBySlot: CSSClassesMapBySlot<Slots>,
  cssRules: CSSRulesByBucket,
  sourceMappings: [string, string, Record<Slots, number>],
) {
  const insertionCache: Record<string, boolean> = {};

  let ltrClassNamesForSlots: Record<Slots, string> | null = null;
  let rtlClassNamesForSlots: Record<Slots, string> | null = null;

  let ltrSequencesForSlots: Record<Slots, string> | null = null;
  // let rtlSequencesForSlots: Record<Slots, string> | null = null;

  function computeClasses(options: Pick<MakeStylesOptions, 'dir' | 'renderer'>): Record<Slots, string> {
    const { dir, renderer } = options;

    const isLTR = dir === 'ltr';
    // As RTL classes are different they should have a different cache key for insertion
    const rendererId = isLTR ? renderer.id : renderer.id + 'r';

    if (isLTR) {
      if (ltrClassNamesForSlots === null) {
        [ltrClassNamesForSlots, ltrSequencesForSlots] = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    } else {
      if (rtlClassNamesForSlots === null) {
        [rtlClassNamesForSlots] = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    }

    if (insertionCache[rendererId] === undefined) {
      renderer.insertCSSRules(cssRules!);

      if (sourceMappings) {
        const [sourceMapId, sourceMap, linesMapping] = sourceMappings;

        const style = document.createElement('style');
        style.appendChild(document.createTextNode(sourceMap));
        style.setAttribute('data-sourcemap-id', sourceMapId);
        document.head.appendChild(style);

        MK_DEBUG.addSourceMapMapping(sourceMapId, sourceMap);

        Object.entries(ltrSequencesForSlots!).forEach(([slotName, sequenceHash]) => {
          MK_DEBUG.addSequenceDetails(
            sequenceHash as SequenceHash,
            slotName,
            sourceMapId,
            linesMapping[slotName as Slots],
          );
        });
      }

      insertionCache[rendererId] = true;
    }

    return isLTR ? (ltrClassNamesForSlots as Record<Slots, string>) : (rtlClassNamesForSlots as Record<Slots, string>);
  }

  return computeClasses;
}
