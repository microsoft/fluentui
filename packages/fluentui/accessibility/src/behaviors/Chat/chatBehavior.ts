import { getCode, keyboardKey } from '../../keyboard-key';

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
import { chatMessageBehavior } from './chatMessageBehavior';

const CHAT_FOCUSZONE_ATTRIBUTE = 'chat-focuszone';

/**
 * @description
 * Adds a vertical focus zone navigation with a last message as a default tabbable element, pressing enter key focuses inside a message.
 *
 * @specification
 * Provides arrow key navigation in vertical direction.
 * Focus is set initially on the specified default tabbable element.
 * Focused active element of the component is reset when TAB from the component.
 * Focus can be moved inside a child component with embeded inner FocusZone by pressing a specified key.
 * Does not handle PageDown and PageUp.
 */
export const chatBehavior: Accessibility<ChatBehaviorProps> = () => ({
  attributes: {
    root: {},
  },
  focusZone: {
    props: {
      shouldEnterInnerZone: event => getCode(event) === keyboardKey.Enter,
      direction: FocusZoneDirection.vertical,
      shouldResetActiveElementWhenTabFromZone: true,
      defaultTabbableElement: getLastTabbableElement, // select last chat message by default
      [CHAT_FOCUSZONE_ATTRIBUTE]: '', // allows querying the default active element
      pagingSupportDisabled: true,
    },
  },
  childBehaviors: {
    item: undefined,
    message: chatMessageBehavior,
  },
});

const getLastTabbableElement = (root: HTMLElement): HTMLElement => {
  const lastVisibleMessage = root.querySelector('[data-last-visible="true"]') as HTMLElement;
  if (lastVisibleMessage) return lastVisibleMessage;

  const chatItemsElements = root.querySelectorAll(
    `[${CHAT_FOCUSZONE_ATTRIBUTE}] .ui-chat__message[${IS_FOCUSABLE_ATTRIBUTE}="true"]`,
  );
  return chatItemsElements.length > 0 ? (chatItemsElements[chatItemsElements.length - 1] as HTMLElement) : null;
};

export type ChatBehaviorProps = never;
