'use client';

import * as React from 'react';
import { tokens } from '@fluentui/react-theme';
import { useCssVarValue } from '@fluentui/react-utilities';
import { hsl as d3Hsl } from 'd3-color';

/**
 * Extracts the CSS custom-property name out of a `tokens.*` read string
 * (`'var(--color-neutral-background-1)'` → `'--color-neutral-background-1'`), keeping this
 * file in lockstep with @fluentui/tokens instead of hardcoding variable names.
 */
function cssVarNameOf(tokenReadString: string): string {
  const match = /^var\((--[^,)]+)/.exec(tokenReadString);
  return match ? match[1] : tokenReadString;
}

// Web-light defaults (the `:root` emission values), used before the element mounts or
// when no themed scope resolves — matches the pre-2b `webLightTheme` fallback behavior.
const LIGHT_BACKGROUND = '#ffffff';
const LIGHT_FOREGROUND = '#242424';

/**
 * Hook to determine if dark theme is active based on background/foreground luminance.
 *
 * Theming Phase 2b: themes are static CSS classes, so the values are read from the CSS
 * custom properties at `elementRef` via {@link useCssVarValue} (once per mount — the
 * chart re-mounts/re-keys on theme swaps in practice; the read is not reactive). The
 * pre-2b implementation read the JS theme object from the removed ThemeContext.
 *
 * @param elementRef - ref to an element INSIDE the themed scope (typically the chart's
 *   root/container element).
 */
export function useIsDarkTheme(elementRef: React.RefObject<HTMLElement | null>): boolean {
  const backgroundValue = useCssVarValue(cssVarNameOf(tokens.colorNeutralBackground1), elementRef, {
    fallback: LIGHT_BACKGROUND,
  });
  const foregroundValue = useCssVarValue(cssVarNameOf(tokens.colorNeutralForeground1), elementRef, {
    fallback: LIGHT_FOREGROUND,
  });

  const backgroundColor = d3Hsl(backgroundValue!);
  const foregroundColor = d3Hsl(foregroundValue!);

  return backgroundColor.l < foregroundColor.l;
}

/**
 * Hook for color mapping across charts - maintains persistent color assignments
 */
export function useColorMapping(): React.RefObject<Map<string, string>> {
  return React.useRef<Map<string, string>>(new Map());
}
