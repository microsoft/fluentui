'use client';

import { componentMarkers } from '../../utils/groupMarker';
import { restackOver } from '../../utils/restackOver';
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
 * The root keeps Button's marker pair alongside its own — see `restackOver`.
 */
export const useToggleButtonStyles = (state: ToggleButtonState): ToggleButtonState =>
  restackOver(state, useButtonStyles(state), {
    marker: toggleButtonClassNames.root,
    root: styles.root,
    icon: styles.icon,
    rootAttributes: { 'data-accessible': state.isAccessible || undefined } satisfies ToggleButtonRootDataAttributes,
  });
