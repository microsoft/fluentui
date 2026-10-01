'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DividerProps } from './Divider.types';
import { renderDivider } from './renderDivider';
import { useDivider } from './useDivider';
import { useDividerStyles } from './useDividerStyles.styles';

/**
 * Represents a divider between two elements.
 */
export const Divider: ForwardRefComponent<DividerProps> = React.forwardRef<HTMLDivElement, DividerProps>(
  (props, ref) => {
    const state = useDivider(props, ref);

    useDividerStyles(state);

    return renderDivider(state);
  },
);

Divider.displayName = 'Divider';
