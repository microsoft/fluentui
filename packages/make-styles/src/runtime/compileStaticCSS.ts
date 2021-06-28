import { MakeStyles } from '../types';
import { cssifyObject } from './utils/cssifyObject';
import { compileCSSRules } from './compileCSSRules';

export function compileStaticCSS(property: string, value: MakeStyles): string {
  const cssRule = `${property} {${cssifyObject(value)}}`;
  return compileCSSRules(cssRule)[0];
}
