import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MessagebarSlots = {
  root: Slot<'div'>;
};

/**
 * Messagebar Props
 */
export type MessagebarProps = ComponentProps<MessagebarSlots> & {};

/**
 * State used in rendering Messagebar
 */
export type MessagebarState = ComponentState<MessagebarSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from MessagebarProps.
// & Required<Pick<MessagebarProps, 'propName'>>
