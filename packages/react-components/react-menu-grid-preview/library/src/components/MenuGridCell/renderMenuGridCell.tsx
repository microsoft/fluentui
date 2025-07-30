/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGridCellSlots, MenuGridCellState } from './MenuGridCell.types';

/**
 * Redefine the render function to add slots. Reuse the menugroup structure but add
 * slots to children.
 */
export const renderMenuGridCell_unstable = (state: MenuGridCellState) => {
  assertSlots<MenuGridCellSlots>(state);

  return <state.root />;
};
