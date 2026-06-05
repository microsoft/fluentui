'use client';

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
