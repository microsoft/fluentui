'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useDialogTitleStyles_unstable } from '@fluentui/react-dialog';
import type { DrawerHeaderTitleSlots, DrawerHeaderTitleState } from './DrawerHeaderTitle.types';
import styles from './DrawerHeaderTitle.module.css';

export const drawerHeaderTitleClassNames: SlotClassNames<DrawerHeaderTitleSlots> = {
  root: 'fui-DrawerHeaderTitle',
  heading: 'fui-DrawerHeaderTitle__heading',
  action: 'fui-DrawerHeaderTitle__action',
};

export const useDrawerHeaderTitleStyles_unstable = (state: DrawerHeaderTitleState): DrawerHeaderTitleState => {
  const {
    heading: root = {},
    action,
    // The slot element type is not available from its definition.
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components,
  } = state;

  useDialogTitleStyles_unstable({
    components: {
      root: components.heading,
      action: components.action,
    },
    root,
    action,
  });

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(drawerHeaderTitleClassNames.root, styles.root, state.root.className);

  if (state.heading) {
    // eslint-disable-next-line react-hooks/immutability
    state.heading.className = clsx(drawerHeaderTitleClassNames.heading, state.heading.className);
  }

  if (state.action) {
    // eslint-disable-next-line react-hooks/immutability
    state.action.className = clsx(drawerHeaderTitleClassNames.action, styles.action, state.action.className);
  }

  return state;
};
