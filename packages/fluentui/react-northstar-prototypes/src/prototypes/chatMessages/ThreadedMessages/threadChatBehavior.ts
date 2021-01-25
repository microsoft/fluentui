import { chatBehavior, Accessibility, ChatBehaviorProps } from '@fluentui/react-northstar';
import classNames from './classNames';

const threadChatBehavior: Accessibility<ChatBehaviorProps> = () => {
  const behaviorData = chatBehavior();

  behaviorData.focusZone.props = {
    ...behaviorData.focusZone.props,
    defaultTabbableElement: getLastTabbableElement,
  };
  return behaviorData;
};

export default threadChatBehavior;

const getLastTabbableElement = (root: HTMLElement): HTMLElement => {
  // In real chat, it should focus the message with data-last-visible="true"
  // Since we don't have this logic in Fluent UI, overriding a selector to focus the last thread message
  const chatItemsElements = root.querySelectorAll(
    `[chat-focuszone] .${classNames.threadedMessage.thread}[data-is-focusable="true"]`,
  );
  return chatItemsElements.length > 0 ? (chatItemsElements[chatItemsElements.length - 1] as HTMLElement) : null;
};
