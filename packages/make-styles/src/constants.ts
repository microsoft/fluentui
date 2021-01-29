import { MakeStylesMatchedDefinitions } from './types';

export const CAN_USE_CSS_VARIABLES = window.CSS && CSS.supports('color', 'var(--c)');

export const SEQUENCE_PREFIX = '__';

export const HASH_PREFIX = 'f';
export const RTL_PREFIX = 'r';

export const DEFINITION_LOOKUP_TABLE: Record<string, MakeStylesMatchedDefinitions> = {};
