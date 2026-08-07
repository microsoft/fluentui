'use client';

import * as React from 'react';
import { useThemeClassName_unstable as useThemeClassName } from '@fluentui/react-shared-contexts';
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
 * custom properties at `elementRef` via {@link useCssVarValue}. The pre-2b implementation
 * read the JS theme object from the removed `ThemeContext_unstable`.
 *
 * ## Reactivity
 *
 * `useCssVarValue` is read-once-per-(element, variable) by design, so a re-read has to be
 * triggered explicitly via its `deps`. The trigger used here is the closest
 * FluentProvider's class string (`useThemeClassName_unstable`), which carries the resolved
 * theme class — see `useFluentProviderStyles.styles.ts`, where `state.themeClassName` joins
 * `root.className`, and `useFluentProviderContextValues_unstable`, which publishes that
 * string as the context value. Swapping a provider's `themeClassName` therefore changes
 * this dependency and re-reads the variables from the DOM.
 *
 * This reproduces the PRE-2b reactivity envelope exactly, no more and no less: the pre-2b
 * implementation subscribed to `ThemeContext_unstable`, so it likewise tracked provider
 * theme changes only. A theme class applied to a bare element (scoped theming without a
 * provider) was not tracked before this change and is not tracked now — such a scope
 * resolves correctly on mount, but a later class swap on that same element needs a remount
 * (or a `key`) to be picked up.
 *
 * @param elementRef - ref to an element INSIDE the themed scope (typically the chart's
 *   root/container element).
 */
export function useIsDarkTheme(elementRef: React.RefObject<HTMLElement | null>): boolean {
  // The closest provider's class string; changes whenever its resolved theme class does.
  const themeClassName = useThemeClassName();

  const backgroundValue = useCssVarValue(cssVarNameOf(tokens.colorNeutralBackground1), elementRef, {
    fallback: LIGHT_BACKGROUND,
    deps: [themeClassName],
  });
  const foregroundValue = useCssVarValue(cssVarNameOf(tokens.colorNeutralForeground1), elementRef, {
    fallback: LIGHT_FOREGROUND,
    deps: [themeClassName],
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
