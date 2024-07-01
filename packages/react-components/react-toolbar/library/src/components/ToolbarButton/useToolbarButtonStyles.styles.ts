import { makeStyles, mergeClasses } from '@griffel/react';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import { ToolbarButtonState } from './ToolbarButton.types';

const useBaseStyles = makeStyles({
  vertical: {
    flexDirection: 'column',
  },
  verticalIcon: {
    fontSize: '24px',
    margin: '0',
  },
});

/**
 * Apply styling to the ToolbarButton slots based on the state
 */
export const useToolbarButtonStyles_unstable = (state: ToolbarButtonState) => {
  'use no memo';

  useButtonStyles_unstable(state);
  const buttonStyles = useBaseStyles();

  state.root.className = mergeClasses(state.root.className, state.vertical && buttonStyles.vertical);
  if (state.icon) {
    state.icon.className = mergeClasses(state.icon.className, state.vertical && buttonStyles.verticalIcon);
  }
};
