import { MakeStylesReducedDefinitions } from './types';

export const HASH_PREFIX = 'f';
export const HASH_LENGTH = 7;

/** A prefix that identifies that classname string is defined for RTL. */
export const RTL_PREFIX = 'r';

export const SEQUENCE_PREFIX = '__';

export type LookupItem = [/* definitions: */ MakeStylesReducedDefinitions, /* dir:  */ 'rtl' | 'ltr'];

export const DEFINITION_LOOKUP_TABLE: Record<string, LookupItem> = {};

// indexes for values in LookupItem tuple
export const LOOKUP_DEFINITIONS_INDEX = 0;
export const LOOKUP_DIR_INDEX = 1;

/* indexes for values in MakeStylesResolvedRule tuple */
export const RULE_STYLE_BUCKET_INDEX = 0;
export const RULE_CLASSNAME_INDEX = 1;
export const RULE_CSS_INDEX = 2;
export const RULE_RTL_CSS_INDEX = 3;
