/* eslint-disable @typescript-eslint/no-explicit-any */
import { tokensToStyleObject } from './tokensToStyleObject';
import { Theme } from '@fluentui/theme';
import { StyleRenderer, useTheme, useStyleRenderer } from './index';
import { useWindow } from '@fluentui/react-window-provider';
import { replaceCSSVariables } from './replaceCSSVariables';
import { callOrReturn } from './callOrReturn';
import { graphSet, graphGet } from './graph';
import { UseVariantClassesOverride } from './makeVariantClasses';

/** Get cache keys array, based on the variants available. */
const getCacheKeys = (state: any, variantSets: Record<string, any>[]) => {
  const cacheKeys = [];

  for (const set of variantSets) {
    if (set) {
      for (const variantName of Object.keys(set)) {
        if (variantName !== 'root') {
          const variantNameParts = variantName.split('_');

          const isActive =
            state.variant === variantName ||
            state[variantName] ||
            (variantNameParts.length === 2 && state[variantNameParts[0]] === variantNameParts[1]);

          cacheKeys.push(variantName + '-' + isActive);
        }
      }
    }
  }

  return cacheKeys;
};

function _setClass(state: Record<string, any>, className: string, slot?: string) {
  const currentSlot = slot ? (state[slot] = state[slot] || {}) : state;

  if (currentSlot.className) {
    currentSlot.className += ' ' + className;
  } else {
    currentSlot.className = className;
  }
}

export const useVariantClassesIE11Override: UseVariantClassesOverride = (state, theme, renderer, options, cache) => {
  const win = useWindow();
  const contextualTheme = useTheme();
  const contextualRenderer = useStyleRenderer();
  const rendererId = contextualRenderer.getId();
  const { styles: styleOrFunction, variants, name, prefix } = options!;
  const { tokens: inlineTokens, variant: activeVariant } = state as any;

  // Use the passed in theme/render, fall back to contextual values.
  theme = theme || contextualTheme || {};
  renderer = (renderer || contextualRenderer) as StyleRenderer;

  // Build up the variant sets so that we can evaluate a cache key for the classes.
  const themeVariants = name ? theme?.components?.[name]?.variants : undefined;
  const variantSets = [
    callOrReturn(variants, theme),
    callOrReturn(themeVariants, theme),
    { root: callOrReturn(inlineTokens, theme) },
  ];

  // Derive the cache
  const cachePath = [
    rendererId,
    win,
    theme && theme.id ? theme.id : theme,
    JSON.stringify(inlineTokens),
    ...getCacheKeys(state, variantSets),
  ];

  // Look up classnames from cache.
  let classNames = graphGet(cache!, cachePath);

  // If cache miss, build the classnames.
  if (!classNames) {
    const isStyleFunction = typeof styleOrFunction === 'function';
    const styles = isStyleFunction ? (styleOrFunction as (theme: Theme) => any)(theme!) : styleOrFunction;
    const variables = tokensToStyleObject(theme.tokens);

    // Iterate through all valid variant sets in the order of least to most important (defaults, theme, inline)
    for (const set of variantSets) {
      if (set) {
        // Loop through the variants in the set.
        for (const variantName of Object.keys(set)) {
          // If the set is root, or if the set matches a state modifier or the activeVariant,
          if (variantName === 'root' || (state as any)[variantName] || activeVariant === variantName) {
            // Assign the flattened token set to the variables set to resolve.
            Object.assign(variables, tokensToStyleObject(set[variantName], prefix));
          } else {
            const nameParts = variantName.split('_');
            // If the set matches an enum/value pair,
            if (nameParts.length === 2 && (state as any)[nameParts[0]] === nameParts[1]) {
              // Assign the flattened token set to the variables set to resolve.
              Object.assign(variables, tokensToStyleObject(set[variantName], prefix));
            }
          }
        }
      }
    }

    const resolvedStyles = replaceCSSVariables(styles, variables as any);
    classNames = renderer.renderStyles(resolvedStyles, { targetWindow: win, rtl: !!theme!.rtl });
    graphSet(cache!, cachePath, classNames);
  }

  // Apply the classnames to the state.
  for (const slot of Object.keys(classNames)) {
    _setClass(state, classNames[slot], slot !== 'root' ? slot : '');
  }
};
