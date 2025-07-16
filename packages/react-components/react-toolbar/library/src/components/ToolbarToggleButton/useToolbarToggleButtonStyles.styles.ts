import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import { ToolbarToggleButtonState } from './ToolbarToggleButton.types';

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
 * Apply styling to the ToolbarToggleButton slots based on the state
 */
export const useToolbarToggleButtonStyles_unstable = (state: ToolbarToggleButtonState): ToolbarToggleButtonState => {
  'use no memo';

  const toggleButtonStyles = useBaseStyles();

  state.root.className = mergeClasses(state.checked && toggleButtonStyles.selected, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(state.checked && toggleButtonStyles.iconSelected, state.icon.className);
  }

  useToggleButtonStyles_unstable(state);

  return state;
};
