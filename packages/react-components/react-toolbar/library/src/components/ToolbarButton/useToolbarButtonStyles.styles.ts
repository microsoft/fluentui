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
export const useToolbarButtonStyles_unstable = (state: ToolbarButtonState): void => {
  'use no memo';

  const buttonStyles = useBaseStyles();

  state.root.className = mergeClasses(state.vertical && buttonStyles.vertical, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(state.vertical && buttonStyles.verticalIcon, state.icon.className);
  }

  useButtonStyles_unstable(state);
};
