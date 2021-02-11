import { compile, middleware, serialize, stringify, prefixer, rulesheet } from 'stylis';
import { MakeStyles } from '../types';
import { cssifyObject } from './utils/cssifyObject';

export function compileStaticCSS(property: string, value: MakeStyles): string {
  const cssRule = `${property} {${cssifyObject(value)}}`;
  return compileCSSRule(cssRule);
}

export function compileCSSRule(cssRule: string): string {
  return serialize(compile(cssRule), middleware([prefixer, stringify]));
}

export function compileCSSRules(cssRules: string): string[] {
  const rules: string[] = [];
  serialize(compile(cssRules), middleware([prefixer, stringify, rulesheet(rule => rules.push(rule))]));
  return rules;
}
