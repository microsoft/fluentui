import type { DrawerBodyState } from '../../Drawer/DrawerBody/DrawerBody.types';

export type {
  DrawerBodyProps as NavDrawerBodyProps,
  DrawerBodySlots as NavDrawerBodySlots,
} from '../../Drawer/DrawerBody/DrawerBody.types';

export type NavDrawerBodyState = DrawerBodyState & {
  root: DrawerBodyState['root'] & {
    focusgroup?: string;
  };
};
