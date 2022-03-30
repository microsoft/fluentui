import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TextareaSlots = {
  root: Slot<'div'>;
};

type TextareaCommons = {
  // TODO Add things shared between props and state here
};

/**
 * Textarea Props
 */
export type TextareaProps = ComponentProps<TextareaSlots> & TextareaCommons;

/**
 * State used in rendering Textarea
 */
export type TextareaState = ComponentState<TextareaSlots> & TextareaCommons;
