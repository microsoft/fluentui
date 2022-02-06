import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type RadioSlots = {
  root: IntrinsicSlotProps<'span'>;
};

/**
 * Radio Props
 */
export type RadioProps = ComponentProps<RadioSlots>;

/**
 * State used in rendering Radio
 */
export type RadioState = ComponentState<RadioSlots>;
