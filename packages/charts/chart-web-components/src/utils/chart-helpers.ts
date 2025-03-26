import type { ValueConverter } from '@microsoft/fast-element';
import { Direction } from '@microsoft/fast-web-utilities';
import { getDirection } from '@fluentui/web-components';

export const jsonConverter: ValueConverter = {
  toView(value: any): string {
    return JSON.stringify(value);
  },
  fromView(value: string): any {
    return JSON.parse(value);
  },
};

type Dict = { [key: string]: any };

export const validateChartPropsArray = (obj: any, objName: string) => {
  if (!Array.isArray(obj)) {
    throw TypeError(`Invalid ${objName}: Expected an array.`);
  }

  obj.forEach((item, idx) => {
    validateChartProps(item, `${objName}[${idx}]`);
  });
};

export const validateChartProps = (obj: any, objName: string) => {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    throw TypeError(`Invalid ${objName}: Expected an object.`);
  }

  if (!Array.isArray(obj.chartData)) {
    throw TypeError(`Invalid ${objName}.chartData: Expected an array.`);
  }

  (obj.chartData as any[]).forEach((item, idx) => {
    if (item === null || typeof item !== 'object' || Array.isArray(item)) {
      throw TypeError(`Invalid ${objName}.chartData[${idx}]: Expected an object.`);
    }

    if (typeof item.legend !== 'string') {
      throw TypeError(`Invalid ${objName}.chartData[${idx}].legend: Expected a string.`);
    }

    if (typeof item.data !== 'number') {
      throw TypeError(`Invalid ${objName}.chartData[${idx}].data: Expected a number.`);
    }
  });
};

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
  color11: 'qualitative.21',
  color12: 'qualitative.22',
  color13: 'qualitative.23',
  color14: 'qualitative.24',
  color15: 'qualitative.25',
  color16: 'qualitative.26',
  color17: 'qualitative.27',
  color18: 'qualitative.28',
  color19: 'qualitative.29',
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
  '21': ['#4f6bed'], // [cornflower.primary],
  '22': ['#ea38a6'], // [hotPink.tint20],
  '23': ['#038387'], // [teal.primary],
  '24': ['#8764b8'], // [orchid.primary],
  '25': ['#11910d'], // [lightGreen.shade10],
  '26': ['#3487c7'], // [lightBlue.shade10],
  '27': ['#d06228'], // [pumpkin.tint10],
  '28': ['#689920'], // [lime.shade10],
  '29': ['#ba58c9'], // [lilac.tint10],
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

export const getRTL = (rootNode: HTMLElement): boolean => {
  return getDirection(rootNode) === Direction.rtl;
};

export const SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';

export const wrapText = (text: SVGTextElement, width: number) => {
  if (!text.textContent) {
    return;
  }

  const words = text.textContent.split(/\s+/).reverse();
  let word: string | undefined;
  let line: string[] = [];
  let lineNumber = 0;
  const lineHeight = text.getBoundingClientRect().height;
  const y = text.getAttribute('y') || '0';

  text.textContent = null;

  let tspan = document.createElementNS(SVG_NAMESPACE_URI, 'tspan');
  text.appendChild(tspan);
  tspan.setAttribute('x', '0');
  tspan.setAttribute('y', y);
  tspan.setAttribute('dy', `${lineNumber++ * lineHeight}`);

  while ((word = words.pop())) {
    line.push(word);
    tspan.textContent = line.join(' ') + ' ';
    if (tspan.getComputedTextLength() > width && line.length > 1) {
      line.pop();
      tspan.textContent = line.join(' ') + ' ';
      line = [word];
      tspan = document.createElementNS(SVG_NAMESPACE_URI, 'tspan');
      text.appendChild(tspan);
      tspan.setAttribute('x', '0');
      tspan.setAttribute('y', y);
      tspan.setAttribute('dy', `${lineNumber++ * lineHeight}`);
      tspan.textContent = word;
    }
  }
};
