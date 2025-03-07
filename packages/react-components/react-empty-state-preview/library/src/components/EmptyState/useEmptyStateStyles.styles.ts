import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import type { EmptyStateSlots, EmptyStateState } from './EmptyState.types';

export const emptyStateClassNames: SlotClassNames<EmptyStateSlots> = {
  root: 'fui-EmptyState',
  header: 'fui-EmptyState__header',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeResetStyles({
  padding: '20px',
});

const useHeaderStyles = makeStyles({
  header: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
});

/**
 * Apply styling to the ColorSlider slots based on the state
 */
export const useColorSliderStyles_unstable = (state: EmptyStateState): EmptyStateState => {
  'use no memo';

  const rootStyles = useRootStyles();
  const headerStyles = useHeaderStyles();

  state.root.className = mergeClasses(emptyStateClassNames.root, rootStyles, state.root.className);

  if (state.header) {
    state.header.className = mergeClasses(emptyStateClassNames.header, headerStyles.header);
  }

  return state;
};
