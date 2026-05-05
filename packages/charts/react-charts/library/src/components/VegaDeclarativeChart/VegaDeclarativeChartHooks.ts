'use client';

import * as React from 'react';
import { ThemeContext_unstable as V9ThemeContext } from '@fluentui/react-shared-contexts';
import type { Theme } from '@fluentui/tokens';
import { webLightTheme } from '@fluentui/tokens';
import { hsl as d3Hsl } from 'd3-color';

/**
 * Hook to determine if dark theme is active based on background/foreground luminance
 */
export function useIsDarkTheme(): boolean {
  const parentV9Theme = React.useContext(V9ThemeContext) as Theme;
  const v9Theme: Theme = parentV9Theme ? parentV9Theme : webLightTheme;

  const backgroundColor = d3Hsl(v9Theme.colorNeutralBackground1);
  const foregroundColor = d3Hsl(v9Theme.colorNeutralForeground1);

  const isDarkTheme = backgroundColor.l < foregroundColor.l;

  return isDarkTheme;
}

/**
 * Hook for color mapping across charts - maintains persistent color assignments
 */
export function useColorMapping(): React.RefObject<Map<string, string>> {
  return React.useRef<Map<string, string>>(new Map());
}
