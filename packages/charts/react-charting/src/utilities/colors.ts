import { rgb as d3Rgb } from 'd3-color';

export const DataVizPalette = {
  color1: 'qualitative.1',
  color2: 'qualitative.2',
  color3: 'qualitative.3',
  color4: 'qualitative.4',
  color5: 'qualitative.5',
  color6: 'qualitative.6',
  color7: 'qualitative.7',
  color8: 'qualitative.8',
  color9: 'qualitative.9',
  color10: 'qualitative.10',
  color11: 'qualitative.11',
  color12: 'qualitative.12',
  color13: 'qualitative.13',
  color14: 'qualitative.14',
  color15: 'qualitative.15',
  color16: 'qualitative.16',
  color17: 'qualitative.17',
  color18: 'qualitative.18',
  color19: 'qualitative.19',
  color20: 'qualitative.20',
  color21: 'qualitative.21',
  color22: 'qualitative.22',
  color23: 'qualitative.23',
  color24: 'qualitative.24',
  color25: 'qualitative.25',
  color26: 'qualitative.26',
  color27: 'qualitative.27',
  color28: 'qualitative.28',
  color29: 'qualitative.29',
  color30: 'qualitative.30',
  color31: 'qualitative.31',
  color32: 'qualitative.32',
  color33: 'qualitative.33',
  color34: 'qualitative.34',
  color35: 'qualitative.35',
  color36: 'qualitative.36',
  color37: 'qualitative.37',
  color38: 'qualitative.38',
  color39: 'qualitative.39',
  color40: 'qualitative.40',
  info: 'semantic.info',
  disabled: 'semantic.disabled',
  highError: 'semantic.highError',
  error: 'semantic.error',
  warning: 'semantic.warning',
  success: 'semantic.success',
  highSuccess: 'semantic.highSuccess',
};

/**
 * Key: Color code.
 * Value:
 * Index 0 - Default color / Color for light theme,
 * Index 1 - Color for dark theme
 */
type Palette = { [key: string]: string[] };

const QualitativePalette: Palette = {
  '1': ['#637cef'], // [cornflower.tint10],
  '2': ['#e3008c'], // [hotPink.primary],
  '3': ['#2aa0a4'], // [teal.tint20],
  '4': ['#9373c0'], // [orchid.tint10],
  '5': ['#13a10e'], // [lightGreen.primary],
  '6': ['#3a96dd'], // [lightBlue.primary],
  '7': ['#ca5010'], // [pumpkin.primary],
  '8': ['#57811b'], // [lime.shade20],
  '9': ['#b146c2'], // [lilac.primary],
  '10': ['#ae8c00'], // [gold.shade10],
  '11': ['#3c51b4', '#93a4f4'], // [cornflower.shade20, cornflower.tint30],
  '12': ['#ad006a', '#ee5fb7'], // [hotPink.shade20, hotPink.tint30],
  '13': ['#026467', '#4cb4b7'], // [teal.shade20, teal.tint30],
  '14': ['#674c8c', '#a083c9'], // [orchid.shade20, orchid.tint20],
  '15': ['#0e7a0b', '#27ac22'], // [lightGreen.shade20, lightGreen.tint10],
  '16': ['#2c72a8', '#4fa1e1'], // [lightBlue.shade20, lightBlue.tint10],
  '17': ['#9a3d0c', '#d77440'], // [pumpkin.shade20, pumpkin.tint20],
  '18': ['#405f14', '#73aa24'], // [lime.shade30, lime.primary],
  '19': ['#863593', '#c36bd1'], // [lilac.shade20, lilac.tint20],
  '20': ['#6d5700', '#d0b232'], // [gold.shade30, gold.tint20],
  '21': ['#4f6bed'], // [cornflower.primary],
  '22': ['#ea38a6'], // [hotPink.tint20],
  '23': ['#038387'], // [teal.primary],
  '24': ['#8764b8'], // [orchid.primary],
  '25': ['#11910d'], // [lightGreen.shade10],
  '26': ['#3487c7'], // [lightBlue.shade10],
  '27': ['#d06228'], // [pumpkin.tint10],
  '28': ['#689920'], // [lime.shade10],
  '29': ['#ba58c9'], // [lilac.tint10],
  '30': ['#937700', '#c19c00'], // [gold.shade20, gold.primary],
  '31': ['#2c3c85', '#c8d1fa'], // [cornflower.shade30, cornflower.tint40],
  '32': ['#7f004e', '#f7adda'], // [hotPink.shade30, hotPink.tint40],
  '33': ['#02494c', '#9bd9db'], // [teal.shade30, teal.tint40],
  '34': ['#4c3867', '#b29ad4'], // [orchid.shade30, orchid.tint30],
  '35': ['#0b5a08', '#a7e3a5'], // [lightGreen.shade30, lightGreen.tint40],
  '36': ['#20547c', '#83bdeb'], // [lightBlue.shade30, lightBlue.tint30],
  '37': ['#712d09', '#df8e64'], // [pumpkin.shade30, pumpkin.tint30],
  '38': ['#23330b', '#a4cc6c'], // [lime.shade40, lime.tint30],
  '39': ['#63276d', '#cf87da'], // [lilac.shade30, lilac.tint30],
  '40': ['#3a2f00', '#dac157'], // [gold.shade40, gold.tint30],
};

const SemanticPalette: Palette = {
  info: ['#015cda'],
  disabled: ['#dbdbdb', '#4d4d4d'], // [grey[86], grey[30]]
  highError: ['#6e0811', '#cc2635'], // [cranberry.shade30, cranberry.tint10],
  error: ['#c50f1f', '#dc626d'], // [cranberry.primary, cranberry.tint30],
  warning: ['#f7630c', '#f87528'], // [orange.primary, orange.tint10],
  success: ['#107c10', '#54b054'], // [green.primary, green.tint30],
  highSuccess: ['#094509', '#218c21'], // [green.shade30, green.tint10],
};

const Colors: { [key: string]: Palette } = {
  qualitative: QualitativePalette,
  semantic: SemanticPalette,
};

const QUALITATIVE_COLORS = Object.values(QualitativePalette);
const TOKENS = Object.values(DataVizPalette);

const getThemeSpecificColor = (colors: string[], isDarkTheme: boolean): string => {
  if (colors.length === 0) {
    return '';
  }
  const colorIdx = Number(isDarkTheme);
  if (colorIdx < colors.length) {
    return colors[colorIdx];
  }
  return colors[0];
};

export const getNextColor = (index: number, offset: number = 0, isDarkTheme: boolean = false): string => {
  const colors = QUALITATIVE_COLORS[(index + offset) % QUALITATIVE_COLORS.length];
  return getThemeSpecificColor(colors, isDarkTheme);
};

export const getColorFromToken = (token: string, isDarkTheme: boolean = false): string => {
  if (TOKENS.indexOf(token) >= 0) {
    const [paletteName, colorCode] = token.split('.');
    const colors = Colors[paletteName][colorCode];
    return getThemeSpecificColor(colors, isDarkTheme);
  }
  return token;
};

//For reference to how these numbers are calculated, refer https://www.w3.org/TR/WCAG/#dfn-contrast-ratio
const rgbLrgb1 = (v: number): number => {
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const rgbLrgb = ({ r, g, b }: { r: number; g: number; b: number }): { r: number; g: number; b: number } => {
  return {
    r: rgbLrgb1(r / 255),
    g: rgbLrgb1(g / 255),
    b: rgbLrgb1(b / 255),
  };
};

const lrgbLuminance = ({ r, g, b }: { r: number; g: number; b: number }): number => {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const getColorContrast = (c1: string, c2: string): number => {
  const l1 = lrgbLuminance(rgbLrgb(d3Rgb(c1)));
  const l2 = lrgbLuminance(rgbLrgb(d3Rgb(c2)));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/**
 * Converts various color formats (hex, RGB, RGBA, HSL, HSV, named colors) into a standard hex color code (#RRGGBB).
 * @param color - The input color in hex, RGB, RGBA, HSL, HSV, or named string format.
 * @returns The hex color code (#RRGGBB) or undefined if the input is invalid.
 */
export function convertToHex(color: string): string | undefined {
  // Check if the color is already in hex format
  if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    return color.length === 4
      ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}` // Expand shorthand hex (#RGB to #RRGGBB)
      : color.toUpperCase();
  }

  // Check if the color is in RGB or RGBA format
  const rgbMatch = color.match(/^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*[\d.]+)?\)$/i);
  if (rgbMatch) {
    const [_, r, g, b, a] = rgbMatch.map(Number);
    if (r <= 255 && g <= 255 && b <= 255) {
      const hex = `#${[r, g, b]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()}`;

      // Handle alpha value if present
      if (a !== undefined && a >= 0 && a <= 1) {
        const alphaHex = Math.round(a * 255)
          .toString(16)
          .padStart(2, '0')
          .toUpperCase();
        return `${hex}${alphaHex}`;
      }

      return hex;
    }
    return undefined;
  }

  // Check if the color is in RGBA format

  // Check if the color is in HSL format
  const hslMatch = color.match(/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/i);
  if (hslMatch) {
    const [_, h, s, l] = hslMatch.map(Number);
    if (h <= 360 && s <= 100 && l <= 100) {
      const rgb = hslToRgb(h, s / 100, l / 100);
      return `#${rgb
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()}`;
    }
    return undefined;
  }

  // Check if the color is in HSV format
  const hsvMatch = color.match(/^hsv\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/i);
  if (hsvMatch) {
    const [_, h, s, v] = hsvMatch.map(Number);
    if (h <= 360 && s <= 100 && v <= 100) {
      const rgb = hsvToRgb(h, s / 100, v / 100);
      return `#${rgb
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()}`;
    }
    return undefined;
  }

  const excludeColorsStringsPrefix = ['rgb', 'rgba', 'hsl', 'hsv'];
  // check if color contains any of excludeColorsStringsPrefix
  // It may come here if any negative values are present in the color string with the above formats
  if (excludeColorsStringsPrefix.some(prefix => color.toLowerCase().startsWith(prefix))) {
    return undefined;
  }
  // Check if the color is a named color
  const ctx = document.createElement('canvas').getContext('2d');
  if (ctx) {
    ctx.fillStyle = color;
    const computedColor = ctx.fillStyle;
    // Check if the input color is invalid
    // computedColor result to #000000 for invalid colors strings
    if (computedColor === '#000000' && color.toLowerCase() !== 'black') {
      return undefined;
    }
    if (/^#([0-9A-F]{3}){1,2}$/i.test(computedColor)) {
      return computedColor.toUpperCase();
    }
    return undefined;
  }

  // Invalid color format
  return undefined;
}

/**
 * Converts HSL to RGB.
 * @param h - Hue (0-360)
 * @param s - Saturation (0-1)
 * @param l - Lightness (0-1)
 * @returns An array of RGB values [R, G, B].
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

/**
 * Converts HSV to RGB.
 * @param h - Hue (0-360)
 * @param s - Saturation (0-1)
 * @param v - Value (0-1)
 * @returns An array of RGB values [R, G, B].
 */
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}
