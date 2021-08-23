import { compileCSSRules } from './compileCSS';
import { cssifyObject } from './utils/cssifyObject';
import type { MakeStyles } from '../types';

export function compileStaticCSS(property: string, value: MakeStyles): string {
  const cssRule = `${property} {${cssifyObject(value)}}`;
  return compileCSSRules(cssRule)[0];
}
