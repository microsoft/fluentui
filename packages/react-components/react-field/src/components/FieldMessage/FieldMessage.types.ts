import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * FieldMessage Slots
 */
export type FieldMessageSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Icon displayed before the message text. The default icon depends on the validationState.
   */
  icon?: Slot<'span'>;
};

/**
 * FieldMessage Props
 */
export type FieldMessageProps = ComponentProps<FieldMessageSlots> & {
  validationState?: 'error' | 'success' | 'warning' | 'neutral';
};

/**
 * State used in rendering FieldMessage
 */
export type FieldMessageState = ComponentState<FieldMessageSlots> &
  Required<Pick<FieldMessageProps, 'validationState'>>;
