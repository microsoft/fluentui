/**
 * AgentCraftworks Theme — Semantic overrides on top of FluentUI brand themes
 *
 * This file layers AgentCraftworks-specific color overrides onto the
 * base themes from brand.ts. Surfaces should import from here (or index.ts),
 * not from brand.ts directly.
 */

import {
  agentCraftworksLightTheme,
  agentCraftworksDarkTheme,
  agentCraftworksHighContrastTheme,
} from './brand.js';

/**
 * Light theme with AgentCraftworks semantic overrides
 */
export const lightTheme = {
  ...agentCraftworksLightTheme,

  // AgentCraftworks brand overrides
  colorNeutralBackground1: '#fafbfc',        // Cool white background
  colorNeutralForeground1: '#102f5e',        // Deep navy text
  colorBrandBackground: '#0c6fd1',           // Confident blue
  colorBrandForegroundOnLight: '#102f5e',     // Navy on light surfaces
};

/**
 * Dark theme with AgentCraftworks semantic overrides
 */
export const darkTheme = {
  ...agentCraftworksDarkTheme,

  // AgentCraftworks brand overrides
  colorNeutralBackground1: '#090c14',        // Rich deep navy
  colorNeutralForeground1: '#d6dbe4',        // Warm light text
  colorBrandBackground: '#1a80e0',           // Bright blue on dark
};

/**
 * High-contrast theme — re-exported from brand.ts.
 * Uses Windows system colors, no brand customization needed.
 */
export const highContrastTheme = agentCraftworksHighContrastTheme;
