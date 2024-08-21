import type { ZIndexTokens } from '../types';

/**
 * ZIndex global defaults
 */
export const zIndexes: ZIndexTokens = {
  zIndexBackground: '0', // Elevation 0
  zIndexContent: '1', // Elevation 2
  zIndexOverlay: '1000', // Elevation 4
  zIndexPopup: '2000', // Elevation 8
  zIndexMessages: '3000', // Elevation 16
  zIndexFloating: '4000', // Elevation 28
  zIndexPriority: '5000', // Elevation 64
  zIndexDebug: '6000', // Used for debugging
};

function indexesToVars(indexes: Record<string, string>): ZIndexTokens {
  const tokens = {} as ZIndexTokens;
  const keys = Object.keys(indexes) as (keyof ZIndexTokens)[];

  for (const key of keys) {
    tokens[key] = `var(--${key}, ${indexes[key]})`;
  }

  return tokens;
}

export const zIndexVarsWithDefaults = indexesToVars(zIndexes);
