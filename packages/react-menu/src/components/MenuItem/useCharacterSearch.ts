import * as React from 'react';
import { MenuItemState } from '../../components/index';
import { useMenuListContext } from '../../contexts/menuListContext';

export const useCharacterSearch = (state: MenuItemState, ref: React.RefObject<HTMLElement>) => {
  const setFocusByFirstCharacter = useMenuListContext(context => context.setFocusByFirstCharacter);

  const { onKeyDown: onKeyDownBase } = state;
  state.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (onKeyDownBase) {
      onKeyDownBase(e);
    }

    if (e.key?.length > 1) {
      return;
    }

    if (ref.current) {
      setFocusByFirstCharacter?.(e, ref.current);
    }
  };

  return state;
};
