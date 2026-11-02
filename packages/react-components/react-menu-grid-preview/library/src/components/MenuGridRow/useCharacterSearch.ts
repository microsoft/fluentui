'use client';

import * as React from 'react';
import { useMenuGridContext_unstable } from '../../contexts/menuGridContext';

/**
 * Returns the MenuGridRow's `onKeyDown` handler to support first-letter navigation.
 * When a single character key is pressed, it delegates to the grid-level `setFocusByFirstCharacter`
 * callback which finds and focuses the next row starting with that character.
 */
export const useCharacterSearch = (): {
  characterSearchOnKeyDown: React.KeyboardEventHandler<HTMLElement>;
  characterSearchRef: React.RefObject<HTMLElement | null>;
} => {
  'use no memo'; // justified: compiler would optimize useCharacterSearch — manual opt-out to preserve runtime behavior

  const characterSearchRef = React.useRef<HTMLDivElement>(null);

  const { setFocusByFirstCharacter } = useMenuGridContext_unstable();

  const characterSearchOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key?.length > 1) {
      return;
    }

    if (characterSearchRef.current) {
      setFocusByFirstCharacter?.(e, characterSearchRef.current);
    }
  };

  return { characterSearchOnKeyDown, characterSearchRef };
};
