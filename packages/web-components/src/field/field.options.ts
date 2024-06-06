import type { ValuesOf } from '../utils/typings.js';

/**
 * Label position values
 * @public
 */
export const LabelPosition = {
  above: 'above',
  after: 'after',
  before: 'before',
} as const;

/** @public */
export type LabelPosition = ValuesOf<typeof LabelPosition>;

/**
 * Synthetic type for slotted input elements
 * @public
 */
export type SlottableInput = HTMLElement &
  ElementInternals & {
    elementInternals?: ElementInternals;
    required: boolean;
    disabled: boolean;
    readOnly: boolean;
  };

/**
 * Synthetic type for slotted message elements
 * @public
 */
export const ValidationFlags = {
  badInput: 'bad-input',
  customError: 'custom-error',
  patternMismatch: 'pattern-mismatch',
  rangeOverflow: 'range-overflow',
  rangeUnderflow: 'range-underflow',
  stepMismatch: 'step-mismatch',
  tooLong: 'too-long',
  tooShort: 'too-short',
  typeMismatch: 'type-mismatch',
  valueMissing: 'value-missing',
  valid: 'valid',
} as const;

/** @public */
export type ValidationFlags = ValuesOf<typeof ValidationFlags>;
