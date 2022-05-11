import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useRadioStyles_unstable } from '@fluentui/react-radio';
import { ToolbarRadioState } from './ToolbarRadio.types';

const useBaseStyles = makeStyles({
  root: {
    ...shorthands.padding('0px'),
  },
});

const useSmallStyles = makeStyles({
  label: {
    fontSize: 'var(--fontSizeBase200)',
  },
  root: {
    columnGap: '8px',
  },
});

/**
 * Apply styling to the ToolbarRadio slots based on the state
 */
export const useToolbarRadioStyles_unstable = (state: ToolbarRadioState) => {
  useRadioStyles_unstable(state);
  const baseToolbarRadioStyles = useBaseStyles();
  const toolbarRadioSmallStyles = useSmallStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      state.label.className,
      state.size === 'small' && toolbarRadioSmallStyles.label,
    );
  }
  state.root.className = mergeClasses(
    state.root.className,
    baseToolbarRadioStyles.root,
    state.size === 'small' && toolbarRadioSmallStyles.root,
  );
};
