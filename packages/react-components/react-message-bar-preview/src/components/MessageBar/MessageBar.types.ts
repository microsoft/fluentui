import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MessageBarContextValue } from '../../contexts/messageBarContext';
import * as React from 'react';

export type MessageBarSlots = {
  root: Slot<'div'>;
  icon?: Slot<'div'>;
};

export type MessageBarContextValues = {
  messageBar: MessageBarContextValue;
};

export type MessageBarIntent = 'info' | 'success' | 'warning' | 'error';

/**
 * MessageBar Props
 */
export type MessageBarProps = ComponentProps<MessageBarSlots> &
  Pick<Partial<MessageBarContextValue>, 'layout'> & {
    /**
     * Default designs announcement presets
     */
    intent?: MessageBarIntent;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
     */
    politeness?: 'assertive' | 'polite';
  };

/**
 * State used in rendering MessageBar
 */
export type MessageBarState = ComponentState<MessageBarSlots> &
  Required<Pick<MessageBarProps, 'layout' | 'intent'>> & {
    transitionClassName: string;
    actionsRef: React.MutableRefObject<HTMLDivElement | null>;
    bodyRef: React.MutableRefObject<HTMLDivElement | null>;
  };
