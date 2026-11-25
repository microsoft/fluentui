import type { Slot } from '@fluentui/react-utilities';
import type {
  ToasterSlots,
  ToasterProps as ToasterBaseProps,
  ToasterState as ToasterBaseState,
} from '@fluentui/react-toast';
export type { ToasterSlots } from '@fluentui/react-toast';

export type ToasterSlotsInternal = ToasterSlots & {
  bottomEnd?: Slot<'div'>;
  bottomStart?: Slot<'div'>;
  topEnd?: Slot<'div'>;
  topStart?: Slot<'div'>;
  top?: Slot<'div'>;
  bottom?: Slot<'div'>;
};

/**
 * Toaster Props
 *
 * Headless Toaster always uses the native Popover API to render in the browser
 * top layer — there is no `mountNode` prop and no `inline` opt-out.
 */
export type ToasterProps = Omit<ToasterBaseProps, 'mountNode' | 'inline'>;

/**
 * State used in rendering Toaster
 */
export type ToasterState = Omit<ToasterBaseState, 'mountNode' | 'inline'>;
