import { LookupItem, SequenceHash } from './types';

/** @internal */
export const HASH_PREFIX = 'f';

/** @internal */
export const SEQUENCE_HASH_LENGTH = 7;

/** @internal */
export const SEQUENCE_PREFIX = '__';

/** @internal */
export const DEFINITION_LOOKUP_TABLE: Record<SequenceHash, LookupItem> = {};

// indexes for values in LookupItem tuple

/** @internal */
export const LOOKUP_DEFINITIONS_INDEX = 0;

/** @internal */
export const LOOKUP_DIR_INDEX = 1;
