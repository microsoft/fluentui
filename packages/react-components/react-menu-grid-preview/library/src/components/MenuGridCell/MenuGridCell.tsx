import * as React from 'react';
import { useMenuGridCell_unstable } from './useMenuGridCell';
import { renderMenuGridCell_unstable } from './renderMenuGridCell';
import type { MenuGridCellProps } from './MenuGridCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGridCellStyles_unstable } from './useMenuGridCellStyles.styles';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a MenuGridCell, using the `useMenuGridCell_unstable` hook.
 */
export const MenuGridCell: ForwardRefComponent<MenuGridCellProps> = React.forwardRef((props, ref) => {
  const state = useMenuGridCell_unstable(props, ref);

  useMenuGridCellStyles_unstable(state);

  // useCustomStyleHook_unstable('useMenuGridCellStyles_unstable')(state);

  return renderMenuGridCell_unstable(state);
});

MenuGridCell.displayName = 'MenuGridCell';
