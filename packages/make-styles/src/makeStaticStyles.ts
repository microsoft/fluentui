import { resolveStaticStyleRules } from './runtime/resolveStaticStyleRules';
import { MakeStaticStylesOptions, MakeStaticStyles } from './types';

/**
 * Register static css.
 * @param styles styles object or string.
 */
export function makeStaticStyles(styles: MakeStaticStyles | MakeStaticStyles[]) {
  const styleCache: Record<string, true> = {};
  const stylesSet: MakeStaticStyles[] = Array.isArray(styles) ? styles : [styles];

  function useStaticStyles(options: MakeStaticStylesOptions): void {
    const cacheKey = options.renderer.id;
    if (styleCache[cacheKey]) {
      return;
    }

    for (const styleRules of stylesSet) {
      const resolvedStyleRules = resolveStaticStyleRules(styleRules);
      options.renderer.insertDefinitions(resolvedStyleRules, false /** static rules do not support RTL transforms */);
    }

    styleCache[cacheKey] = true;
  }

  return useStaticStyles;
}
