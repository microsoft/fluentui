import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTableSwatch_unstable } from './useTableSwatch';
import { renderTableSwatch_unstable } from './renderTableSwatch';
import { useTableSwatchStyles_unstable } from './useTableSwatchStyles.styles';
import type { TableSwatchProps } from './TableSwatch.types';

/**
 * TableSwatch component - TODO: add more docs
 */
export const TableSwatch: ForwardRefComponent<TableSwatchProps> = React.forwardRef((props, ref) => {
  const state = useTableSwatch_unstable(props, ref);

  useTableSwatchStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useTableSwatchStyles_unstable')(state);
  return renderTableSwatch_unstable(state);
});

TableSwatch.displayName = 'TableSwatch';
