import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import { ToolbarToggleButtonState } from './ToolbarToggleButton.types';

const useBaseStyles = makeStyles({
  selected: {
    color: `var(--ctrl-token-ToolbarToggleButton-2833, var(--semantic-token-ToolbarToggleButton-2834, ${tokens.colorBrandForeground1}))`,
  },
});

/**
 * Apply styling to the ToolbarToggleButton slots based on the state
 */
export const useToolbarToggleButtonStyles_unstable = (state: ToolbarToggleButtonState): ToolbarToggleButtonState => {
  useToggleButtonStyles_unstable(state);
  const toggleButtonStyles = useBaseStyles();

  state.root.className = mergeClasses(state.root.className, state.checked && toggleButtonStyles.selected);

  return state;
};
