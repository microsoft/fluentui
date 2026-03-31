'use client';

import * as React from 'react';
import type { MenuGridContextValues, MenuGridState } from './MenuGrid.types';

const menuList = {
  checkedValues: {},
  hasIcons: false,
  hasCheckmarks: false,
  shouldOpenOnArrowRight: false,
};

export function useMenuGridContextValues_unstable(state: MenuGridState): MenuGridContextValues {
  const { tableRowTabsterAttribute, setFocusByFirstCharacter } = state;
  const menuGrid = React.useMemo(
    () => ({ tableRowTabsterAttribute, setFocusByFirstCharacter }),
    [tableRowTabsterAttribute, setFocusByFirstCharacter],
  );

  return { menuGrid, menuList };
}
