'use client';

/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind):
 * THIS FILE DELIBERATELY STAYS ON GRIFFEL — mixed-mode seam, whitelisted in the ledger.
 * It is converted when @fluentui/react-button's ToggleButton converts, and not before.
 *
 * Identical situation and identical slices to
 * ToolbarToggleButton/useToolbarToggleButtonStyles.styles.ts — see that file's header for
 * the full analysis: both slices restyle react-button's still-Griffel <ToggleButton>, and
 * neither a layered nor an unlayered CSS-module rule reproduces the mergeClasses winner
 * deterministically (unlayered at 0-1-0 ties with `useRootCheckedStyles.base`; at 0-2-0 it
 * ties with that slice's `:hover` half, which must keep winning).
 */

import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarRadioButtonState } from './ToolbarRadioButton.types';

const useBaseStyles = makeStyles({
  /* use subtle ToggleButton selected styles for Toolbar Radio selected state */
  selected: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    color: tokens.colorNeutralForeground2Selected,
  },

  iconSelected: {
    color: tokens.colorNeutralForeground2BrandSelected,
  },
});

/**
 * Apply styling to the ToolbarRadioButton slots based on the state
 */
export const useToolbarRadioButtonStyles_unstable = (state: ToolbarRadioButtonState): ToolbarRadioButtonState => {
  const toggleButtonStyles = useBaseStyles();

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(state.checked && toggleButtonStyles.selected, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = mergeClasses(state.checked && toggleButtonStyles.iconSelected, state.icon.className);
  }

  useToggleButtonStyles_unstable(state);

  return state;
};
