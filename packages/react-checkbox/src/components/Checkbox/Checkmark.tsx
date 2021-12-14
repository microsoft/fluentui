import * as React from 'react';

export type CheckmarkProps = {
  /**
   * The width and height of the checkmark.
   *
   * @defaultvalue 8
   */
  size?: number;

  /**
   * Whether the checkmark is in a mixed/indeterminate state.
   *
   * @defaultvalue false
   */
  mixed?: boolean;

  /**
   * Whether the checkmark is in a circular checkbox. Only affects the mixed state.
   *
   * @defaultvalue false
   */
  circular?: boolean;
};

/**
 * The default checkmark icon for Checkbox
 */
export const Checkmark = ({ size = 8, mixed, circular }: CheckmarkProps) => (
  <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    {mixed ? (
      <rect width="100%" height="100%" rx={circular ? '50%' : 0} />
    ) : (
      <path d="M471 137 187 421C170 438 143 438 127 421L13 307C-4 291-4 264 13 247 29 230 56 230 73 247L157 331 411 77C428 60 454 60 471 77 488 93 488 120 471 137Z" />
    )}
  </svg>
);
