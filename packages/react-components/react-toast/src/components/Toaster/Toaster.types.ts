import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ToasterOptions, Toast, ToastPosition, ToastId } from '../../state/types';
import { Announce, AriaLiveProps } from '../AriaLive';

export type ToasterSlots = {
  /**
   * NOTE: This root slot maps in exactly the same way to the containers rendered for each toast position
   * There is no intention (currently) to let users customize the div for each toast position.
   */
  root: Slot<'div'>;
};

export type ToasterSlotsInternal = {
  'bottom-right': Slot<'div'>;
  'bottom-left': Slot<'div'>;
  'top-right': Slot<'div'>;
  'top-left': Slot<'div'>;
};

/**
 * Toaster Props
 */
export type ToasterProps = Omit<ComponentProps<ToasterSlots>, 'children'> &
  Partial<ToasterOptions> & {
    /**
     * User override API for aria-live narration for toasts
     */
    announce?: Announce;
  };

/**
 * State used in rendering Toaster
 */
export type ToasterState = ComponentState<ToasterSlots & ToasterSlotsInternal> &
  Pick<AriaLiveProps, 'announceRef'> &
  Pick<Required<ToasterProps>, 'announce'> & {
    toastsToRender: Map<ToastPosition, Toast[]>;
    isToastVisible: (toastId: ToastId) => boolean;
    offset: ToasterOptions['offset'] | undefined;
    renderAriaLive: boolean;
  };
