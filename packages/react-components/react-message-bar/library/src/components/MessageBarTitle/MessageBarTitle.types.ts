import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MessageBarTitleSlots = {
  root: Slot<'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'>;
};

/**
 * MessageBarTitle Props
 */
export type MessageBarTitleProps = ComponentProps<MessageBarTitleSlots> & {
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
};

/**
 * State used in rendering MessageBarTitle
 */
export type MessageBarTitleState = ComponentState<MessageBarTitleSlots>;
