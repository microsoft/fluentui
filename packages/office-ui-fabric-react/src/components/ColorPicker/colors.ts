import { IColor } from './IColor';
import { assign } from '../../utilities/object';

let cssColor = require('color-functions/lib/css-color');
let rgb2hex = require('color-functions/lib/rgb2hex');
let hsv2hex = require('color-functions/lib/hsv2hex');
let rgb2hsv = require('color-functions/lib/rgb2hsv');
let hsv2rgb = require('color-functions/lib/hsv2rgb');

export const MAX_COLOR_SATURATION = 100;
export const MAX_COLOR_HUE = 359;
export const MAX_COLOR_VALUE = 100;

export interface IColor {
  a: number;
  b: number;
  g: number;
  h: number;
  hex: string;
  r: number;
  s: number;
  str: string;
  v: number;
}

export function getColorFromString(color: string): IColor {
  let { a, b, g, r } = cssColor(color);
  let { h, s, v } = rgb2hsv(r, g, b);

  return {
    a: a,
    b: b,
    g: g,
    h: h,
    hex: rgb2hex(r, g, b),
    r: r,
    s: s,
    str: color,
    v: v
  };

}

export function getFullColorString(color: IColor): string {
  return `#${ hsv2hex(color.h, MAX_COLOR_SATURATION, MAX_COLOR_VALUE) }`;
}

export function updateSV(color: IColor, s: number, v: number): IColor {
  let { r, g, b } = hsv2rgb(color.h, s, v);
  let hex = rgb2hex(r, g, b);

  return {
    a: color.a,
    b: b,
    g: g,
    h: color.h,
    hex: hex,
    r: r,
    s: s,
    str: (color.a === 100) ? `#${ hex }` : `rgba(${r}, ${g}, ${b}, ${color.a / 100})`,
    v: v
   };
}

export function updateH(color: IColor, h: number): IColor {
  let { r, g, b } = hsv2rgb(h, color.s, color.v);
  let hex = rgb2hex(r, g, b);

  return {
    a: color.a,
    b: b,
    g: g,
    h: h,
    hex: hex,
    r: r,
    s: color.s,
    str: (color.a === 100) ? `#${ hex }` : `rgba(${r}, ${g}, ${b}, ${color.a / 100})`,
    v: color.v
   };
}

export function updateA(color: IColor, a: number): IColor {
  return assign({}, color, {
    a: a,
    str: (a === 100) ? `#${ color.hex }` : `rgba(${color.r}, ${color.g}, ${color.b}, ${a / 100})`
   });
}
