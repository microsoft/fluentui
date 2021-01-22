import { DEFINITION_LOOKUP_TABLE } from './constants';
import { MakeStylesOptions, MakeStylesResolvedStyles, MakeStylesStyleRule } from './types';
import { resolveStyleRules } from './runtime/resolveStyleRules';

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
      const resolvedStyleRule: MakeStylesResolvedStyles =
        process.env.NODE_ENV === 'production'
          ? ((styleRules[slotName] as unknown) as MakeStylesResolvedStyles)
          : resolveStyleRules(styleRules[slotName], unstable_cssPriority);

      resolvedClassNames[slotName] = options.renderer.insertDefinitions(
        DEFINITION_LOOKUP_TABLE,
        resolvedStyleRule,
        !!options.rtl,
      );
    }

    insertionCacheByRenderer[options.renderer.id] = true;

    return resolvedClassNames;
    // }

    // TODO: fix IE 11 level

    return {};
  }

  return computeOverrides;
}
