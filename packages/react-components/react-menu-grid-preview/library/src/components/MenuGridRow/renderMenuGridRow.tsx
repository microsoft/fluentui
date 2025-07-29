/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGridRowContextValues, MenuGridRowSlots, MenuGridRowState } from './MenuGridRow.types';
import { MenuGridRowContextProvider } from '../../contexts/menuGridRowContext';

/**
 * Redefine the render function to add slots. Reuse the menugroup structure but add
 * slots to children.
 */
export const renderMenuGridRow_unstable = (state: MenuGridRowState, contextValues: MenuGridRowContextValues) => {
  assertSlots<MenuGridRowSlots>(state);

  return (
    <MenuGridRowContextProvider value={contextValues.menuGridRow}>
      <state.root />
    </MenuGridRowContextProvider>
  );
};
