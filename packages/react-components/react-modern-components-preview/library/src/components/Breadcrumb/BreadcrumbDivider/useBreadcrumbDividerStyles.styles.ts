import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { BreadcrumbDividerSlots, BreadcrumbDividerState } from './BreadcrumbDivider.types';
import styles from './BreadcrumbDivider.module.css';

export const breadcrumbDividerClassNames: SlotClassNames<BreadcrumbDividerSlots> = {
  root: 'fui-BreadcrumbDivider',
};

export const useBreadcrumbDividerStyles = (state: BreadcrumbDividerState): BreadcrumbDividerState => {
  state.root.className = clsx(breadcrumbDividerClassNames.root, styles.root, state.root.className);

  return state;
};
