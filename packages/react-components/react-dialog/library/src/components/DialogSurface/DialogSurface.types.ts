import type { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { PortalProps } from '@fluentui/react-portal';
import type { ComponentProps, ComponentState, Slot, ExtractSlotProps } from '@fluentui/react-utilities';

import { DialogContextValue, DialogSurfaceContextValue } from '../../contexts';

/**
 * Custom slot props for the backdrop slot.
 */
export type DialogBackdropSlotProps = ExtractSlotProps<
  Slot<'div'> & {
    /**
     * Controls the backdrop appearance.
     * - 'dimmed': Shows a dimmed backdrop (default for standalone dialogs)
     * - 'transparent': Shows a transparent backdrop (default for nested dialogs)
     */
    appearance?: 'dimmed' | 'transparent';
  }
>;

export type DialogSurfaceSlots = {
  /**
   * Dimmed background of dialog.
   * The default backdrop is rendered as a `<div>` with styling.
   * This slot expects a `<div>` element which will replace the default backdrop.
   * The backdrop should have `aria-hidden="true"`.
   *
   * Accepts an `appearance` prop to control backdrop visibility:
   * - `'dimmed'`: Always shows a dimmed backdrop, regardless of nesting.
   * - `'transparent'`: Always shows a transparent backdrop.
   *
   * @example
   * ```tsx
   * <DialogSurface backdrop={{ appearance: 'dimmed' }} />
   * ```
   */
  backdrop?: Slot<DialogBackdropSlotProps>;
  root: Slot<'div'>;
  /**
   * For more information refer to the [Motion docs page](https://react.fluentui.dev/?path=/docs/motion-motion-slot--docs).
   *
   */
  backdropMotion: Slot<PresenceMotionSlotProps>;
};

/**
 * Union between all possible semantic element that represent a DialogSurface
 */
export type DialogSurfaceElement = HTMLElement;

/**
 * DialogSurface Props
 */
export type DialogSurfaceProps = ComponentProps<Partial<DialogSurfaceSlots>> & Pick<PortalProps, 'mountNode'>;

export type DialogSurfaceContextValues = {
  dialogSurface: DialogSurfaceContextValue;
};

/**
 * State used in rendering DialogSurface
 */
export type DialogSurfaceState = ComponentState<DialogSurfaceSlots> &
  // This is only partial to avoid breaking changes, it should be mandatory and in fact it is always defined internally.
  Pick<DialogContextValue, 'isNestedDialog'> &
  Pick<PortalProps, 'mountNode'> & {
    open?: boolean;
    unmountOnClose?: boolean;
    /**
     * Whether the backdrop should be treated as nested (transparent).
     * When inside an OverlayDrawer, this is `false` even though `isNestedDialog` may be `true`,
     * preventing the false-positive transparent backdrop.
     */
    treatBackdropAsNested: boolean;
    /**
     * Transition status for animation.
     * In test environment, this is always `undefined`.
     *
     * @deprecated Will be always `undefined`.
     */
    transitionStatus?: 'entering' | 'entered' | 'idle' | 'exiting' | 'exited' | 'unmounted';
    backdropAppearance?: DialogBackdropSlotProps['appearance'];
  };
