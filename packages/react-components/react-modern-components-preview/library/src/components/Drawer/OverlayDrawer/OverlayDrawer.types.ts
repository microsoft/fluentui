import type {
  OverlayDrawerProps as OverlayDrawerBaseProps,
  OverlayDrawerSlots as OverlayDrawerBaseSlots,
  OverlayDrawerState as OverlayDrawerBaseState,
} from '@fluentui/react-headless-components-preview/drawer';
import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type { DialogProps } from '../../Dialog/Dialog/Dialog.types';
import type { DrawerInternalSurfaceMotionSlots, DrawerSize, DrawerSurfaceMotionSlots } from '../Drawer/Drawer.types';

export type OverlayDrawerInternalSlots = OverlayDrawerSlots &
  DrawerInternalSurfaceMotionSlots & {
    dialog: NonNullable<Slot<DialogProps>>;
  };

export type OverlayDrawerProps = OverlayDrawerBaseProps &
  Partial<DrawerSurfaceMotionSlots> & {
    /**
     * Size of the drawer.
     *
     * @default 'small'
     */
    size?: DrawerSize;
  };

export type OverlayDrawerSlots = OverlayDrawerBaseSlots & DrawerSurfaceMotionSlots;

export type OverlayDrawerState = Omit<OverlayDrawerBaseState, 'components' | 'root'> &
  ComponentState<{
    dialog: NonNullable<Slot<DialogProps>>;
    root: NonNullable<OverlayDrawerSlots['root']>;
    surfaceMotion: NonNullable<DrawerSurfaceMotionSlots['surfaceMotion']>;
  }> & {
    size: DrawerSize;
    root: OverlayDrawerBaseState['root'] & {
      'data-size': DrawerSize;
    };
  };
