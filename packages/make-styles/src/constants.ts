import { getWindow } from '@fluentui/utilities';
import { MakeStylesLookupEntry } from './types';

let window;
if (window === undefined) {
  window = getWindow() as Window & typeof globalThis;
}

export const CAN_USE_CSS_VARIABLES = window ? window.CSS && CSS.supports('color', 'var(--c)') : undefined;

export const HASH_PREFIX = 'f';
export const RTL_PREFIX = 'r';

export const DEFINITION_LOOKUP_TABLE: Record<string, MakeStylesLookupEntry> = {};
