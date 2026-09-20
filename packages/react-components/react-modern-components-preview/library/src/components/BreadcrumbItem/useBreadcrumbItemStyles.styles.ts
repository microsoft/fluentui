import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { BreadcrumbItemSlots, BreadcrumbItemState } from './BreadcrumbItem.types';
import styles from './BreadcrumbItem.module.css';

export const breadcrumbItemClassNames: SlotClassNames<BreadcrumbItemSlots> = {
  root: 'fui-BreadcrumbItem',
};

export const useBreadcrumbItemStyles = (state: BreadcrumbItemState): BreadcrumbItemState => {
  state.root.className = clsx(breadcrumbItemClassNames.root, styles.root, state.root.className);

  return state;
};
