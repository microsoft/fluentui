import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import type { BreadcrumbDividerSlots, BreadcrumbDividerState } from './BreadcrumbDivider.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const breadcrumbDividerClassNames: SlotClassNames<BreadcrumbDividerSlots> = {
  root: 'fui-BreadcrumbDivider',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  display: 'flex',
});

const useIconStyles = makeStyles({
  small: {
    fontSize: '12px',
  },
  medium: {
    fontSize: '16px',
  },
  large: {
    fontSize: '20px',
  },
});

/**
 * Apply styling to the BreadcrumbDivider slots based on the state
 */
export const useBreadcrumbDividerStyles_unstable = (state: BreadcrumbDividerState): BreadcrumbDividerState => {
  'use no memo';

  const styles = useStyles();
  const iconStyles = useIconStyles();
  const { size = 'medium' } = state;

  state.root.className = mergeClasses(breadcrumbDividerClassNames.root, styles, iconStyles[size], state.root.className);

  return state;
};
