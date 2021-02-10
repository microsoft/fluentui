import { compile, middleware, serialize, stringify, prefixer } from 'stylis';
import { MakeStyles } from '../types';
import { cssifyObject } from './utils/cssifyObject';

export function compileStaticCSS(property: string, value: MakeStyles): string {
  const cssRule = `${property} {${cssifyObject(value)}}`;
  return compileCSSRule(cssRule);
}

export function compileCSSRule(cssRule: string): string {
  return serialize(compile(cssRule), middleware([prefixer, stringify]));
}
