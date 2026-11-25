'use client';

import * as React from 'react';
import type { MenuListContextValues, MenuListState } from './MenuList.types';

export function useMenuListContextValues_unstable(state: MenuListState): MenuListContextValues {
  const { checkedValues, hasCheckmarks, hasIcons, selectRadio, setFocusByFirstCharacter, toggleCheckbox } = state;

  const menuList = React.useMemo(
    () => ({
      checkedValues,
      hasCheckmarks,
      hasIcons,
      selectRadio,
      setFocusByFirstCharacter,
      toggleCheckbox,
    }),
    [checkedValues, hasCheckmarks, hasIcons, selectRadio, setFocusByFirstCharacter, toggleCheckbox],
  );

  return { menuList };
}
