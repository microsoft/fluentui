import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogContentSlots = {
  root: Slot<'div', 'main'>;
};

/**
 * DialogContent Props
 */
export type DialogContentProps = ComponentProps<DialogContentSlots> & {
  /**
   * Declares if focus will be trapped inside Dialog.
   * @default modalType !== 'non-modal'
   */
  trapFocus?: boolean;
};

/**
 * State used in rendering DialogContent
 */
export type DialogContentState = ComponentState<DialogContentSlots>;
