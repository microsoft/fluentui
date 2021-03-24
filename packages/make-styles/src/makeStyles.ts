import { DEFINITION_LOOKUP_TABLE, RTL_CLASSNAME, SEQUENCE_PREFIX } from './constants';
import { createCSSVariablesProxy, resolveStyleRules } from './runtime/index';
import { hashString } from './runtime/utils/hashString';
import { MakeStylesOptions, MakeStylesStyleFunctionRule, MakeStylesStyleRule } from './types';

export function makeStyles<Slots extends string, Tokens>(
  stylesBySlots: Record<Slots, MakeStylesStyleRule<Tokens>>,
  unstable_cssPriority: number = 0,
) {
  // TODO: docs
  let resolvedClasses: Record<Slots, string> | null = null;
  let resolvedClassesRtl: Record<Slots, string> | null = null;

  const insertionCache: Record<string, boolean> = {};

  function computeClasses(options: MakeStylesOptions<Tokens>): Record<Slots, string> {
    const { dir, renderer, tokens } = options;

    if (resolvedClasses === null || insertionCache[renderer.id] === undefined) {
      resolvedClasses = {} as Record<Slots, string>;
      resolvedClassesRtl = {} as Record<Slots, string>;

      const tokensProxy = createCSSVariablesProxy(tokens);

      // eslint-disable-next-line guard-for-in
      for (const slotName in stylesBySlots) {
        // TODO: Miro says that it should be done once as there is no sense to resolve the same styles
        const slotStyles = stylesBySlots[slotName];

        const preparedSlotStyles =
          typeof slotStyles === 'function'
            ? (slotStyles as MakeStylesStyleFunctionRule<Tokens>)(tokensProxy)
            : slotStyles;
        const resolvedSlotStyles = resolveStyleRules(preparedSlotStyles, unstable_cssPriority);

        const slotClasses = renderer.insertDefinitions(resolvedSlotStyles);
        const sequenceHash = SEQUENCE_PREFIX + hashString(slotClasses);

        const resultSlotClasses = sequenceHash + ' ' + slotClasses;

        DEFINITION_LOOKUP_TABLE[sequenceHash] = resolvedSlotStyles;

        resolvedClasses[slotName] = resultSlotClasses;
        resolvedClassesRtl[slotName] = `${RTL_CLASSNAME} ${resultSlotClasses}`;

        insertionCache[options.renderer.id] = true;
      }
    }

    return dir === 'ltr' ? (resolvedClasses as Record<Slots, string>) : (resolvedClassesRtl as Record<Slots, string>);
  }

  return computeClasses;
}
