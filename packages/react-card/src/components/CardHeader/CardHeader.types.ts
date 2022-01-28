import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type CardHeaderSlots = {
  root: IntrinsicSlotProps<'div'>;
  image: IntrinsicSlotProps<'div'>;
  content?: IntrinsicSlotProps<'div'>;
  header: IntrinsicSlotProps<'span'>;
  description: IntrinsicSlotProps<'span'>;
  action?: IntrinsicSlotProps<'div'>;
};

/**
 * CardHeader props
 */
export type CardHeaderProps = ComponentProps<CardHeaderSlots>;

/**
 * State used in rendering CardHeader
 */
export type CardHeaderState = ComponentState<CardHeaderSlots>;
