import type { Font, Margin } from '@fluentui/chart-utilities';
import { getValidColor } from './PlotlyColorAdapter';

export const getValidStyleNumber = (value: unknown, min = 0, max = Infinity): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max ? value : undefined;

const fontIdentifier = '[-_a-zA-Z\\u0080-\\uffff][-_a-zA-Z0-9\\u0080-\\uffff]*';
const fontName =
  `(?:${fontIdentifier}(?:[ \\t]+${fontIdentifier})*|` + `"[^"\\\\\\x00-\\x1f;{}<>]+"|'[^'\\\\\\x00-\\x1f;{}<>]+')`;
const fontFamilyPattern = new RegExp(`^${fontName}(?:[ \\t]*,[ \\t]*${fontName})*$`);

export const getValidFontFamily = (value: unknown): string | undefined =>
  typeof value === 'string' && fontFamilyPattern.test(value.trim()) ? value : undefined;

export const getValidFontWeight = (value: unknown): number | 'normal' | 'bold' | 'bolder' | 'lighter' | undefined => {
  if (value === 'normal' || value === 'bold' || value === 'bolder' || value === 'lighter') {
    return value;
  }
  return getValidStyleNumber(value, 1, 1000);
};

const lengthPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:px|em|rem|ex|ch|vw|vh|vmin|vmax|cm|mm|in|pt|pc|%)?$/i;

export const getValidStyleLength = (value: unknown): string | undefined => {
  if (typeof value === 'number') {
    return getValidStyleNumber(value) !== undefined ? `${value}px` : undefined;
  }
  if (typeof value !== 'string' || !lengthPattern.test(value.trim()) || !Number.isFinite(parseFloat(value))) {
    return undefined;
  }
  if (parseFloat(value) < 0) {
    return undefined;
  }
  return /[a-z%]$/i.test(value.trim()) ? value : `${Number(value)}px`;
};

const getValidShadow = (value: unknown): string | undefined => {
  if (value === 'none') {
    return value;
  }
  if (typeof value !== 'string') {
    return undefined;
  }
  const parts = value.match(/(?:rgba?|hsla?)\([^()]*\)|\S+/gi) ?? [];
  let lengths = 0;
  let colors = 0;
  for (const part of parts) {
    if (getValidColor(part) || part.toLowerCase() === 'currentcolor') {
      colors++;
    } else if (lengthPattern.test(part) && !part.endsWith('%') && Number.isFinite(parseFloat(part))) {
      lengths++;
      if ((lengths === 3 && parseFloat(part) < 0) || (!/[a-z]$/i.test(part) && Number(part) !== 0)) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
  return (lengths === 2 || lengths === 3) && colors <= 1 ? value : undefined;
};

export const getValidFont = (font: Partial<Font> | undefined): Partial<Font> | undefined =>
  font
    ? {
        color: getValidColor(font.color),
        ...(font.family !== undefined ? { family: getValidFontFamily(font.family) } : {}),
        ...(font.size !== undefined ? { size: getValidStyleNumber(font.size, 1) } : {}),
        ...(font.weight !== undefined ? { weight: getValidStyleNumber(font.weight, 1, 1000) } : {}),
        ...(font.shadow !== undefined ? { shadow: getValidShadow(font.shadow) } : {}),
      }
    : undefined;

export const getValidPadding = (padding: Partial<Margin> | undefined): Partial<Margin> | undefined => {
  if (!padding) {
    return undefined;
  }
  const result: Partial<Margin> = {};
  (['t', 'r', 'b', 'l', 'pad'] as const).forEach(key => {
    const value = getValidStyleNumber(padding[key]);
    if (value !== undefined) {
      result[key] = value;
    }
  });
  return result;
};

export const getValidTextAlign = (value: unknown): 'left' | 'center' | 'right' | undefined =>
  value === 'left' || value === 'center' || value === 'right' ? value : undefined;
