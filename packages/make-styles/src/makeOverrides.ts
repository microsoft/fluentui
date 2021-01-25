import { MakeStylesOptions, MakeStylesResolvedStyles, MakeStylesStyleRule } from './types';
// import { resolveStyleRules } from './runtime/resolveStyleRules';
import { DEFINITION_LOOKUP_TABLE, SEQUENCE_PREFIX } from './constants';
import { hashString } from './runtime/utils/hashString';

type ClassNamesMap = Record<string, string>;

export function makeOverrides<Tokens>(
  styleRules: Record<string, MakeStylesStyleRule<Tokens>>,
  unstable_cssPriority: number = 0,
) {
  let resolvedClassNames: ClassNamesMap | null = null;

  // TODO: does not support RTL yet

  const insertionCacheByRenderer: Record<string, boolean> = {};

  function computeOverrides(options: MakeStylesOptions<Tokens>): ClassNamesMap {
    // if (CAN_USE_CSS_VARIABLES) {
    if (resolvedClassNames !== null && insertionCacheByRenderer[options.renderer.id]) {
      return resolvedClassNames;
    }

    // TODO: some description
    resolvedClassNames = {};

    // In production it should use prebuilt styles
    // TODO: throw an error?
    // TODO: this should be cached as it's not dependant on renderer

    // eslint-disable-next-line guard-for-in
    for (const slotName in styleRules) {
      // const resolvedStyleRule: MakeStylesResolvedStyles =
      //   process.env.NODE_ENV === 'production'
      //     ? ((styleRules[slotName] as unknown) as MakeStylesResolvedStyles)
      //     : resolveStyleRules(styleRules[slotName], unstable_cssPriority);

      const resolvedStyleRule: MakeStylesResolvedStyles = (styleRules[slotName] as unknown) as MakeStylesResolvedStyles;
      const resultClasses = options.renderer.insertDefinitions(resolvedStyleRule, !!options.rtl);
      const sequenceHash = SEQUENCE_PREFIX + hashString(resultClasses);

      resolvedClassNames[slotName] = sequenceHash + ' ' + resultClasses;
      DEFINITION_LOOKUP_TABLE[sequenceHash] = resolvedStyleRule;
    }

    insertionCacheByRenderer[options.renderer.id] = true;

    return resolvedClassNames;
    // }

    // TODO: fix IE 11 level

    return {};
  }

  return computeOverrides;
}
