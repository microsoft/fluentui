import * as React from 'react';
import { useMenuListContext_unstable } from '../../contexts/menuListContext';
import type { MenuItemState } from '../../components/index';
import type { ARIAButtonElementIntersection } from '@fluentui/react-aria';

export const useCharacterSearch = (state: MenuItemState, ref: React.RefObject<HTMLElement>) => {
  'use no memo';

  const setFocusByFirstCharacter = useMenuListContext_unstable(context => context.setFocusByFirstCharacter);

  const { onKeyDown: originalOnKeyDown } = state.root;

  state.root.onKeyDown = (e: React.KeyboardEvent<ARIAButtonElementIntersection>) => {
    originalOnKeyDown?.(e);

    if (e.key?.length > 1) {
      return;
    }

    if (ref.current) {
      setFocusByFirstCharacter?.(e, ref.current);
    }
  };

  return state;
};
