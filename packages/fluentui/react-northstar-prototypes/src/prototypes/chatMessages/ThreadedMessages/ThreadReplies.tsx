import * as React from 'react';
import * as _ from 'lodash';
import {
  AvatarProps,
  Avatar,
  ChatMessageProps,
  Button,
  ChatItem,
  ChatItemProps,
  Chat,
} from '@fluentui/react-northstar';
import repliesButtonBehavior from './repliesButtonBehavior';
import ScreenReaderHeaderText from './ScreenReaderHeaderText';
import classNames from './classNames';

export type ThreadReplyProps = ChatMessageProps & {
  avatar?: AvatarProps;
};

type ThreadRepliesProps = {
  replies?: ThreadReplyProps[];
};

const ThreadReplies: React.FC<ThreadRepliesProps> = props => {
  const [expanded, setExpanded] = React.useState(false);
  const { replies = [] } = props;
  const repliesCount = replies.length;

  const renderTriggerButton = () => {
    if (repliesCount === 0 || repliesCount === 1) {
      return null;
    }

    const authorName1 = replies[0].author;
    const authorName2 = replies[1].author;
    const remainReplies = repliesCount - 2;
    const moreRepliesLeft = remainReplies > 0;
    const buttonText = expanded
      ? 'Collapse all'
      : `${repliesCount} replies from ${authorName1} and ${authorName2}${
          moreRepliesLeft ? `, and ${remainReplies} others` : ''
        }`;

    return (
      <Button
        as="a"
        className={classNames.threadReplies.trigger}
        fluid
        accessibility={repliesButtonBehavior}
        onClick={() => setExpanded(!expanded)}
      >
        <ScreenReaderHeaderText level="5" text={buttonText} />
        <div aria-hidden="true">{buttonText}</div>
      </Button>
    );
  };

  const renderReplies = () => {
    return _.map(replies, (reply, index) => {
      const messageProps: ChatMessageProps = {
        content: reply.content,
        author: reply.author,
        timestamp: reply.timestamp,
        actionMenu: reply.actionMenu,
        className: classNames.threadReplies.message,
      };
      const chatItemProps: ChatItemProps = {
        gutter: {
          content: <Avatar {...reply.avatar} />,
          className: classNames.threadReplies.gutter,
        },
        message: {
          content: (
            <>
              <ScreenReaderHeaderText
                level="5"
                text={messageProps.content.toString()}
                author={messageProps.author.toString()}
              />
              <Chat.Message {...messageProps} />
            </>
          ),
          className: classNames.threadReplies.chatItemMessage,
        },
        className: classNames.threadReplies.chatItem,
      };
      // Don't use indexes for generating unique keys for items! Was only done for prototype purpose
      // https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
      return <ChatItem as="div" {...chatItemProps} key={`reply-message-id-!!${index}!!`} />;
    });
  };

  return (
    <>
      {renderTriggerButton()}
      {expanded && renderReplies()}
    </>
  );
};

export default ThreadReplies;
