import {
  buttonClassName,
  chatMessageSlotClassNames,
  chatItemSlotClassNames,
  chatItemClassName,
  chatMessageClassName,
  chatMessageContentClassName,
} from '@fluentui/react-northstar';

const classNames = {
  threadedMessage: {
    thread: `${chatMessageClassName}__thread`,
    threadBody: `${chatMessageClassName}__thread-body`,
    innerContent: `${chatMessageContentClassName}-inner`,
    author: `${chatMessageSlotClassNames.author}-inner`,
    timestamp: `${chatMessageSlotClassNames.timestamp}-inner`,
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
