import type { MenuListContextValues, MenuListState } from './MenuList.types';

export function useMenuListContextValues_unstable(state: MenuListState): MenuListContextValues {
  const {
    checkedValues,
    hasCheckmarks,
    hasIcons,
    selectRadio,
    setFocusByFirstCharacter,
    toggleCheckbox,
    mouseInputState,
  } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const menuList = {
    checkedValues,
    hasCheckmarks,
    hasIcons,
    selectRadio,
    setFocusByFirstCharacter,
    toggleCheckbox,
    mouseInputState,
  };

  return { menuList };
}
