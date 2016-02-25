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
  r: number;
  g: number;
  b: number;
  a: number;
  h: number;
  s: number;
  v: number;
  hex: string;
  str: string;
}

export function getColorFromString(color: string): IColor {
  let { r, g, b, a } = cssColor(color);
  let { h, s, v } = rgb2hsv(r, g, b);

  return {
    r: r,
    g: g,
    b: b,
    a: a,
    h: h,
    s: s,
    v: v,
    hex: rgb2hex(r, g, b),
    str: color
  };

}

export function getFullColorString(color: IColor): string {
  return `#${ hsv2hex(color.h, MAX_COLOR_SATURATION, MAX_COLOR_VALUE) }`;
}


export function updateSV(color: IColor, s: number, v: number): IColor {
  let { r, g, b } = hsv2rgb(color.h, s, v);
  let hex = rgb2hex(r, g, b);

  return {
    r: r,
    g: g,
    b: b,
    a: color.a,
    h: color.h,
    s: s,
    v: v,
    hex: hex,
    str: (color.a === 100) ? `#${ hex }` : `rgba(${r}, ${g}, ${b}, ${color.a / 100})`
   };
}

export function updateH(color: IColor, h: number): IColor {
  let { r, g, b } = hsv2rgb(h, color.s, color.v);
  let hex = rgb2hex(r, g, b);

  return {
    r: r,
    g: g,
    b: b,
    a: color.a,
    h: h,
    s: color.s,
    v: color.v,
    hex: hex,
    str: (color.a === 100) ? `#${ hex }` : `rgba(${r}, ${g}, ${b}, ${color.a / 100})`
   };
}

export function updateA(color: IColor, a: number): IColor {
  return assign({}, color, {
    a: a,
    str: (a === 100) ? `#${ color.hex }` : `rgba(${color.r}, ${color.g}, ${color.b}, ${a / 100})`
   });
}
