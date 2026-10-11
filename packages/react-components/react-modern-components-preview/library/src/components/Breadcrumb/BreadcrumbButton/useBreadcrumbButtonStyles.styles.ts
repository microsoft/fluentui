'use client';

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles } from '../../Button/useButtonStyles.styles';
import type { BreadcrumbButtonSlots, BreadcrumbButtonState } from './BreadcrumbButton.types';
import styles from './BreadcrumbButton.module.css';

export const breadcrumbButtonClassNames: SlotClassNames<BreadcrumbButtonSlots> = {
  root: 'fui-BreadcrumbButton',
  icon: 'fui-BreadcrumbButton__icon',
};

export const useBreadcrumbButtonStyles = (state: BreadcrumbButtonState): BreadcrumbButtonState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(breadcrumbButtonClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(breadcrumbButtonClassNames.icon, styles.icon, state.icon.className);
  }

  useButtonStyles(state);

  return state;
};
