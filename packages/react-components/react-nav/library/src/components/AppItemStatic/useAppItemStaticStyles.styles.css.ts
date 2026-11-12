'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AppItemStaticSlots, AppItemStaticState } from './AppItemStatic.types';
import { useRootDefaultClassName } from '../sharedNavStyles.styles.css';
import sharedStyles from '../sharedNavStyles.module.css';
import { useAppItemStyles } from '../AppItem/useAppItemStyles.styles.css';
import styles from './AppItemStatic.module.css';

export const appItemStaticClassNames: SlotClassNames<AppItemStaticSlots> = {
  root: 'fui-AppItemStatic',
  icon: 'fui-AppItemStatic__icon',
};

export const useAppItemStaticStyles_unstable = (state: AppItemStaticState): AppItemStaticState => {
  const rootDefaultClassName = useRootDefaultClassName();
  const appStyles = useAppItemStyles();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    appItemStaticClassNames.root,
    rootDefaultClassName,
    appStyles.root,
    styles.root,
    state.density === 'small' && appStyles.small,
    !state.icon && appStyles.absentIconRootAdjustment,
    state.root.className,
  );
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(appItemStaticClassNames.icon, sharedStyles.icon, state.icon.className);
  }
  return state;
};
