'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AppItemSlots, AppItemState } from './AppItem.types';
import { useRootDefaultClassName } from '../sharedNavStyles.styles.css';
import sharedStyles from '../sharedNavStyles.module.css';
import styles from './AppItem.module.css';

export const appItemClassNames: SlotClassNames<AppItemSlots> = {
  root: 'fui-AppItem',
  icon: 'fui-AppItem__icon',
};

export const useAppItemStyles = (): Record<'root' | 'small' | 'absentIconRootAdjustment', string> => ({
  root: styles.root,
  small: styles.small,
  absentIconRootAdjustment: styles.absentIconRootAdjustment,
});

export const useAppItemStyles_unstable = (state: AppItemState): AppItemState => {
  const rootDefaultClassName = useRootDefaultClassName();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    appItemClassNames.root,
    rootDefaultClassName,
    styles.root,
    styles[state.density],
    !state.icon && styles.absentIconRootAdjustment,
    state.root.className,
  );
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(appItemClassNames.icon, sharedStyles.icon, state.icon.className);
  }
  return state;
};
