import * as React from 'react';
import { useSelect_unstable } from './useSelect';
import { renderSelect_unstable } from './renderSelect';
import { useSelectStyles_unstable } from './useSelectStyles';
import type { SelectProps } from './Select.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * Select component
 */
export const Select: ForwardRefComponent<SelectProps> = React.forwardRef((props, ref) => {
  const state = useSelect_unstable(props, ref);

  useSelectStyles_unstable(state);

  const { useSelectStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderSelect_unstable(state);
});

Select.displayName = 'Select';
