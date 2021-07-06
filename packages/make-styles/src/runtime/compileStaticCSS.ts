import { MakeStyles } from '../types';
import { compileCSSRules } from './compileCSS';
import { cssifyObject } from './utils/cssifyObject';

export function compileStaticCSS(property: string, value: MakeStyles): string {
  const cssRule = `${property} {${cssifyObject(value)}}`;
  return compileCSSRules(cssRule)[0];
}
