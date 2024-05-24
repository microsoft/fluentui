import type { PortalProps } from '@fluentui/react-portal';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

import { DialogContextValue, DialogSurfaceContextValue } from '../../contexts';

export type DialogSurfaceSlots = {
  /**
   * Dimmed background of dialog.
   * The default backdrop is rendered as a `<div>` with styling.
   * This slot expects a `<div>` element which will replace the default backdrop.
   * The backdrop should have `aria-hidden="true"`.
   *
   */
  backdrop?: Slot<'div'>;
  root: Slot<'div'>;
};

/**
 * Union between all possible semantic element that represent a DialogSurface
 */
export type DialogSurfaceElement = HTMLElement;

/**
 * DialogSurface Props
 */
export type DialogSurfaceProps = ComponentProps<DialogSurfaceSlots> & Pick<PortalProps, 'mountNode'>;

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

    /**
     * Transition status for animation.
     * In test environment, this is always `undefined`.
     *
     * @deprecated Will be always `undefined`.
     */
    transitionStatus?: 'entering' | 'entered' | 'idle' | 'exiting' | 'exited' | 'unmounted';
  };
