import { ZIndexLevels, ZIndexTokens } from '../types';

// According to Fluent V2 guidelines
const levels: ZIndexLevels = [
  0, // Elevation 0
  1, // Elevation 2
  1000, // Elevation 4
  2000, // Elevation 8
  3000, // Elevation 16
  4000, // Elevation 28
  5000, // Elevation 64
  6000, // High priority elements
];

/**
 * Global z-index values for elements
 */
export const zIndexesTokens: ZIndexTokens = {
  zIndexBackground: levels[0], // default
  zIndexContent: levels[1], // content - header, footer, sidebar
  zIndexOverlay: levels[2], // overlay elements - drawer, nav
  zIndexPopup: levels[3], // popup layers - popups, modals, dialogs
  zIndexMessages: levels[4], // communication elements - banners, messages, toasts, snackbar
  zIndexFloating: levels[5], // floating elements - dropdowns, teaching
  zIndexPriority: levels[6], // priority elements - tooltips
  zIndexDebug: levels[7], // debug - error overlays, debug messages
};

/**
 * Global z-index map for elements
 */
export const zIndexes = {
  background: zIndexesTokens.zIndexBackground, // default
  content: zIndexesTokens.zIndexContent, // content - header, footer, sidebar
  overlay: zIndexesTokens.zIndexOverlay, // overlay elements - drawer, nav
  popup: zIndexesTokens.zIndexPopup, // popup layers - popups, modals, dialogs
  messages: zIndexesTokens.zIndexMessages, // communication elements - banners, messages, toasts, snackbar
  floating: zIndexesTokens.zIndexFloating, // floating elements - dropdowns, teaching
  priority: zIndexesTokens.zIndexPriority, // priority elements - tooltips
  debug: zIndexesTokens.zIndexDebug, // debug - error overlays, debug messages
};
