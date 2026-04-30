'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useSelect } from './useSelect';
import { renderSelect } from './renderSelect';
import type { SelectProps } from './Select.types';

/**
 * Select component - TODO: add more docs
 */
export const Select: ForwardRefComponent<SelectProps> = React.forwardRef((props, ref) => {
  const state = useSelect(props, ref);

  return renderSelect(state);
});

Select.displayName = 'Select';
