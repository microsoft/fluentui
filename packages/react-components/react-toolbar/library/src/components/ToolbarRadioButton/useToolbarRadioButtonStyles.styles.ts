import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import { ToolbarRadioButtonState } from './ToolbarRadioButton.types';

const useBaseStyles = makeStyles({
  selected: {
    color: tokens.colorBrandForeground1,
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

  return state;
};
