'use client';

import { componentMarkers } from '../../utils/groupMarker';
import { restackOver } from '../../utils/restackOver';
import { useToggleButtonStyles } from '../ToggleButton/useToggleButtonStyles';
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
export const useToolbarRadioButtonStyles = (state: ToolbarRadioButtonState): ToolbarRadioButtonState =>
  restackOver(state, useToggleButtonStyles(state), {
    marker: toolbarRadioButtonClassNames.root,
    root: styles.root,
    icon: styles.icon,
    rootAttributes: {
      'data-icon-position': state.icon ? state.iconPosition : undefined,
    } satisfies ToolbarRadioButtonRootDataAttributes,
  });
