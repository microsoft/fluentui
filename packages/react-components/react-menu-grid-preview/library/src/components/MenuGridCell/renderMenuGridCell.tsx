/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGridCellSlots, MenuGridCellState } from './MenuGridCell.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuGridCell_unstable = (state: MenuGridCellState) => {
  assertSlots<MenuGridCellSlots>(state);

  return <state.root />;
};
