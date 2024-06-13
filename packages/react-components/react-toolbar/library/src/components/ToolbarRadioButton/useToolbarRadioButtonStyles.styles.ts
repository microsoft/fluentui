import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import { ToolbarRadioButtonState } from './ToolbarRadioButton.types';

const useBaseStyles = makeStyles({
  selected: {
    color: `var(--ctrl-token-ToolbarRadioButton-2831, var(--semantic-token-ToolbarRadioButton-2832, ${tokens.colorBrandForeground1}))`,
  },
});

/**
 * Apply styling to the ToolbarRadioButton slots based on the state
 */
export const useToolbarRadioButtonStyles_unstable = (state: ToolbarRadioButtonState): ToolbarRadioButtonState => {
  useToggleButtonStyles_unstable(state);
  const toggleButtonStyles = useBaseStyles();

  state.root.className = mergeClasses(state.root.className, state.checked && toggleButtonStyles.selected);

  return state;
};
