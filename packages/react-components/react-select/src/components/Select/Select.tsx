import * as React from 'react';
import { useSelect_unstable } from './useSelect';
import { renderSelect_unstable } from './renderSelect';
import { useSelectStyles_unstable } from './useSelectStyles.styles';
import type { SelectProps } from './Select.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Select component
 */
export const Select: ForwardRefComponent<SelectProps> = React.forwardRef((props, ref) => {
  const state = useSelect_unstable(props, ref);

  useSelectStyles_unstable(state);

  useCustomStyleHook_unstable('useSelectStyles_unstable')(state);

  return renderSelect_unstable(state);
});

Select.displayName = 'Select';
