import * as React from 'react';
import { renderDivider } from './renderDivider';
import { useDivider } from './useDivider';
import { useDividerStyles } from './useDividerStyles';
import type { DividerProps } from './Divider.types';

/**
 * Define a styled Divider, using the `useDivider` and `useDividerStyles` hooks.
 * {@docCategory Divider}
 */
export const Divider = React.forwardRef<HTMLElement, DividerProps>((props, ref) => {
  const state = useDivider(props, ref);

  useDividerStyles(state);
  return renderDivider(state);
});

Divider.displayName = 'Divider';
