import * as React from 'react';
import { renderDivider } from './renderDivider';
import { useDivider } from './useDivider';
import { useDividerStyles } from './useDividerStyles';
import type { DividerProps } from './Divider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A divider visually segments content into groups.
 */
export const Divider: ForwardRefComponent<DividerProps> = React.forwardRef((props, ref) => {
  const state = useDivider(props, ref);

  useDividerStyles(state);
  return renderDivider(state);
});

Divider.displayName = 'Divider';
