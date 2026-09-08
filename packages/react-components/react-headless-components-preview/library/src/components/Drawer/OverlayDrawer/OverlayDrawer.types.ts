import type { OverlayDrawerProps as OverlayDrawerBaseProps } from '@fluentui/react-drawer';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

import type { DialogProps, DialogSurfaceProps } from '../../Dialog';

export type OverlayDrawerSlots = {
  /**
   * Slot for the root element.
   */
  root: Slot<DialogSurfaceProps>;
};

type OverlayDrawerInternalSlots = OverlayDrawerSlots & {
  /**
   * Slot for the dialog component that wraps the drawer.
   */
  dialog: NonNullable<Slot<DialogProps>>;
};

export type OverlayDrawerProps = ComponentProps<OverlayDrawerSlots> &
  Pick<OverlayDrawerBaseProps, 'position'> &
  Pick<DialogProps, 'open' | 'modalType' | 'onOpenChange' | 'unmountOnClose'>;

export type OverlayDrawerState = ComponentState<OverlayDrawerInternalSlots> &
  Required<Pick<OverlayDrawerProps, 'open' | 'position' | 'unmountOnClose' | 'modalType'>> &
  Pick<OverlayDrawerProps, 'onOpenChange'>;
