import { DEFINITION_LOOKUP_TABLE, SEQUENCE_PREFIX } from './constants';
import { createCSSVariablesProxy, resolveStyleRules } from './runtime/index';
import { hashString } from './runtime/utils/hashString';
import { MakeStylesOptions, MakeStylesStyleFunctionRule, MakeStylesStyleRule } from './types';

export function makeOverrides<Slots extends string, Tokens>(
  stylesBySlots: Record<Slots, MakeStylesStyleRule<Tokens>>,
  unstable_cssPriority: number = 0,
) {
  let resolvedClasses: Record<Slots, string> | null = null;
  let insertionCache: Record<string, boolean> = {};

  function computeClasses(options: MakeStylesOptions<Tokens>): Record<Slots, string> {
    if (resolvedClasses === null || insertionCache[options.renderer.id] === undefined) {
      const tokens = createCSSVariablesProxy(options.tokens);
      resolvedClasses = {} as Record<Slots, string>;

      for (const slotName in stylesBySlots) {
        // TODO: Miro says that it should be done once as there is no sense to resolve the same styles
        const slotStyles = stylesBySlots[slotName];

        const preparedSlotStyles =
          typeof slotStyles === 'function' ? (slotStyles as MakeStylesStyleFunctionRule<Tokens>)(tokens) : slotStyles;
        const resolvedSlotStyles = resolveStyleRules(preparedSlotStyles, unstable_cssPriority);

        const slotClasses = options.renderer.insertDefinitions(resolvedSlotStyles, !!options.rtl);
        const sequenceHash = SEQUENCE_PREFIX + hashString(slotClasses);

        const resultSlotClasses = sequenceHash + ' ' + slotClasses;

        DEFINITION_LOOKUP_TABLE[sequenceHash] = resolvedSlotStyles;
        resolvedClasses[slotName] = resultSlotClasses;

        insertionCache[options.renderer.id] = true;
      }
    }

    return resolvedClasses as Record<Slots, string>;
  }

  return computeClasses;
}
