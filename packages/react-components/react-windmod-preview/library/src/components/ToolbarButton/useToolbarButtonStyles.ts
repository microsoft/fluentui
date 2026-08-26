'use client';

import { componentMarkers } from '../../utils/groupMarker';
import { restackOver } from '../../utils/restackOver';
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
 * The root keeps Button's marker pair alongside its own — see `restackOver`.
 */
export const useToolbarButtonStyles = (state: ToolbarButtonState): ToolbarButtonState =>
  restackOver(state, useButtonStyles(state), {
    marker: toolbarButtonClassNames.root,
    root: styles.root,
    icon: styles.icon,
    rootAttributes: {
      'data-icon-position': state.icon ? state.iconPosition : undefined,
    } satisfies ToolbarButtonRootDataAttributes,
  });
