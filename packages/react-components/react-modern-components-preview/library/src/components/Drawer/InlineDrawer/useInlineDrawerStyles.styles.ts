import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import drawerBaseStyles from '../Drawer/Drawer.module.css';
import type { InlineDrawerSlots, InlineDrawerState } from './InlineDrawer.types';
import styles from './InlineDrawer.module.css';

export const inlineDrawerClassNames: SlotClassNames<Pick<InlineDrawerSlots, 'root'>> = {
  root: 'fui-InlineDrawer',
};

export const useInlineDrawerStyles = (state: InlineDrawerState): InlineDrawerState => {
  state.root.className = clsx(
    inlineDrawerClassNames.root,
    drawerBaseStyles.drawerBase,
    styles.inlineDrawer,
    state.root.className,
  );
  return state;
};
