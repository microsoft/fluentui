import { MakeStyles } from '../types';
import { compile, middleware, serialize, stringify, prefixer } from 'stylis';
import { cssifyObject } from './utils/cssifyObject';

export function compileKeyframeRule(frames: MakeStyles): string {
  let css: string = '';

  for (const percentage in frames) {
    css += `${percentage}{${cssifyObject(frames[percentage])}}`;
  }

  return css;
}

export function compileKeyframesCSS(animationName: string, framesCSS: string): string {
  const cssRule = `@keyframes ${animationName} {${framesCSS}}`;
  return serialize(compile(cssRule), middleware([prefixer, stringify]));
}
