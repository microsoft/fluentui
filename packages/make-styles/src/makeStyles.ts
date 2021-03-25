import { DEFINITION_LOOKUP_TABLE, SEQUENCE_PREFIX } from './constants';
import { createCSSVariablesProxy, resolveStyleRules } from './runtime/index';
import { hashString } from './runtime/utils/hashString';
import {
  MakeStylesOptions,
  MakeStylesRenderer,
  MakeStylesResolvedRule,
  MakeStylesStyleFunctionRule,
  MakeStylesStyleRule,
} from './types';

type Created<Slots extends string> = Record<Slots, Record<string, MakeStylesResolvedRule>>;

function resolveClasses<Slots extends string>(
  resolvedStyles: Created<Slots>,
  dir: 'ltr' | 'rtl',
  renderer: MakeStylesRenderer,
) {
  const resolvedClasses = {} as Record<Slots, string>;

  // eslint-disable-next-line guard-for-in
  for (const slotName in resolvedStyles) {
    const slotClasses = renderer.insertDefinitions(dir, resolvedStyles[slotName]);
    const sequenceHash = SEQUENCE_PREFIX + hashString(slotClasses);

    const resultSlotClasses = sequenceHash + ' ' + slotClasses;

    DEFINITION_LOOKUP_TABLE[sequenceHash] = resolvedStyles[slotName];
    resolvedClasses[slotName] = resultSlotClasses;
  }

  return resolvedClasses;
}

export function makeStyles<Slots extends string, Tokens>(
  stylesBySlots: Record<Slots, MakeStylesStyleRule<Tokens>>,
  unstable_cssPriority: number = 0,
) {
  let resolvedStyles: Created<Slots> | null = null;

  // TODO: docs
  let resolvedClasses: Record<Slots, string> | null = null;
  let resolvedClassesRtl: Record<Slots, string> | null = null;

  const insertionCache: Record<string, boolean> = {};

  function computeClasses(options: MakeStylesOptions<Tokens>): Record<Slots, string> {
    const { dir, renderer, tokens } = options;

    if (resolvedStyles === null) {
      resolvedStyles = {} as Created<Slots>;

      const tokensProxy = createCSSVariablesProxy(tokens);

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
      if (resolvedClassesRtl === null || insertionCache[renderer.id] === undefined) {
        resolvedClassesRtl = resolveClasses(resolvedStyles, dir, renderer);
        insertionCache[options.renderer.id] = true;
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
