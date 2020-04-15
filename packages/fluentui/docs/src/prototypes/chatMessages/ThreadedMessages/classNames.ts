import { buttonClassName, ChatMessage, ChatItem } from '@fluentui/react-northstar';

const classNames = {
  threadedMessage: {
    thread: `${ChatMessage.className}__thread`,
    threadBody: `${ChatMessage.className}__thread-body`,
    innerContent: `${ChatMessage.slotClassNames.content}-inner`,
    author: `${ChatMessage.slotClassNames.author}-inner`,
    timestamp: `${ChatMessage.slotClassNames.timestamp}-inner`,
  },
  threadReplies: {
    trigger: `${buttonClassName}__reply`,
    message: `${ChatMessage.className}__reply`,
    gutter: `${ChatItem.className}__reply__gutter`,
    chatItem: `${ChatItem.className}__reply`,
    chatItemMessage: `${ChatItem.slotClassNames.message}-reply`,
  },
  replyEditor: `${ChatMessage.className}__reply-editor`,
};

export default classNames;
