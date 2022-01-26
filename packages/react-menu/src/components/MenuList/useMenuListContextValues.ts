import type { MenuListContextValues, MenuListState } from './MenuList.types';

export function useMenuListContextValues_unstable(state: MenuListState): MenuListContextValues {
  const {
    onCheckedValueChange,
    checkedValues,
    toggleCheckbox,
    selectRadio,
    setFocusByFirstCharacter,
    hasIcons,
    hasCheckmarks,
  } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const menuList = {
    onCheckedValueChange,
    checkedValues,
    toggleCheckbox,
    selectRadio,
    setFocusByFirstCharacter,
    hasIcons,
    hasCheckmarks,
  };

  return { menuList };
}
