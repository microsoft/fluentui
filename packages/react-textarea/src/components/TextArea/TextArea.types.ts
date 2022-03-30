import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TextAreaSlots = {
  root: Slot<'div'>;
};

type TextAreaCommons = {
  // TODO Add things shared between props and state here
};

/**
 * TextArea Props
 */
export type TextAreaProps = ComponentProps<TextAreaSlots> & TextAreaCommons;

/**
 * State used in rendering TextArea
 */
export type TextAreaState = ComponentState<TextAreaSlots> & TextAreaCommons;
