import * as React from 'react';
import { DropdownOptionState } from '../../components/index';
import { useDropdownListContext } from '../../contexts/dropdownListContext';

export const useCharacterSearch = (state: DropdownOptionState) => {
  const setFocusByFirstCharacter = useDropdownListContext(context => context.setFocusByFirstCharacter);

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
