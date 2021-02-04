import { MakeStyles } from '../types';
import { cssifyObject } from './utils/cssifyObject';

export function compileStaticCSS(property: string, value: MakeStyles): string {
  return `${property} {${cssifyObject(value)}}`;
}
