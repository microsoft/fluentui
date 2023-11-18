import { makeStyles, mergeClasses } from '@griffel/react';
import type { BreadcrumbDividerSlots, BreadcrumbDividerState } from './BreadcrumbDivider.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const breadcrumbDividerClassNames: SlotClassNames<BreadcrumbDividerSlots> = {
  root: 'fui-BreadcrumbDivider',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

/**
 * Apply styling to the BreadcrumbDivider slots based on the state
 */
export const useBreadcrumbDividerStyles_unstable = (state: BreadcrumbDividerState): BreadcrumbDividerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(breadcrumbDividerClassNames.root, styles.root, state.root.className);

  return state;
};
