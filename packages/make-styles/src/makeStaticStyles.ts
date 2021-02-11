import { resolveStaticStyleRules } from './runtime/resolveStaticStyleRules';
import { MakeStaticStylesOptions, MakeStaticStyles } from './types';

/**
 * Register static css.
 * @param styles styles object or string.
 */
export function makeStaticStyles(styles: MakeStaticStyles) {
  const styleCache: Record<string, true> = {};

  function useStaticStyles(options: MakeStaticStylesOptions): void {
    const resolvedStyleRules = resolveStaticStyleRules(styles);

    const cacheKey = options.renderer.id;
    if (styleCache[cacheKey]) {
      return;
    }

    options.renderer.insertDefinitions(resolvedStyleRules, false /** static rules do not support RTL transforms */);
    styleCache[cacheKey] = true;
  }

  return useStaticStyles;
}
