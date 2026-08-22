'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { ToggleButtonState } from './ToggleButton.types';

import styles from './ToggleButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toggleButtonClassNames: { root: string } = {
  root: componentMarkers('toggle-button'),
};

type ToggleButtonRootDataAttributes = {
  'data-accessible'?: true;
};

/**
 * Applies the visual contract on top of Button's, returning new state. The headless hook
 * already stamps data-checked/-disabled/-disabled-focusable/-icon-only/-icon-position and
 * useButtonStyles stamps data-appearance/-size/-empty; data-accessible is style-only.
 *
 * Button's icon rules select through `group/fui-button`, so the root must keep Button's
 * marker pair alongside its own.
 */
export const useToggleButtonStyles = (state: ToggleButtonState): ToggleButtonState => {
  const { root: buttonRoot, icon: buttonIcon } = useButtonStyles(state);

  const root: ToggleButtonState['root'] & ToggleButtonRootDataAttributes = {
    ...buttonRoot,
    'data-accessible': state.isAccessible || undefined,
    className: clsx(toggleButtonClassNames.root, styles.root, buttonRoot.className),
  };

  return {
    ...state,
    root,
    icon: buttonIcon && { ...buttonIcon, className: clsx(styles.icon, buttonIcon.className) },
  };
};
