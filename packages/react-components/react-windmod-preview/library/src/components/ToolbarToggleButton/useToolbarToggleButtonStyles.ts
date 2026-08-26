'use client';

import { componentMarkers } from '../../utils/groupMarker';
import { restackOver } from '../../utils/restackOver';
import { useToggleButtonStyles } from '../ToggleButton/useToggleButtonStyles';
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
export const useToolbarToggleButtonStyles = (state: ToolbarToggleButtonState): ToolbarToggleButtonState =>
  restackOver(state, useToggleButtonStyles(state), {
    marker: toolbarToggleButtonClassNames.root,
    root: styles.root,
    icon: styles.icon,
    rootAttributes: {
      'data-icon-position': state.icon ? state.iconPosition : undefined,
    } satisfies ToolbarToggleButtonRootDataAttributes,
  });
