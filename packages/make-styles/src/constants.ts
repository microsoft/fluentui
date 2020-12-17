import { MakeStylesLookupEntry } from './types';

export const CAN_USE_CSS_VARIABLES = typeof window !== 'undefined' && window.CSS && CSS.supports('color', 'var(--c)');

export const HASH_PREFIX = 'f';
export const RTL_PREFIX = 'r';

export const DEFINITION_LOOKUP_TABLE: Record<string, MakeStylesLookupEntry> = {};
