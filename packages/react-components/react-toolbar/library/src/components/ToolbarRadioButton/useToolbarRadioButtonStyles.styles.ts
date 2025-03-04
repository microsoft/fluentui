import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import { ToolbarRadioButtonState } from './ToolbarRadioButton.types';

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
  'use no memo';

  useToggleButtonStyles_unstable(state);
  const toggleButtonStyles = useBaseStyles();

  state.root.className = mergeClasses(state.root.className, state.checked && toggleButtonStyles.selected);

  if (state.icon) {
    state.icon.className = mergeClasses(state.icon.className, state.checked && toggleButtonStyles.iconSelected);
  }

  return state;
};
