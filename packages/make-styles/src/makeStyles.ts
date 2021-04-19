import { DEFINITION_LOOKUP_TABLE, SEQUENCE_PREFIX } from './constants';
import { createCSSVariablesProxy } from './runtime/createCSSVariablesProxy';
import { hashString } from './runtime/utils/hashString';
import { resolveStyleRules } from './runtime/resolveStyleRules';
import {
  MakeStylesOptions,
  MakeStylesRenderer,
  MakeStylesResolvedRule,
  MakeStylesStyleFunctionRule,
  MakeStylesStyleRule,
} from './types';

type ResolvedStylesBySlots<Slots extends string> = Record<Slots, Record<string, MakeStylesResolvedRule>>;

function resolveClasses<Slots extends string>(
  resolvedStyles: ResolvedStylesBySlots<Slots>,
  dir: 'ltr' | 'rtl',
  renderer: MakeStylesRenderer,
) {
  const resolvedClasses = {} as Record<Slots, string>;

  // eslint-disable-next-line guard-for-in
  for (const slotName in resolvedStyles) {
    const slotClasses = renderer.insertDefinitions(dir, resolvedStyles[slotName]);
    const sequenceHash = SEQUENCE_PREFIX + hashString(slotClasses);

    const resultSlotClasses = sequenceHash + ' ' + slotClasses;

    DEFINITION_LOOKUP_TABLE[sequenceHash] = [resolvedStyles[slotName], dir === 'rtl'];
    resolvedClasses[slotName] = resultSlotClasses;
  }

  return resolvedClasses;
}

export function makeStyles<Slots extends string, Tokens>(
  stylesBySlots: Record<Slots, MakeStylesStyleRule<Tokens>>,
  unstable_cssPriority: number = 0,
) {
  let resolvedStyles: ResolvedStylesBySlots<Slots> | null = null;

  let resolvedClasses: Record<Slots, string> | null = null;
  let resolvedClassesRtl: Record<Slots, string> | null = null;

  const insertionCache: Record<string, boolean> = {};

  function computeClasses(options: MakeStylesOptions): Record<Slots, string> {
    const { dir, renderer } = options;

    if (resolvedStyles === null) {
      resolvedStyles = {} as ResolvedStylesBySlots<Slots>;

      const tokensProxy = createCSSVariablesProxy() as Tokens;

      // eslint-disable-next-line guard-for-in
      for (const slotName in stylesBySlots) {
        const slotStyles = stylesBySlots[slotName];
        const preparedSlotStyles =
          typeof slotStyles === 'function'
            ? (slotStyles as MakeStylesStyleFunctionRule<Tokens>)(tokensProxy)
            : slotStyles;

        resolvedStyles[slotName] = resolveStyleRules(preparedSlotStyles, unstable_cssPriority);
      }
    }

    if (dir === 'rtl') {
      // As RTL classes are different they should have a different cache key for insertion
      const rendererId = renderer.id + 'r';

      if (resolvedClassesRtl === null || insertionCache[rendererId] === undefined) {
        resolvedClassesRtl = resolveClasses(resolvedStyles, dir, renderer);
        insertionCache[rendererId] = true;
      }
    } else {
      if (resolvedClasses === null || insertionCache[renderer.id] === undefined) {
        resolvedClasses = resolveClasses(resolvedStyles, dir, renderer);
        insertionCache[options.renderer.id] = true;
      }
    }

    return dir === 'ltr' ? (resolvedClasses as Record<Slots, string>) : (resolvedClassesRtl as Record<Slots, string>);
  }

  return computeClasses;
}
