'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
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
 * Button's icon rules select through `group/fui-button`, so the root must keep Button's marker
 * pair alongside its own.
 */
export const useMenuButtonStyles = (state: MenuButtonState): MenuButtonState => {
  const { root: buttonRoot, icon: buttonIcon } = useButtonStyles({ ...state, iconPosition: 'before' });

  const root: MenuButtonState['root'] & MenuButtonRootDataAttributes = {
    ...buttonRoot,
    'data-icon-position': state.icon ? 'before' : undefined,
    className: clsx(menuButtonClassNames.root, styles.root, buttonRoot.className),
  };

  return {
    ...state,
    root,
    icon: buttonIcon && { ...buttonIcon, className: clsx(styles.icon, buttonIcon.className) },
    menuIcon: state.menuIcon && { ...state.menuIcon, className: clsx(styles.menuIcon, state.menuIcon.className) },
  };
};
