import { CAN_USE_CSS_VARIABLES, DEFINITION_LOOKUP_TABLE } from './constants';
import { MakeStylesOptions, MakeStylesResolvedStyles, MakeStylesStyleRule } from './types';
import { resolveStyleRules } from './runtime/resolveStyleRules';

export function makeOverrides<Tokens>(styleRule: MakeStylesStyleRule<Tokens>, unstable_cssPriority: number = 0) {
  let resolvedClassNames: string | null = null;

  // TODO: does not support RTL yet

  const insertionCacheByRenderer: Record<string, boolean> = {};

  function computeOverrides(options: MakeStylesOptions<Tokens>): string {
    if (CAN_USE_CSS_VARIABLES) {
      if (resolvedClassNames !== null && insertionCacheByRenderer[options.renderer.id]) {
        return resolvedClassNames;
      }

      // In production it should use prebuilt styles
      // TODO: throw an error?
      // TODO: this should be cached as it's not dependant on renderer
      const resolvedStyleRule: MakeStylesResolvedStyles =
        process.env.NODE_ENV === 'production'
          ? ((styleRule as unknown) as MakeStylesResolvedStyles)
          : resolveStyleRules(styleRule, unstable_cssPriority);

      resolvedClassNames = options.renderer.insertDefinitions(
        DEFINITION_LOOKUP_TABLE,
        resolvedStyleRule,
        !!options.rtl,
      );
      insertionCacheByRenderer[options.renderer.id] = true;

      return resolvedClassNames;
    }

    // TODO: fix IE 11 level

    return '';
  }

  return computeOverrides;
}
