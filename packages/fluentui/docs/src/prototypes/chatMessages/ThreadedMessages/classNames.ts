import { buttonClassName, ChatMessage, ChatItem } from '@fluentui/react-northstar';

const classNames = {
  threadedMessage: {
    thread: `${ChatMessage.deprecated_className}__thread`,
    threadBody: `${ChatMessage.deprecated_className}__thread-body`,
    innerContent: `${ChatMessage.slotClassNames.content}-inner`,
    author: `${ChatMessage.slotClassNames.author}-inner`,
    timestamp: `${ChatMessage.slotClassNames.timestamp}-inner`,
  },
  threadReplies: {
    trigger: `${buttonClassName}__reply`,
    message: `${ChatMessage.deprecated_className}__reply`,
    gutter: `${ChatItem.deprecated_className}__reply__gutter`,
    chatItem: `${ChatItem.deprecated_className}__reply`,
    chatItemMessage: `${ChatItem.slotClassNames.message}-reply`,
  },
  replyEditor: `${ChatMessage.deprecated_className}__reply-editor`,
};

export default classNames;
