import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MessageBarContextValue } from '../../contexts/messageBarContext';

export type MessageBarSlots = {
  root: Slot<'div'>;
  icon?: Slot<'div'>;
  /**
   * Rendered when the component is in multiline layout to guarantee correct spacing even
   * if no actions are rendered. When actions are rendered, the default actions grid area will render
   * over this element
   *
   * NOTE: If you are using this slot, this probably means that you are using the MessageBar without
   * actions, this is not recommended from an accesibility point of view
   */
  bottomReflowSpacer?: Slot<'div'>;
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
     * @default info
     */
    intent?: MessageBarIntent;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
     */
    politeness?: 'assertive' | 'polite';
    /**
     * Use squal for page level messages and rounded for component level messages
     * @default rounded
     */
    shape?: 'square' | 'rounded';
  };

/**
 * State used in rendering MessageBar
 */
export type MessageBarState = ComponentState<MessageBarSlots> &
  Required<Pick<MessageBarProps, 'layout' | 'intent' | 'shape'>> &
  Pick<MessageBarContextValue, 'actionsRef' | 'bodyRef' | 'titleId'> & {
    transitionClassName: string;
  };
