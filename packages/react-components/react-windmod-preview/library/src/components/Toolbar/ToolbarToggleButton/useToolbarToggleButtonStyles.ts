'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import { useToggleButtonStyles } from '../../ToggleButton/useToggleButtonStyles';
import type { ToolbarToggleButtonState } from './ToolbarToggleButton.types';

import styles from './ToolbarToggleButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toolbarToggleButtonClassNames: { root: string } = {
  root: componentMarkers('toolbar-toggle-button'),
};

type ToolbarToggleButtonRootDataAttributes = {
  'data-icon-position'?: ToolbarToggleButtonState['iconPosition'];
};

/**
 * Applies the visual contract on top of ToggleButton's, returning new state. The headless
 * toolbar hook omits data-icon-position — see useToolbarButtonStyles.
 *
 * ToggleButton's glyph-swap rules select through `group/fui-toggle-button` and Button's icon
 * spacing through `group/fui-button`, so the root must keep both marker pairs alongside its own.
 */
export const useToolbarToggleButtonStyles = (state: ToolbarToggleButtonState): ToolbarToggleButtonState => {
  const { root: toggleRoot, icon: toggleIcon } = useToggleButtonStyles(state);

  const root: ToolbarToggleButtonState['root'] & ToolbarToggleButtonRootDataAttributes = {
    ...toggleRoot,
    'data-icon-position': state.icon ? state.iconPosition : undefined,
    className: clsx(toolbarToggleButtonClassNames.root, styles.root, toggleRoot.className),
  };

  return {
    ...state,
    root,
    icon: toggleIcon && { ...toggleIcon, className: clsx(styles.icon, toggleIcon.className) },
  };
};
