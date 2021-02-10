import { CAN_USE_CSS_VARIABLES } from './constants';
import { createCSSVariablesProxy } from './runtime/index';
import { resolveStaticStyleRules } from './runtime/resolveStaticStyleRules';
import { MakeStaticStylesStyleRule, MakeStylesOptions, MakeStaticStylesStyleFunctionRule } from './types';

export function makeStaticStyles<Tokens>(styles: MakeStaticStylesStyleRule<Tokens>) {
  const styleCache: Record<string, true> = {};

  function computeClasses(options: MakeStylesOptions<Tokens>): void {
    // TODO: remove proxy
    const tokens = CAN_USE_CSS_VARIABLES ? createCSSVariablesProxy(options.tokens) : options.tokens;

    const styleRules =
      typeof styles === 'function' ? (styles as MakeStaticStylesStyleFunctionRule<Tokens>)(tokens) : styles;
    const resolvedStyleRule = resolveStaticStyleRules(styleRules);

    const cacheKey = options.renderer.id;
    const cacheValue = styleCache[cacheKey];
    if (cacheValue) {
      return;
    }

    options.renderer.insertDefinitions(resolvedStyleRule, !!options.rtl);
    styleCache[cacheKey] = true;
  }

  return computeClasses;
}
