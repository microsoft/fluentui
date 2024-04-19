/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuListContextValues, MenuListSlots, MenuListState } from './MenuList.types';
import { MenuListProvider } from '../../contexts/menuListContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuList_unstable = (state: MenuListState, contextValues: MenuListContextValues) => {
  assertSlots<MenuListSlots>(state);

  return (
    <MenuListProvider value={contextValues.menuList}>
      <state.root />
    </MenuListProvider>
  );
};
