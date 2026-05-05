/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { MenuListProvider } from '@fluentui/react-menu';
import type { MenuGridContextValues, MenuGridSlots, MenuGridState } from './MenuGrid.types';
import { MenuGridContextProvider } from '../../contexts/menuGridContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuGrid_unstable = (state: MenuGridState, contextValues: MenuGridContextValues): JSXElement => {
  assertSlots<MenuGridSlots>(state);

  return (
    <MenuListProvider value={contextValues.menuList}>
      <MenuGridContextProvider value={contextValues.menuGrid}>
        <state.root />
      </MenuGridContextProvider>
    </MenuListProvider>
  );
};
