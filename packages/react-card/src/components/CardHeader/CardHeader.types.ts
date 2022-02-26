import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CardHeaderSlots = {
  root: Slot<'div'>;
  image: Slot<'div'> | null;
  content?: Slot<'div'> | null;
  header: Slot<'span'> | null;
  description: Slot<'span'> | null;
  action?: Slot<'div'> | null;
};

/**
 * CardHeader props
 */
export type CardHeaderProps = ComponentProps<Partial<CardHeaderSlots>>;

/**
 * State used in rendering CardHeader
 */
export type CardHeaderState = ComponentState<CardHeaderSlots>;
