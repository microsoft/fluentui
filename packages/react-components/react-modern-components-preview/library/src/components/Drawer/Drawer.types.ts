import type {
  DrawerBodyProps as DrawerBodyBaseProps,
  DrawerBodySlots as DrawerBodyBaseSlots,
  DrawerBodyState as DrawerBodyBaseState,
  DrawerFooterProps as DrawerFooterBaseProps,
  DrawerFooterSlots as DrawerFooterBaseSlots,
  DrawerFooterState as DrawerFooterBaseState,
  DrawerHeaderNavigationProps as DrawerHeaderNavigationBaseProps,
  DrawerHeaderNavigationSlots as DrawerHeaderNavigationBaseSlots,
  DrawerHeaderNavigationState as DrawerHeaderNavigationBaseState,
  DrawerHeaderProps as DrawerHeaderBaseProps,
  DrawerHeaderSlots as DrawerHeaderBaseSlots,
  DrawerHeaderState as DrawerHeaderBaseState,
  DrawerHeaderTitleProps as DrawerHeaderTitleBaseProps,
  DrawerHeaderTitleSlots as DrawerHeaderTitleBaseSlots,
  DrawerHeaderTitleState as DrawerHeaderTitleBaseState,
  DrawerSlots as DrawerBaseSlots,
  DrawerState as DrawerBaseState,
  InlineDrawerProps as InlineDrawerBaseProps,
  InlineDrawerSlots as InlineDrawerBaseSlots,
  InlineDrawerState as InlineDrawerBaseState,
  OverlayDrawerProps as OverlayDrawerBaseProps,
  OverlayDrawerSlots as OverlayDrawerBaseSlots,
  OverlayDrawerState as OverlayDrawerBaseState,
} from '@fluentui/react-headless-components-preview/drawer';
import type { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { SlideParams } from '@fluentui/react-motion-components-preview';
import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type { DialogProps } from '../Dialog/Dialog.types';

export type DrawerSize = 'small' | 'medium' | 'large' | 'full';

export type DrawerSurfaceMotionSlots = {
  /** Motion applied to the drawer surface. */
  surfaceMotion: Slot<PresenceMotionSlotProps<SlideParams>>;
};

export type DrawerInternalSurfaceMotionSlots = {
  surfaceMotion: NonNullable<Slot<PresenceMotionSlotProps<SlideParams>>>;
};

export type OverlayDrawerInternalSlots = OverlayDrawerSlots &
  DrawerInternalSurfaceMotionSlots & {
    dialog: NonNullable<Slot<DialogProps>>;
  };

export type InlineDrawerInternalSlots = Pick<InlineDrawerBaseSlots, 'root'> & DrawerInternalSurfaceMotionSlots;

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

export type DrawerProps =
  | (Omit<OverlayDrawerProps, 'type'> & {
      /**
       * Type of the drawer.
       *
       * @default 'overlay'
       */
      type?: 'overlay';
    })
  | (Omit<InlineDrawerProps, 'type'> & {
      /**
       * Type of the drawer.
       */
      type: 'inline';
    });

export type DrawerSlots = DrawerBaseSlots;

export type DrawerState = Omit<DrawerBaseState, 'root'> & {
  root: InlineDrawerProps | OverlayDrawerProps;
};

export type DrawerBodyProps = DrawerBodyBaseProps;
export type DrawerBodySlots = DrawerBodyBaseSlots;
export type DrawerBodyState = DrawerBodyBaseState;

export type DrawerHeaderProps = DrawerHeaderBaseProps;
export type DrawerHeaderSlots = DrawerHeaderBaseSlots;
export type DrawerHeaderState = DrawerHeaderBaseState;

export type DrawerHeaderTitleProps = DrawerHeaderTitleBaseProps;
export type DrawerHeaderTitleSlots = DrawerHeaderTitleBaseSlots;
export type DrawerHeaderTitleState = DrawerHeaderTitleBaseState;

export type DrawerHeaderNavigationProps = DrawerHeaderNavigationBaseProps;
export type DrawerHeaderNavigationSlots = DrawerHeaderNavigationBaseSlots;
export type DrawerHeaderNavigationState = DrawerHeaderNavigationBaseState;

export type DrawerFooterProps = DrawerFooterBaseProps;
export type DrawerFooterSlots = DrawerFooterBaseSlots;
export type DrawerFooterState = DrawerFooterBaseState;
