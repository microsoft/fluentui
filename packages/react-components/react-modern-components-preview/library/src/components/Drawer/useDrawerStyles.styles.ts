import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  DrawerBodySlots,
  DrawerBodyState,
  DrawerFooterSlots,
  DrawerFooterState,
  DrawerHeaderNavigationSlots,
  DrawerHeaderNavigationState,
  DrawerHeaderSlots,
  DrawerHeaderState,
  DrawerHeaderTitleSlots,
  DrawerHeaderTitleState,
  DrawerSlots,
  DrawerState,
  InlineDrawerSlots,
  InlineDrawerState,
  OverlayDrawerSlots,
  OverlayDrawerState,
} from './Drawer.types';
import styles from './Drawer.module.css';

export const drawerClassNames: SlotClassNames<DrawerSlots> = {
  root: 'fui-Drawer',
};

export const overlayDrawerClassNames: SlotClassNames<Pick<OverlayDrawerSlots, 'root'>> = {
  root: 'fui-OverlayDrawer',
};

export const inlineDrawerClassNames: SlotClassNames<Pick<InlineDrawerSlots, 'root'>> = {
  root: 'fui-InlineDrawer',
};

export const drawerBodyClassNames: SlotClassNames<DrawerBodySlots> = {
  root: 'fui-DrawerBody',
};

export const drawerHeaderClassNames: SlotClassNames<DrawerHeaderSlots> = {
  root: 'fui-DrawerHeader',
};

export const drawerHeaderTitleClassNames: SlotClassNames<DrawerHeaderTitleSlots> = {
  root: 'fui-DrawerHeaderTitle',
  heading: 'fui-DrawerHeaderTitle__heading',
  action: 'fui-DrawerHeaderTitle__action',
};

export const drawerHeaderNavigationClassNames: SlotClassNames<DrawerHeaderNavigationSlots> = {
  root: 'fui-DrawerHeaderNavigation',
};

export const drawerFooterClassNames: SlotClassNames<DrawerFooterSlots> = {
  root: 'fui-DrawerFooter',
};

export const useDrawerStyles = (state: DrawerState): DrawerState => {
  state.root.className = clsx(drawerClassNames.root, state.root.className);
  return state;
};

export const useOverlayDrawerStyles = (state: OverlayDrawerState): OverlayDrawerState => {
  state.root.className = clsx(
    overlayDrawerClassNames.root,
    styles.drawerBase,
    styles.overlayDrawer,
    state.root.className,
  );
  return state;
};

export const useInlineDrawerStyles = (state: InlineDrawerState): InlineDrawerState => {
  state.root.className = clsx(
    inlineDrawerClassNames.root,
    styles.drawerBase,
    styles.inlineDrawer,
    state.root.className,
  );
  return state;
};

export const useDrawerBodyStyles = (state: DrawerBodyState): DrawerBodyState => {
  state.root.className = clsx(drawerBodyClassNames.root, styles.drawerBody, state.root.className);
  return state;
};

export const useDrawerHeaderStyles = (state: DrawerHeaderState): DrawerHeaderState => {
  state.root.className = clsx(drawerHeaderClassNames.root, styles.drawerHeader, state.root.className);
  return state;
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

export const useDrawerHeaderNavigationStyles = (state: DrawerHeaderNavigationState): DrawerHeaderNavigationState => {
  state.root.className = clsx(
    drawerHeaderNavigationClassNames.root,
    styles.drawerHeaderNavigation,
    state.root.className,
  );
  return state;
};

export const useDrawerFooterStyles = (state: DrawerFooterState): DrawerFooterState => {
  state.root.className = clsx(drawerFooterClassNames.root, styles.drawerFooter, state.root.className);
  return state;
};
