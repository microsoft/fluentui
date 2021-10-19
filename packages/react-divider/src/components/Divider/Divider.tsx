import * as React from 'react';
import { renderDivider } from './renderDivider';
import { useDivider } from './useDivider';
import { useDividerStyles } from './useDividerStyles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DividerProps } from './Divider.types';

/**
 * Dividers are used to visually separate content.
 */
export const Divider: ForwardRefComponent<DividerProps> = React.forwardRef((props, ref) => {
  const state = useDivider(props, ref);

  useDividerStyles(state);

  return renderDivider(state);
});

Divider.displayName = 'Divider';
