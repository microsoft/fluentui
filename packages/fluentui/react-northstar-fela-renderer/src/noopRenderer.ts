import type { Renderer } from './types';

// Provides a minimal functionality to render components without styles and without runtime errors.

export const noopRenderer: Renderer = {
  registerUsage: () => {},
  unregisterUsage: () => {},

  insertPendingRules: () => {},
  renderRule: () => '',
};
