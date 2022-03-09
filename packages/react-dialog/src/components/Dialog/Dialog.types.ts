import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogSlots = {
  root: Slot<'div'>;
  overlay?: Slot<'div'>;
};

type DialogCommons = {
  /**
   * Whether the dialog is open or closed.
   * @defaultvalue undefined
   */
  isOpen: boolean;

  /**
   * A dialog can be a modal, non-modal or alert dialog.
   * @defaultvalue 'modal'
   */
  type?: 'alert' | 'modal' | 'non-modal';
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
