'use client';

import * as React from 'react';
import { useMenuGridContext_unstable } from '../../contexts/menuGridContext';
import type { MenuGridRowState } from './MenuGridRow.types';

/**
 * Wraps the MenuGridRow's `onKeyDown` handler to support first-letter navigation.
 * When a single character key is pressed, it delegates to the grid-level `setFocusByFirstCharacter`
 * callback which finds and focuses the next row starting with that character.
 */
export const useCharacterSearch = (
  state: MenuGridRowState,
  ref: React.RefObject<HTMLElement | null>,
): MenuGridRowState => {
  'use no memo';

  const { setFocusByFirstCharacter } = useMenuGridContext_unstable();

  const { onKeyDown: originalOnKeyDown } = state.root;

  state.root.onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
