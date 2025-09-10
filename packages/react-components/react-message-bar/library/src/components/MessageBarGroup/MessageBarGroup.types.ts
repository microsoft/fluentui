import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type MessageBarGroupSlots = {
  root: Slot<'div'>;
};

/**
 * MessageBarGroup Props
 */
export type MessageBarGroupProps = ComponentProps<MessageBarGroupSlots> & {
  children: React.ReactElement[] | React.ReactElement;
  animate?: 'exit-only' | 'both';
};

/**
 * State used in rendering MessageBarGroup
 */
export type MessageBarGroupState = ComponentState<MessageBarGroupSlots> &
  Pick<MessageBarGroupProps, 'animate'> & {
    enterStyles: string;
    exitStyles: string;
    children: React.ReactElement[];
  };
