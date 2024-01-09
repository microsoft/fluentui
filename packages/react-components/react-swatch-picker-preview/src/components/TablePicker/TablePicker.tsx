import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTablePicker_unstable } from './useTablePicker';
import { renderTablePicker_unstable } from './renderTablePicker';
import { useTablePickerStyles_unstable } from './useTablePickerStyles.styles';
import type { TablePickerProps } from './TablePicker.types';

/**
 * TablePicker component - TODO: add more docs
 */
export const TablePicker: ForwardRefComponent<TablePickerProps> = React.forwardRef((props, ref) => {
  const state = useTablePicker_unstable(props, ref);

  useTablePickerStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useTablePickerStyles_unstable')(state);
  return renderTablePicker_unstable(state);
});

TablePicker.displayName = 'TablePicker';
