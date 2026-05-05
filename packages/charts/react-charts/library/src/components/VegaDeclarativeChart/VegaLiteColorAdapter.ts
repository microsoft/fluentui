import { DataVizPalette, getColorFromToken, getNextColor } from '../../utilities/colors';
import { areArraysEqual } from '../../utilities/utilities';

/**
 * A ref-like object holding a mutable Map of legend-label to color.
 * Structurally compatible with React.RefObject<Map<string, string>>.
 */
export type ColorMapRef = { readonly current: Map<string, string> | null };

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
  '#1f77b4',
  '#aec7e8', // blue shades
  '#ff7f0e',
  '#ffbb78', // orange shades
  '#2ca02c',
  '#98df8a', // green shades
  '#d62728',
  '#ff9896', // red shades
  '#9467bd',
  '#c5b0d5', // purple shades
  '#8c564b',
  '#c49c94', // brown shades
  '#e377c2',
  '#f7b6d2', // pink shades
  '#7f7f7f',
  '#c7c7c7', // gray shades
  '#bcbd22',
  '#dbdb8d', // olive shades
  '#17becf',
  '#9edae5', // cyan shades
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
  '#4e79a7',
  '#a0cbe8', // blue shades
  '#f28e2c',
  '#ffbe7d', // orange shades
  '#59a14f',
  '#8cd17d', // green shades
  '#b6992d',
  '#f1ce63', // yellow shades
  '#499894',
  '#86bcb6', // teal shades
  '#e15759',
  '#ff9d9a', // red shades
  '#79706e',
  '#bab0ab', // gray shades
  '#d37295',
  '#fabfd2', // pink shades
  '#b07aa1',
  '#d4a6c8', // purple shades
  '#9d7660',
  '#d7b5a6', // brown shades
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
  DataVizPalette.color26,
  DataVizPalette.color36, // blue shades
  DataVizPalette.warning,
  DataVizPalette.color27, // orange shades
  DataVizPalette.color5,
  DataVizPalette.color15, // green shades
  DataVizPalette.error,
  DataVizPalette.color32, // red shades
  DataVizPalette.color4,
  DataVizPalette.color24, // purple shades
  DataVizPalette.color17,
  DataVizPalette.color37, // brown shades
  DataVizPalette.color22,
  DataVizPalette.color12, // pink shades
  DataVizPalette.disabled,
  DataVizPalette.color31, // gray shades
  DataVizPalette.color10,
  DataVizPalette.color30, // olive shades
  DataVizPalette.color3,
  DataVizPalette.color13, // cyan shades
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
  DataVizPalette.color1,
  DataVizPalette.color11, // blue shades
  DataVizPalette.color7,
  DataVizPalette.color27, // orange shades
  DataVizPalette.color5,
  DataVizPalette.color15, // green shades
  DataVizPalette.color10,
  DataVizPalette.color30, // yellow shades
  DataVizPalette.color3,
  DataVizPalette.color13, // teal shades
  DataVizPalette.error,
  DataVizPalette.color32, // red shades
  DataVizPalette.disabled,
  DataVizPalette.color31, // gray shades
  DataVizPalette.color2,
  DataVizPalette.color12, // pink shades
  DataVizPalette.color4,
  DataVizPalette.color24, // purple shades
  DataVizPalette.color17,
  DataVizPalette.color37, // brown shades
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
      // Color schemes not yet mapped to Fluent colors. Using default palette.
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
  colorMap: ColorMapRef,
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
 * Sequential and diverging color scheme ramps for heatmaps and continuous color scales.
 * Each ramp is a 5-point gradient matching D3/Vega defaults.
 */
const SEQUENTIAL_SCHEMES: Record<string, string[]> = {
  blues: ['#deebf7', '#9ecae1', '#4292c6', '#2171b5', '#084594'],
  greens: ['#e5f5e0', '#a1d99b', '#41ab5d', '#238b45', '#005a32'],
  reds: ['#fee0d2', '#fc9272', '#ef3b2c', '#cb181d', '#99000d'],
  oranges: ['#feedde', '#fdbe85', '#fd8d3c', '#e6550d', '#a63603'],
  purples: ['#efedf5', '#bcbddc', '#807dba', '#6a51a3', '#4a1486'],
  greys: ['#f0f0f0', '#bdbdbd', '#969696', '#636363', '#252525'],
  viridis: ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'],
  inferno: ['#000004', '#57106e', '#bc3754', '#f98c0a', '#fcffa4'],
  magma: ['#000004', '#51127c', '#b73779', '#fc8961', '#fcfdbf'],
  plasma: ['#0d0887', '#7e03a8', '#cc4778', '#f89540', '#f0f921'],
  greenblue: ['#e0f3db', '#a8ddb5', '#4eb3d3', '#2b8cbe', '#08589e'],
  yellowgreen: ['#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837'],
  yellowgreenblue: ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494'],
  redyellowgreen: ['#d73027', '#fc8d59', '#fee08b', '#91cf60', '#1a9850'],
  blueorange: ['#2166ac', '#67a9cf', '#f7f7f7', '#f4a582', '#b2182b'],
  redblue: ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'],
};

/**
 * Gets a sequential or diverging color ramp for heatmap rendering.
 * Returns an array of `steps` interpolated colors for the given scheme name.
 *
 * @param scheme - Vega-Lite scheme name (e.g., 'blues', 'viridis', 'redyellowgreen')
 * @param steps - Number of color stops (default: 5)
 * @returns Array of hex/rgb color strings, or undefined if scheme is not recognized
 */
export function getSequentialSchemeColors(scheme: string, steps: number = 5): string[] | undefined {
  const ramp = SEQUENTIAL_SCHEMES[scheme.toLowerCase()];
  if (!ramp) {
    return undefined;
  }

  if (steps === ramp.length) {
    return [...ramp];
  }

  // Interpolate to requested number of steps
  const result: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = steps === 1 ? 0.5 : i / (steps - 1);
    const pos = t * (ramp.length - 1);
    const lo = Math.floor(pos);
    const hi = Math.min(lo + 1, ramp.length - 1);
    const frac = pos - lo;

    if (frac === 0) {
      result.push(ramp[lo]);
    } else {
      result.push(interpolateHexColor(ramp[lo], ramp[hi], frac));
    }
  }
  return result;
}

/**
 * Linearly interpolates between two hex colors
 */
function interpolateHexColor(c1: string, c2: string, t: number): string {
  const r1 = parseInt(c1.slice(1, 3), 16);
  const g1 = parseInt(c1.slice(3, 5), 16);
  const b1 = parseInt(c1.slice(5, 7), 16);
  const r2 = parseInt(c2.slice(1, 3), 16);
  const g2 = parseInt(c2.slice(3, 5), 16);
  const b2 = parseInt(c2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
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

  if (areArraysEqual(rangeLower, VEGA_CATEGORY10)) {
    return 'category10';
  }
  if (areArraysEqual(rangeLower, VEGA_CATEGORY20)) {
    return 'category20';
  }
  if (areArraysEqual(rangeLower, VEGA_TABLEAU10)) {
    return 'tableau10';
  }
  if (areArraysEqual(rangeLower, VEGA_TABLEAU20)) {
    return 'tableau20';
  }

  return undefined;
}
