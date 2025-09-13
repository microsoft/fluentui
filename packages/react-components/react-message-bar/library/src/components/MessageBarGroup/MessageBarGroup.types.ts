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
    /** @deprecated property is unused; these CSS animations were replaced by motion components */
    enterStyles: string;
    /** @deprecated property is unused; these CSS animations were replaced by motion components */
    exitStyles: string;
    children: React.ReactElement[];
  };
