import type { PresenceDirection, PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

import type { DrawerMotionParams } from '../../shared/drawerMotions';
import type { DrawerBaseProps, DrawerBaseState } from '../../shared/DrawerBase.types';

export type SurfaceMotionSlotProps = PresenceMotionSlotProps<DrawerMotionParams>;

export type InlineDrawerSlots = {
  root: Slot<'div', 'aside'>;
  surfaceMotion?: Slot<SurfaceMotionSlotProps>;
};

/**
 * InlineDrawer Props
 */
export type InlineDrawerProps = ComponentProps<InlineDrawerSlots> &
  DrawerBaseProps & {
    /**
     * Whether the drawer has a separator line.
     *
     * @default false
     */
    separator?: boolean;
  };

/**
 * State used in rendering InlineDrawer
 */
export type InlineDrawerState = ComponentState<InlineDrawerSlots> &
  Required<DrawerBaseState & Pick<InlineDrawerProps, 'separator'>> & {
    animationDirection: PresenceDirection;
    open: boolean;
    unmountOnClose: boolean;
  };

/**
 * InlineDrawer props without design-specific props (`size`, `position`, `separator`, and `surfaceMotion`).
 * Use with `useInlineDrawerBase_unstable` to build custom-styled InlineDrawer variants.
 */
export type InlineDrawerBaseProps = ComponentProps<Omit<InlineDrawerSlots, 'surfaceMotion'>> &
  Omit<DrawerBaseProps, 'size' | 'position'>;

/**
 * InlineDrawer state without design-specific state fields (no `size`, `position`, `separator`,
 * `surfaceMotion`, `animationDirection`, or deprecated `motion`).
 */
export type InlineDrawerBaseState = ComponentState<Omit<InlineDrawerSlots, 'surfaceMotion'>> & {
  open: boolean;
  unmountOnClose: boolean;
};
