import { MakeStyles } from '../types';
import { compileCSSRule } from './compileCSS';
import { cssifyObject } from './utils/cssifyObject';

export function compileStaticCSS(property: string, value: MakeStyles): string {
  const cssRule = `${property} {${cssifyObject(value)}}`;
  return compileCSSRule(cssRule);
}
