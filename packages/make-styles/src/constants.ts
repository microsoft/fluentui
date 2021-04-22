import { MakeStylesReducedDefinitions } from './types';

/** @internal */
export const HASH_PREFIX = 'f';

/** @internal */
export const HASH_LENGTH = 7;

/**
 * A prefix that identifies that classname string is defined for RTL.
 * @internal
 */
export const RTL_PREFIX = 'r';

/** @internal */
export const SEQUENCE_PREFIX = '__';

/** @internal */
export type LookupItem = [/* definitions: */ MakeStylesReducedDefinitions, /* dir:  */ 'rtl' | 'ltr'];

/** @internal */
export const DEFINITION_LOOKUP_TABLE: Record<string, LookupItem> = {};

// indexes for values in LookupItem tuple

/** @internal */
export const LOOKUP_DEFINITIONS_INDEX = 0;

/** @internal */
export const LOOKUP_DIR_INDEX = 1;

/* indexes for values in MakeStylesResolvedRule tuple */

/** @internal */
export const RULE_STYLE_BUCKET_INDEX = 0;

/** @internal */
export const RULE_CLASSNAME_INDEX = 1;

/** @internal */
export const RULE_CSS_INDEX = 2;

/** @internal */
export const RULE_RTL_CSS_INDEX = 3;
