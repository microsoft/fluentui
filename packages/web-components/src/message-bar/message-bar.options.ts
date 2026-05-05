import type { ValuesOf } from '../utils/typings.js';

/**
 * The `layout` variations for the MessageBar component.
 *
 * @public
 */
export const MessageBarLayout = {
  multiline: 'multiline',
  singleline: 'singleline',
} as const;

export type MessageBarLayout = ValuesOf<typeof MessageBarLayout>;

/**
 * The `shape` variations for the MessageBar component.
 *
 * @public
 */
export const MessageBarShape = {
  rounded: 'rounded',
  square: 'square',
} as const;

export type MessageBarShape = ValuesOf<typeof MessageBarShape>;

/**
 * The `intent` variations for the MessageBar component.
 *
 * @public
 */
export const MessageBarIntent = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
} as const;

export type MessageBarIntent = ValuesOf<typeof MessageBarIntent>;
