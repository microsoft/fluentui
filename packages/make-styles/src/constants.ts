import { MakeStylesMatchedDefinitions } from './types';

export const HASH_PREFIX = 'f';
export const HASH_LENGTH = 7;

/** A classname that identifies that classname string is defined for RTL. */
export const RTL_CLASSNAME = 'rtl';

export const SEQUENCE_PREFIX = '__';

export const DEFINITION_LOOKUP_TABLE: Record<string, MakeStylesMatchedDefinitions> = {};
