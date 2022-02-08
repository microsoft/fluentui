import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CardHeaderSlots = {
  root: Slot<'div'>;
  image: Slot<'div'>;
  content?: Slot<'div'>;
  header: Slot<'span'>;
  description: Slot<'span'>;
  action?: Slot<'div'>;
};

/**
 * CardHeader props
 */
export type CardHeaderProps = ComponentProps<Partial<CardHeaderSlots>>;

/**
 * State used in rendering CardHeader
 */
export type CardHeaderState = ComponentState<CardHeaderSlots>;
