import type { ZIndexTokens } from '../types';

/**
 * ZIndex global defaults
 */
export const zIndexesDefaults: ZIndexTokens = {
  /**
   * Elevation 0
   * Can be used for background elements, like surfaces
   */
  zIndexBackground: '0',

  /**
   * Elevation 2
   * Can be used content that is on top of the background, like cards
   */
  zIndexContent: '1',

  /**
   * Elevation 4
   * Can be used for overlays, like the backdrop of a modal
   */
  zIndexOverlay: '1000',

  /**
   * Elevation 8
   * Can be used for popups, like modals and drawers
   */
  zIndexPopup: '2000',

  /**
   * Elevation 16
   * Can be used for messages, like snackbars and toasts
   */
  zIndexMessages: '3000',

  /**
   * Elevation 28
   * Can be used for floating elements, like dropdowns
   */
  zIndexFloating: '4000',

  /**
   * Elevation 64
   * Can be used for high priority floating elements, like tooltips
   */
  zIndexPriority: '5000',

  /**
   * Special elevation
   * Can be used for elements that need to be above everything else, like debug overlays
   */
  zIndexDebug: '6000',
};

function indexesToVars(indexes: Record<string, string>): Required<ZIndexTokens> {
  const tokens = {} as Required<ZIndexTokens>;
  const keys = Object.keys(indexes) as (keyof ZIndexTokens)[];

  for (const key of keys) {
    tokens[key] = `var(--${key}, ${indexes[key]})`;
  }

  return tokens;
}

export const zIndexVarsWithDefaults = indexesToVars(zIndexesDefaults);
