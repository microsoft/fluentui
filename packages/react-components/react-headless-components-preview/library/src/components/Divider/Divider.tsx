'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DividerProps } from './Divider.types';
import { useDivider } from './useDivider';
import { renderDivider } from './renderDivider';

/**
 * Represents a divider between two elements. By default, the divider is horizontal, but it can be set to vertical by using the `vertical` prop.
 */
export const Divider: ForwardRefComponent<DividerProps> = React.forwardRef((props, ref) => {
  const state = useDivider(props, ref);

  return renderDivider(state);
});

Divider.displayName = 'Divider';
