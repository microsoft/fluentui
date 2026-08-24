'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import { useToggleButtonStyles } from '../../ToggleButton/useToggleButtonStyles';
import type { ToolbarRadioButtonState } from './ToolbarRadioButton.types';

import styles from './ToolbarRadioButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toolbarRadioButtonClassNames: { root: string } = {
  root: componentMarkers('toolbar-radio-button'),
};

type ToolbarRadioButtonRootDataAttributes = {
  'data-icon-position'?: ToolbarRadioButtonState['iconPosition'];
};

/**
 * Applies the visual contract on top of ToggleButton's, returning new state. A radio button
 * differs from a toggle button only in its ARIA role, so both compose the same styles hook and
 * their stylesheets are identical but for the marker name. See useToolbarToggleButtonStyles.
 */
export const useToolbarRadioButtonStyles = (state: ToolbarRadioButtonState): ToolbarRadioButtonState => {
  const { root: toggleRoot, icon: toggleIcon } = useToggleButtonStyles(state);

  const root: ToolbarRadioButtonState['root'] & ToolbarRadioButtonRootDataAttributes = {
    ...toggleRoot,
    'data-icon-position': state.icon ? state.iconPosition : undefined,
    className: clsx(toolbarRadioButtonClassNames.root, styles.root, toggleRoot.className),
  };

  return {
    ...state,
    root,
    icon: toggleIcon && { ...toggleIcon, className: clsx(styles.icon, toggleIcon.className) },
  };
};
