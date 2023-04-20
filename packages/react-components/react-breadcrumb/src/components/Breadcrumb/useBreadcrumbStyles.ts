import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import type { BreadcrumbSlots, BreadcrumbState } from './Breadcrumb.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const breadcrumbClassNames: SlotClassNames<BreadcrumbSlots> = {
  root: 'fui-Breadcrumb',
  list: 'fui-Breadcrumb__list',
};

const useListClassName = makeResetStyles({
  listStyleType: 'none',
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: 0,
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
  list: {},
});

/**
 * Apply styling to the Breadcrumb slots based on the state
 */
export const useBreadcrumbStyles_unstable = (state: BreadcrumbState): BreadcrumbState => {
  const styles = useStyles();
  const listBaseClassName = useListClassName();
  state.root.className = mergeClasses(breadcrumbClassNames.root, styles.root, state.root.className);
  if (state.list) {
    state.list.className = mergeClasses(
      listBaseClassName,
      breadcrumbClassNames.list,
      styles.list,
      state.list.className,
    );
  }
  return state;
};
