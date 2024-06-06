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
export const ValidationFlags: { [key in keyof ValidityState]: key } = {
  badInput: 'badInput',
  customError: 'customError',
  patternMismatch: 'patternMismatch',
  rangeOverflow: 'rangeOverflow',
  rangeUnderflow: 'rangeUnderflow',
  stepMismatch: 'stepMismatch',
  tooLong: 'tooLong',
  tooShort: 'tooShort',
  typeMismatch: 'typeMismatch',
  valueMissing: 'valueMissing',
  valid: 'valid',
};

/** @public */
export type ValidationFlags = ValuesOf<typeof ValidationFlags>;
