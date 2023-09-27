import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MessageBarTitleSlots = {
  root: Slot<'span'>;
};

/**
 * MessageBarTitle Props
 */
export type MessageBarTitleProps = ComponentProps<MessageBarTitleSlots> & {};

/**
 * State used in rendering MessageBarTitle
 */
export type MessageBarTitleState = ComponentState<MessageBarTitleSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from MessageBarTitleProps.
// & Required<Pick<MessageBarTitleProps, 'propName'>>
