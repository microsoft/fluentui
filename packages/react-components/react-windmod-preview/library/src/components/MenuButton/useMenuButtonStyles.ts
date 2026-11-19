'use client';

import { componentMarkers } from '../../utils/groupMarker';
import { restackOver } from '../../utils/restackOver';
import { slotClasses } from '../../utils/slotClasses';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { MenuButtonState } from './MenuButton.types';

import styles from './MenuButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const menuButtonClassNames: { root: string } = {
  root: componentMarkers('menu-button'),
};

type MenuButtonRootDataAttributes = {
  'data-icon-position'?: 'before';
};

/**
 * Applies the visual contract on top of Button's, returning new state. The headless hook stamps
 * data-disabled/-disabled-focusable/-icon-only/-open and useButtonStyles stamps
 * data-appearance/-size/-empty; data-icon-position is the one attribute Button's icon spacing and
 * with-icon padding select on that the menu state does not carry at all — the menu shape renders
 * the icon before the children unconditionally, so it is fixed to `before`.
 *
 * The root keeps Button's marker pair alongside its own — see `restackOver`.
 */
export const useMenuButtonStyles = (state: MenuButtonState): MenuButtonState => {
  const styled = useButtonStyles({ ...state, iconPosition: 'before' });

  return {
    ...restackOver(state, styled, {
      marker: menuButtonClassNames.root,
      root: styles.root,
      icon: styles.icon,
      rootAttributes: {
        'data-icon-position': state.icon ? 'before' : undefined,
      } satisfies MenuButtonRootDataAttributes,
    }),
    menuIcon: slotClasses(state.menuIcon, styles.menuIcon),
  };
};
