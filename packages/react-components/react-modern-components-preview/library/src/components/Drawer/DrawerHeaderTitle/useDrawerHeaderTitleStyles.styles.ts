import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DrawerHeaderTitleSlots, DrawerHeaderTitleState } from './DrawerHeaderTitle.types';
import styles from './DrawerHeaderTitle.module.css';

export const drawerHeaderTitleClassNames: SlotClassNames<DrawerHeaderTitleSlots> = {
  root: 'fui-DrawerHeaderTitle',
  heading: 'fui-DrawerHeaderTitle__heading',
  action: 'fui-DrawerHeaderTitle__action',
};

export const useDrawerHeaderTitleStyles = (state: DrawerHeaderTitleState): DrawerHeaderTitleState => {
  state.root.className = clsx(drawerHeaderTitleClassNames.root, styles.drawerHeaderTitle, state.root.className);

  if (state.heading) {
    state.heading.className = clsx(
      drawerHeaderTitleClassNames.heading,
      'fui-DialogTitle',
      styles.drawerHeaderTitleHeading,
      state.heading.className,
    );
  }

  if (state.action) {
    state.action.className = clsx(
      drawerHeaderTitleClassNames.action,
      'fui-DialogTitle__action',
      styles.drawerHeaderTitleAction,
      state.action.className,
    );
  }

  return state;
};
