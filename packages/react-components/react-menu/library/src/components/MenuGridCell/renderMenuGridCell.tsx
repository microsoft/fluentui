/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGridCellContextValues, MenuGridCellSlots, MenuGridCellState } from './MenuGridCell.types';
import { MenuGridCellContextProvider } from '../../contexts/menuGridCellContext';

/**
 * Redefine the render function to add slots. Reuse the menugroup structure but add
 * slots to children.
 */
export const renderMenuGridCell_unstable = (state: MenuGridCellState, contextValues: MenuGridCellContextValues) => {
  assertSlots<MenuGridCellSlots>(state);

  return (
    <MenuGridCellContextProvider value={contextValues.menuGridCell}>
      <state.root />
    </MenuGridCellContextProvider>
  );
};
