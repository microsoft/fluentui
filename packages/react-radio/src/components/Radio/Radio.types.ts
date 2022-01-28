import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type RadioSlots = {
  root: IntrinsicShorthandProps<'span'>;
};

/**
 * Radio Props
 */
export type RadioProps = ComponentProps<RadioSlots>;

/**
 * State used in rendering Radio
 */
export type RadioState = ComponentState<RadioSlots>;
