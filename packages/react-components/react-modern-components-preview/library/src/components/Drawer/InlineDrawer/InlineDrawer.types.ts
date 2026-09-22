import type {
  InlineDrawerProps as InlineDrawerBaseProps,
  InlineDrawerSlots as InlineDrawerBaseSlots,
  InlineDrawerState as InlineDrawerBaseState,
} from '@fluentui/react-headless-components-preview/drawer';
import type { ComponentState } from '@fluentui/react-utilities';
import type { DrawerInternalSurfaceMotionSlots, DrawerSize, DrawerSurfaceMotionSlots } from '../Drawer/Drawer.types';

export type InlineDrawerInternalSlots = Pick<InlineDrawerBaseSlots, 'root'> & DrawerInternalSurfaceMotionSlots;

export type InlineDrawerProps = Omit<InlineDrawerBaseProps, 'surfaceMotion'> & {
  /**
   * Size of the drawer.
   *
   * @default 'small'
   */
  size?: DrawerSize;

  /**
   * Whether the drawer has a separator line.
   *
   * @default false
   */
  separator?: boolean;
} & Partial<DrawerSurfaceMotionSlots>;

export type InlineDrawerSlots = Pick<InlineDrawerBaseSlots, 'root'> & DrawerSurfaceMotionSlots;

export type InlineDrawerState = Omit<InlineDrawerBaseState, 'components' | 'root' | 'surfaceMotion'> &
  ComponentState<{
    root: NonNullable<InlineDrawerSlots['root']>;
    surfaceMotion: NonNullable<DrawerSurfaceMotionSlots['surfaceMotion']>;
  }> & {
    size: DrawerSize;
    separator: boolean;
    root: InlineDrawerBaseState['root'] & {
      'data-size': DrawerSize;
      'data-separator'?: string;
    };
  };
