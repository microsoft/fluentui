import * as React from 'react';
import { DataVizPalette, getColorFromToken, getNextColor } from '../../utilities/colors';

/**
 * Vega-Lite Color Scheme to Fluent DataViz Palette Adapter
 * 
 * Maps standard Vega-Lite color schemes to Fluent UI DataViz colors
 * Similar to PlotlyColorAdapter but for Vega-Lite specifications
 */

// Vega's category10 scheme (D3 Category10)
// https://vega.github.io/vega/docs/schemes/#categorical
const VEGA_CATEGORY10 = [
  '#1f77b4', // blue
  '#ff7f0e', // orange
  '#2ca02c', // green
  '#d62728', // red
  '#9467bd', // purple
  '#8c564b', // brown
  '#e377c2', // pink
  '#7f7f7f', // gray
  '#bcbd22', // olive
  '#17becf', // cyan
];

// Vega's category20 scheme
const VEGA_CATEGORY20 = [
  '#1f77b4', '#aec7e8', // blue shades
  '#ff7f0e', '#ffbb78', // orange shades
  '#2ca02c', '#98df8a', // green shades
  '#d62728', '#ff9896', // red shades
  '#9467bd', '#c5b0d5', // purple shades
  '#8c564b', '#c49c94', // brown shades
  '#e377c2', '#f7b6d2', // pink shades
  '#7f7f7f', '#c7c7c7', // gray shades
  '#bcbd22', '#dbdb8d', // olive shades
  '#17becf', '#9edae5', // cyan shades
];

// Tableau10 scheme (commonly used in Vega-Lite)
const VEGA_TABLEAU10 = [
  '#4e79a7', // blue
  '#f28e2c', // orange
  '#e15759', // red
  '#76b7b2', // teal
  '#59a14f', // green
  '#edc949', // yellow
  '#af7aa1', // purple
  '#ff9da7', // pink
  '#9c755f', // brown
  '#bab0ab', // gray
];

// Tableau20 scheme
const VEGA_TABLEAU20 = [
  '#4e79a7', '#a0cbe8', // blue shades
  '#f28e2c', '#ffbe7d', // orange shades
  '#59a14f', '#8cd17d', // green shades
  '#b6992d', '#f1ce63', // yellow shades
  '#499894', '#86bcb6', // teal shades
  '#e15759', '#ff9d9a', // red shades
  '#79706e', '#bab0ab', // gray shades
  '#d37295', '#fabfd2', // pink shades
  '#b07aa1', '#d4a6c8', // purple shades
  '#9d7660', '#d7b5a6', // brown shades
];

// Mapping from Vega category10 to Fluent DataViz tokens
const CATEGORY10_FLUENT_MAPPING: string[] = [
  DataVizPalette.color26, // blue -> lightBlue.shade10
  DataVizPalette.warning, // orange -> semantic warning
  DataVizPalette.color5, // green -> lightGreen.primary
  DataVizPalette.error, // red -> semantic error
  DataVizPalette.color4, // purple -> orchid.tint10
  DataVizPalette.color17, // brown -> pumpkin.shade20
  DataVizPalette.color22, // pink -> hotPink.tint20
  DataVizPalette.disabled, // gray -> semantic disabled
  DataVizPalette.color10, // olive/yellow-green -> gold.shade10
  DataVizPalette.color3, // cyan/teal -> teal.tint20
];

// Mapping from Vega category20 to Fluent DataViz tokens
const CATEGORY20_FLUENT_MAPPING: string[] = [
  DataVizPalette.color26, DataVizPalette.color36, // blue shades
  DataVizPalette.warning, DataVizPalette.color27, // orange shades
  DataVizPalette.color5, DataVizPalette.color15, // green shades
  DataVizPalette.error, DataVizPalette.color32, // red shades
  DataVizPalette.color4, DataVizPalette.color24, // purple shades
  DataVizPalette.color17, DataVizPalette.color37, // brown shades
  DataVizPalette.color22, DataVizPalette.color12, // pink shades
  DataVizPalette.disabled, DataVizPalette.color31, // gray shades
  DataVizPalette.color10, DataVizPalette.color30, // olive shades
  DataVizPalette.color3, DataVizPalette.color13, // cyan shades
];

// Mapping from Tableau10 to Fluent DataViz tokens
const TABLEAU10_FLUENT_MAPPING: string[] = [
  DataVizPalette.color1, // blue -> cornflower.tint10
  DataVizPalette.color7, // orange -> pumpkin.primary
  DataVizPalette.error, // red -> semantic error
  DataVizPalette.color3, // teal -> teal.tint20
  DataVizPalette.color5, // green -> lightGreen.primary
  DataVizPalette.color10, // yellow -> gold.shade10
  DataVizPalette.color4, // purple -> orchid.tint10
  DataVizPalette.color2, // pink -> hotPink.primary
  DataVizPalette.color17, // brown -> pumpkin.shade20
  DataVizPalette.disabled, // gray -> semantic disabled
];

// Mapping from Tableau20 to Fluent DataViz tokens
const TABLEAU20_FLUENT_MAPPING: string[] = [
  DataVizPalette.color1, DataVizPalette.color11, // blue shades
  DataVizPalette.color7, DataVizPalette.color27, // orange shades
  DataVizPalette.color5, DataVizPalette.color15, // green shades
  DataVizPalette.color10, DataVizPalette.color30, // yellow shades
  DataVizPalette.color3, DataVizPalette.color13, // teal shades
  DataVizPalette.error, DataVizPalette.color32, // red shades
  DataVizPalette.disabled, DataVizPalette.color31, // gray shades
  DataVizPalette.color2, DataVizPalette.color12, // pink shades
  DataVizPalette.color4, DataVizPalette.color24, // purple shades
  DataVizPalette.color17, DataVizPalette.color37, // brown shades
];

/**
 * Supported Vega-Lite color scheme names
 */
export type VegaColorScheme = 
  | 'category10'
  | 'category20'
  | 'category20b'
  | 'category20c'
  | 'tableau10'
  | 'tableau20'
  | 'accent'
  | 'dark2'
  | 'paired'
  | 'pastel1'
  | 'pastel2'
  | 'set1'
  | 'set2'
  | 'set3';

/**
 * Gets the Fluent color mapping for a given Vega-Lite color scheme
 */
function getSchemeMapping(scheme: string | undefined): string[] | undefined {
  if (!scheme) {
    return undefined;
  }

  const schemeLower = scheme.toLowerCase();
  
  switch (schemeLower) {
    case 'category10':
      return CATEGORY10_FLUENT_MAPPING;
    case 'category20':
    case 'category20b':
    case 'category20c':
      return CATEGORY20_FLUENT_MAPPING;
    case 'tableau10':
      return TABLEAU10_FLUENT_MAPPING;
    case 'tableau20':
      return TABLEAU20_FLUENT_MAPPING;
    // For unsupported schemes, fall back to default Fluent palette
    case 'accent':
    case 'dark2':
    case 'paired':
    case 'pastel1':
    case 'pastel2':
    case 'set1':
    case 'set2':
    case 'set3':
      console.warn(
        `VegaLiteColorAdapter: Color scheme '${scheme}' is not yet mapped to Fluent colors. Using default palette.`
      );
      return undefined;
    default:
      return undefined;
  }
}

/**
 * Gets a color for a series based on Vega-Lite color encoding
 * 
 * @param index - Series index
 * @param scheme - Vega-Lite color scheme name (e.g., 'category10', 'tableau10')
 * @param range - Custom color range array
 * @param isDarkTheme - Whether dark theme is active
 * @returns Color string (hex)
 */
export function getVegaColor(
  index: number,
  scheme: string | undefined,
  range: string[] | undefined,
  isDarkTheme: boolean = false,
): string {
  // Priority 1: Custom range (highest priority)
  if (range && range.length > 0) {
    return range[index % range.length];
  }

  // Priority 2: Named color scheme mapped to Fluent
  const schemeMapping = getSchemeMapping(scheme);
  if (schemeMapping) {
    const token = schemeMapping[index % schemeMapping.length];
    return getColorFromToken(token, isDarkTheme);
  }

  // Priority 3: Default Fluent qualitative palette
  return getNextColor(index, 0, isDarkTheme);
}

/**
 * Gets a color from the color map or creates a new one based on Vega-Lite encoding
 * 
 * @param legendLabel - Legend label for the series
 * @param colorMap - Color mapping ref for consistent coloring across charts
 * @param scheme - Vega-Lite color scheme name
 * @param range - Custom color range array
 * @param isDarkTheme - Whether dark theme is active
 * @returns Color string (hex)
 */
export function getVegaColorFromMap(
  legendLabel: string,
  colorMap: React.RefObject<Map<string, string>>,
  scheme: string | undefined,
  range: string[] | undefined,
  isDarkTheme: boolean = false,
): string {
  // Check if color is already assigned
  if (colorMap.current?.has(legendLabel)) {
    return colorMap.current.get(legendLabel)!;
  }

  // Assign new color based on current map size
  const index = colorMap.current?.size ?? 0;
  const color = getVegaColor(index, scheme, range, isDarkTheme);
  
  colorMap.current?.set(legendLabel, color);
  return color;
}

/**
 * Checks if the provided range matches a standard Vega scheme
 * Useful for optimizing color assignment
 */
export function isStandardVegaScheme(range: string[] | undefined): VegaColorScheme | undefined {
  if (!range || range.length === 0) {
    return undefined;
  }

  const rangeLower = range.map(c => c.toLowerCase());

  if (arraysEqual(rangeLower, VEGA_CATEGORY10)) {
    return 'category10';
  }
  if (arraysEqual(rangeLower, VEGA_CATEGORY20)) {
    return 'category20';
  }
  if (arraysEqual(rangeLower, VEGA_TABLEAU10)) {
    return 'tableau10';
  }
  if (arraysEqual(rangeLower, VEGA_TABLEAU20)) {
    return 'tableau20';
  }

  return undefined;
}

/**
 * Helper to compare two arrays for equality
 */
function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((val, idx) => val === b[idx]);
}
