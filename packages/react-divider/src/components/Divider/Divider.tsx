import * as React from 'react';
import { useDivider } from './useDivider';
import { DividerProps } from './Divider.types';
import { renderDivider } from './renderDivider';
import { useDividerStyles } from './useDividerStyles';

/**
 * Define a styled Divider, using the `useDivider` and `useDividerStyles` hooks.
 * {@docCategory Divider\}
 */
export const Divider = React.forwardRef<HTMLElement, DividerProps>((props, ref) => {
  const state = useDivider(props, ref);

  useDividerStyles(state);
  return renderDivider(state);
});

Divider.displayName = 'Divider';
