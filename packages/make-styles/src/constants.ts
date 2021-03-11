import { MakeStylesMatchedDefinitions } from './types';

/**
 * NOTE:
 * This is gonna be always `false` in testing environment(jest/jsdom) because jsdom is missing `supports` implementation
 * @see https://github.com/jsdom/jsdom/issues/2026
 */
export const CAN_USE_CSS_VARIABLES =
  window.CSS && typeof CSS.supports === 'function' && CSS.supports('color', 'var(--c)');

export const SEQUENCE_PREFIX = '__';

export const HASH_PREFIX = 'f';
export const RTL_PREFIX = 'r';

export const DEFINITION_LOOKUP_TABLE: Record<string, MakeStylesMatchedDefinitions> = {};
