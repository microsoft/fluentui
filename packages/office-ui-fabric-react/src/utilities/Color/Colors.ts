import {
  IColor,
  MAX_COLOR_SATURATION,
  MAX_COLOR_VALUE
} from './IColor';
import { assign } from '../object';

let cssColor = require('color-functions/lib/css-color');
let rgb2hex = require('color-functions/lib/rgb2hex');
let hsv2hex = require('color-functions/lib/hsv2hex');
let rgb2hsv = require('color-functions/lib/rgb2hsv');
let hsv2rgb = require('color-functions/lib/hsv2rgb');

export function getStrFromRGBA(rgba: {a: number, b: number, g: number, r: number}) {
  let { a, b, g, r } = rgba;
  return (a === 100) ? `#${ rgb2hex(r, g, b) }` : `rgba(${r}, ${g}, ${b}, ${a / 100})`;
}

export function getColorFromRGBA(rgba: {a: number, b: number, g: number, r: number}): IColor {
  let { a, b, g, r } = rgba;
  let { h, s, v } = rgb2hsv(r, g, b);

  return {
    a: a,
    b: b,
    g: g,
    h: h,
    hex: rgb2hex(r, g, b),
    r: r,
    s: s,
    str: getStrFromRGBA(rgba),
    v: v
  };
}

export function getColorFromString(color: string): IColor {
  let { a, b, g, r } = cssColor(color);
  return getColorFromRGBA({a: a, b: b, g: g, r: r});
}

export function getFullColorString(color: IColor): string {
  return `#${ hsv2hex(color.h, MAX_COLOR_SATURATION, MAX_COLOR_VALUE) }`;
}

export function updateSV(color: IColor, s: number, v: number): IColor {
  let { r, g, b } = hsv2rgb(color.h, s, v);
  return getColorFromRGBA({a: color.a, b: b, g: g, r: r});
}

export function updateH(color: IColor, h: number): IColor {
  let { r, g, b } = hsv2rgb(h, color.s, color.v);
  return getColorFromRGBA({a: color.a, b: b, g: g, r: r});
}

export function updateA(color: IColor, a: number): IColor {
  return assign({}, color, {
    a: a,
    str: (a === 100) ? `#${ color.hex }` : `rgba(${color.r}, ${color.g}, ${color.b}, ${a / 100})`
   });
}