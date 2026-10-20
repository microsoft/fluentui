import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { BreadcrumbSlots, BreadcrumbState } from './Breadcrumb.types';
import styles from './Breadcrumb.module.css';

export const breadcrumbClassNames: SlotClassNames<BreadcrumbSlots> = {
  root: 'fui-Breadcrumb',
  list: 'fui-Breadcrumb__list',
};

export const useBreadcrumbStyles = (state: BreadcrumbState): BreadcrumbState => {
  state.root.className = clsx(breadcrumbClassNames.root, state.root.className);

  if (state.list) {
    state.list.className = clsx(breadcrumbClassNames.list, styles.list, state.list.className);
  }

  return state;
};
