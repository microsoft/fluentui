/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGridRowGroupContextValues, MenuGridRowGroupSlots, MenuGridRowGroupState } from './MenuGridRowGroup.types';
import { MenuGridRowGroupContextProvider } from '../../contexts/menuGridRowGroupContext';

/**
 * Redefine the render function to add slots. Reuse the menugroup structure but add
 * slots to children.
 */
export const renderMenuGridRowGroup_unstable = (
  state: MenuGridRowGroupState,
  contextValues: MenuGridRowGroupContextValues,
) => {
  assertSlots<MenuGridRowGroupSlots>(state);

  return (
    <MenuGridRowGroupContextProvider value={contextValues.menuGridRowGroup}>
      <state.root />
    </MenuGridRowGroupContextProvider>
  );
};
