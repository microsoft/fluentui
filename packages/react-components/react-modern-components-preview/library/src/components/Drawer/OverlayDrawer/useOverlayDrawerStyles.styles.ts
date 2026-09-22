import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import drawerBaseStyles from '../Drawer/Drawer.module.css';
import type { OverlayDrawerSlots, OverlayDrawerState } from './OverlayDrawer.types';
import styles from './OverlayDrawer.module.css';

export const overlayDrawerClassNames: SlotClassNames<Pick<OverlayDrawerSlots, 'root'>> = {
  root: 'fui-OverlayDrawer',
};

export const useOverlayDrawerStyles = (state: OverlayDrawerState): OverlayDrawerState => {
  state.root.className = clsx(
    overlayDrawerClassNames.root,
    drawerBaseStyles.drawerBase,
    styles.overlayDrawer,
    state.root.className,
  );
  return state;
};
