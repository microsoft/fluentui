import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useRadioGroupStyles_unstable } from '@fluentui/react-radio';
import { ToolbarRadioGroupState } from './ToolbarRadioGroup.types';

const useBaseStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
});

// const useSmallStyles = makeStyles({
//   label: {
//     fontSize: 'var(--fontSizeBase200)',
//   },
// });

/**
 * Apply styling to the ToolbarRadio slots based on the state
 */
export const useToolbarRadioGroupStyles_unstable = (state: ToolbarRadioGroupState) => {
  useRadioGroupStyles_unstable(state);
  const baseToolbarRadioStyles = useBaseStyles();

  state.root.className = mergeClasses(state.root.className, baseToolbarRadioStyles.root);
};
