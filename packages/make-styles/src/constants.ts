import { MakeStylesMatchedDefinitions } from './types';

export const HASH_PREFIX = 'f';
export const HASH_LENGTH = 7;

/** A prefix that identifies that classname string is defined for RTL. */
export const RTL_PREFIX = 'r';

export const SEQUENCE_PREFIX = '__';

export const DEFINITION_LOOKUP_TABLE: Record<string, [MakeStylesMatchedDefinitions, boolean /* isRTL */]> = {};
