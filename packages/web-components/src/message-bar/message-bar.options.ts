import type { ValuesOf } from '../utils/typings.js';

/**
 * @public
 * The `layout` variations for the MessageBar component.
 */
export const MessageBarLayout = {
  multiline: 'multiline',
  singleline: 'singleline',
} as const;

export type MessageBarLayout = ValuesOf<typeof MessageBarLayout>;

/**
 * @public
 * The `shape` variations for the MessageBar component.
 */
export const MessageBarShape = {
  rounded: 'rounded',
  square: 'square',
} as const;

export type MessageBarShape = ValuesOf<typeof MessageBarShape>;

/**
 * @public
 * The `intent` variations for the MessageBar component.
 */
export const MessageBarIntent = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
} as const;

export type MessageBarIntent = ValuesOf<typeof MessageBarIntent>;
