import {
  buttonClassName,
  chatMessageSlotClassNames,
  chatItemSlotClassNames,
  chatItemClassName,
  chatMessageClassName,
  chatMessageTimestampClassName,
} from '@fluentui/react-northstar';

const classNames = {
  threadedMessage: {
    thread: `${chatMessageClassName}__thread`,
    threadBody: `${chatMessageClassName}__thread-body`,
    innerContent: `${chatMessageSlotClassNames.content}-inner`,
    author: `${chatMessageSlotClassNames.author}-inner`,
    timestamp: `${chatMessageTimestampClassName}-inner`,
  },
  threadReplies: {
    trigger: `${buttonClassName}__reply`,
    message: `${chatMessageClassName}__reply`,
    gutter: `${chatItemClassName}__reply__gutter`,
    chatItem: `${chatItemClassName}__reply`,
    chatItemMessage: `${chatItemSlotClassNames.message}-reply`,
  },
  replyEditor: `${chatMessageClassName}__reply-editor`,
};

export default classNames;
