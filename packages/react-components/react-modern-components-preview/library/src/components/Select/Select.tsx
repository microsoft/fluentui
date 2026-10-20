'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSelect } from './renderSelect';
import type { SelectProps } from './Select.types';
import { useSelect } from './useSelect';
import { useSelectStyles } from './useSelectStyles.styles';

/**
 * Select allows users to choose one option from a native dropdown.
 */
export const Select: ForwardRefComponent<SelectProps> = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const state = useSelect(props, ref);
    useSelectStyles(state);
    return renderSelect(state);
  },
);

Select.displayName = 'Select';
