'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { BreadcrumbButtonSlots, BreadcrumbButtonState } from './BreadcrumbButton.types';
import styles from './BreadcrumbButton.module.css';

export const breadcrumbButtonClassNames: SlotClassNames<BreadcrumbButtonSlots> = {
  root: 'fui-BreadcrumbButton',
  icon: 'fui-BreadcrumbButton__icon',
};

export const useBreadcrumbButtonStyles_unstable = (state: BreadcrumbButtonState): BreadcrumbButtonState => {
  useButtonStyles_unstable(state);

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    breadcrumbButtonClassNames.root,
    styles[state.size],
    styles.root,
    state.current && styles.current,
    state.root.className,
  );

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(breadcrumbButtonClassNames.icon, styles.icon, styles[state.size], state.icon.className);
  }

  return state;
};
