import { makeStyles, mergeClasses } from '@griffel/react';
import type { BreadcrumbSlots, BreadcrumbState } from './Breadcrumb.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const breadcrumbClassNames: SlotClassNames<BreadcrumbSlots> = {
  root: 'fui-Breadcrumb',
  list: 'fui-Breadcrumb__list',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
  list: {
    listStyleType: 'none',
    display: 'flex',
    alignItems: 'center',
  },
});

/**
 * Apply styling to the Breadcrumb slots based on the state
 */
export const useBreadcrumbStyles_unstable = (state: BreadcrumbState): BreadcrumbState => {
  const styles = useStyles();
  state.root.className = mergeClasses(breadcrumbClassNames.root, styles.root, state.root.className);
  if (state.list) {
    state.list.className = mergeClasses(breadcrumbClassNames.list, styles.list, state.list.className);
  }
  return state;
};
