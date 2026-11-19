'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { useToolbarToggleButtonStyles } from '../ToolbarToggleButton/useToolbarToggleButtonStyles';
import type { ToolbarRadioButtonState } from './ToolbarRadioButton.types';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toolbarRadioButtonClassNames: { root: string } = {
  root: componentMarkers('toolbar-radio-button'),
};

/**
 * Applies ToolbarToggleButton's visual contract under this component's marker pair, returning new
 * state. A radio button differs from a toggle button only in its ARIA role, so it owns no
 * stylesheet. The root keeps ToolbarToggleButton's marker pair alongside its own, and that pair is
 * load-bearing: the icon's checked, hover and disabled colours are reached through the group
 * variant on it.
 */
export const useToolbarRadioButtonStyles = (state: ToolbarRadioButtonState): ToolbarRadioButtonState => {
  const styled = useToolbarToggleButtonStyles(state);

  return {
    ...styled,
    root: { ...styled.root, className: clsx(toolbarRadioButtonClassNames.root, styled.root.className) },
  };
};
