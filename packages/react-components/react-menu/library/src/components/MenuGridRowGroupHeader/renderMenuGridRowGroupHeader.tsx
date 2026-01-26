/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import {
  MenuGridRowGroupHeaderContextValues,
  MenuGridRowGroupHeaderSlots,
  MenuGridRowGroupHeaderState,
} from './MenuGridRowGroupHeader.types';
import { MenuGridRowGroupHeaderContextProvider } from '../../contexts/menuGridRowGroupHeaderContext';

/**
 * Redefine the render function to add slots. Reuse the menugroup structure but add
 * slots to children.
 */
export const renderMenuGridRowGroupHeader_unstable = (
  state: MenuGridRowGroupHeaderState,
  contextValues: MenuGridRowGroupHeaderContextValues,
) => {
  assertSlots<MenuGridRowGroupHeaderSlots>(state);

  return (
    <MenuGridRowGroupHeaderContextProvider value={contextValues.menuGridRowGroupHeader}>
      <state.root />
    </MenuGridRowGroupHeaderContextProvider>
  );
};
