import { FlipperDirection, ValuesOf } from '@microsoft/fast-foundation';

/**
 * The size of the flipper.
 * @public
 */
export const FlipperSize = {
  medium: 'medium',
  large: 'large',
} as const;

/**
 * @public
 */
export type FlipperSize = ValuesOf<typeof FlipperSize>;

export { FlipperDirection };
