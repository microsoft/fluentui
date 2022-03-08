import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogSlots = {
  root: Slot<'div'>;
  overlay?: Slot<'div'>;
};

type DialogCommons = {
  isOpen: boolean;
  type?: 'alert' | 'modal' | 'non-modal';
  // TODO Add things shared between props and state here
};

/**
 * Dialog Props
 */
export type DialogProps = ComponentProps<DialogSlots> & DialogCommons;

/**
 * State used in rendering Dialog
 */
export type DialogState = ComponentState<DialogSlots> &
  DialogCommons & {
    overlayClassName?: string;
  };
