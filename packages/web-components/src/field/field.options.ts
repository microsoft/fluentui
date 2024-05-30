import { ValuesOf } from '../utils/typings.js';

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
export type SlottableInput = HTMLElement & {
  elementInternals?: ElementInternals;
  required: boolean;
  disabled: boolean;
  validity: ValidityState;
  checkValidity(): boolean;
  reportValidity(): boolean;
};

/**
 * Synthetic type for slotted message elements
 * @public
 */
export const ValidationFlags = {
  valueMissing: 'valueMissing',
  typeMismatch: 'typeMismatch',
  patternMismatch: 'patternMismatch',
  tooLong: 'tooLong',
  tooShort: 'tooShort',
  rangeUnderflow: 'rangeUnderflow',
  rangeOverflow: 'rangeOverflow',
  stepMismatch: 'stepMismatch',
  customError: 'customError',
} as const;

/** @public */
export type ValidationFlags = ValuesOf<typeof ValidationFlags>;
