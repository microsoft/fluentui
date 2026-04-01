/**
 * AgentCraftworks Brand — FluentUI Theme Designer Export
 *
 * Generated from: https://react.fluentui.dev/?path=/docs/themedesigner--docs
 * Key color: #0C6FD1 (AgentCraftworks confident blue)
 * Hue Torsion: 0, Vibrancy: 0
 */

import type { BrandVariants, Theme } from '@fluentui/react-components';
import { createLightTheme, createDarkTheme, createHighContrastTheme } from '@fluentui/react-components';

export const agentCraftworksBrand: BrandVariants = {
  10: '#020305',
  20: '#111724',
  30: '#172540',
  40: '#1A3157',
  50: '#1C3E6F',
  60: '#1C4A89',
  70: '#1A57A3',
  80: '#1465BD',
  90: '#2273D3',
  100: '#4980D8',
  110: '#648EDD',
  120: '#7C9CE2',
  130: '#91AAE6',
  140: '#A6B9EB',
  150: '#BAC8F0',
  160: '#CDD7F4',
};

export const agentCraftworksLightTheme: Theme = {
  ...createLightTheme(agentCraftworksBrand),
};

export const agentCraftworksDarkTheme: Theme = {
  ...createDarkTheme(agentCraftworksBrand),
  // Theme Designer recommended overrides for dark foreground legibility
  colorBrandForeground1: agentCraftworksBrand[110],
  colorBrandForeground2: agentCraftworksBrand[120],
};

/**
 * High-contrast theme — respects Windows system HC colors.
 * No brand customization needed; FluentUI maps to system colors automatically.
 */
export const agentCraftworksHighContrastTheme: Theme = createHighContrastTheme();
