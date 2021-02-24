import * as React from 'react';
import { MenuItemState } from '../components/index';
import { useMenuListContext } from '../menuListContext';

export const useCharacterSearch = (state: MenuItemState) => {
  const { setFocusByFirstCharacter } = useMenuListContext();

  const { onKeyDown: onKeyDownBase } = state;
  state.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (onKeyDownBase) {
      onKeyDownBase(e);
    }

    if (e.key?.length > 1) {
      return;
    }

    setFocusByFirstCharacter?.(e, state.ref.current);
  };

  return state;
};
