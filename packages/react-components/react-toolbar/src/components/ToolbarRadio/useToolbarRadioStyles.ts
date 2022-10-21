import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import { ToolbarRadioState } from './ToolbarRadio.types';

const useBaseStyles = makeStyles({
  selected: {
    color: tokens.colorBrandForeground1,
  },
});

/**
 * Apply styling to the ToolbarToggleButton slots based on the state
 */
export const useToolbarRadioStyles_unstable = (state: ToolbarRadioState) => {
  useToggleButtonStyles_unstable(state);
  const toggleButtonStyles = useBaseStyles();

  state.root.className = mergeClasses(state.root.className, state.checked && toggleButtonStyles.selected);
};
