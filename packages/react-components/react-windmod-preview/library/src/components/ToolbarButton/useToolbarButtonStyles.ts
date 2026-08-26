'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { ToolbarButtonState } from './ToolbarButton.types';

import styles from './ToolbarButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toolbarButtonClassNames: { root: string } = {
  root: componentMarkers('toolbar-button'),
};

type ToolbarButtonRootDataAttributes = {
  'data-icon-position'?: ToolbarButtonState['iconPosition'];
};

/**
 * Applies the visual contract on top of Button's, returning new state. The headless toolbar
 * hook stamps data-vertical/-disabled/-disabled-focusable/-icon-only but not data-icon-position,
 * which Button's icon spacing rules select on.
 *
 * The root keeps Button's marker pair alongside its own — see `useButtonStyles`.
 */
export const useToolbarButtonStyles = (state: ToolbarButtonState): ToolbarButtonState => {
  const { root: buttonRoot, icon: buttonIcon } = useButtonStyles(state);

  const root: ToolbarButtonState['root'] & ToolbarButtonRootDataAttributes = {
    ...buttonRoot,
    'data-icon-position': state.icon ? state.iconPosition : undefined,
    className: clsx(toolbarButtonClassNames.root, styles.root, buttonRoot.className),
  };

  return {
    ...state,
    root,
    icon: buttonIcon && { ...buttonIcon, className: clsx(styles.icon, buttonIcon.className) },
  };
};
