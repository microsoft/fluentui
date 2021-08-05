import { useBooleanKnob, useRangeKnob } from '@fluentui/docs-components';
import { Avatar, Chat, ChatMessageProps, ChatProps, MenuButton } from '@fluentui/react-northstar';
import * as React from 'react';
import {
  AddIcon,
  BanIcon,
  BookmarkIcon,
  BroadcastIcon,
  CalendarIcon,
  CloseIcon,
  EditIcon,
  LikeIcon,
  LockIcon,
  MoreIcon,
  StarIcon,
  ReplyIcon,
} from '@fluentui/react-icons-northstar';

const ChatExampleInScrollableShorthand = () => {
  const [actionCount, setActionCount] = useRangeKnob<number>({ name: 'actionCount', initialValue: 7, min: 1, max: 10 });
  const [overflow] = useBooleanKnob({ name: 'overflow', initialValue: true });
  const [height] = useRangeKnob({
    name: 'height',
    initialValue: '300px',
    min: '200px',
    max: '800px',
    step: 10,
  });
  const [width] = useRangeKnob({
    name: 'width',
    initialValue: '500px',
    min: '100px',
    max: '500px',
    step: 10,
  });

  const actionItems = [
    { key: 'add', icon: <AddIcon />, title: 'Add' },
    { key: 'ban', icon: <BanIcon />, title: 'Ban' },
    { key: 'bookmark', icon: <BookmarkIcon />, title: 'Bookmark' },
    { key: 'broadcast', icon: <BroadcastIcon />, title: 'Broadcast' },
    { key: 'calendar', icon: <CalendarIcon />, title: 'Calendar' },
    { key: 'like', icon: <LikeIcon />, title: 'Like' },
    { key: 'star', icon: <StarIcon />, title: 'Star' },
    { key: 'edit', icon: <EditIcon />, title: 'Edit' },
    { key: 'lock', icon: <LockIcon />, title: 'Lock' },
    {
      key: 'more',
      icon: <MoreIcon />,
      title: 'More actions',
      children: (Component, props) => (
        <MenuButton
          align="bottom"
          key="more"
          menu={[
            { key: 'reply', content: 'Reply', icon: <ReplyIcon /> },
            { key: 'edit', content: 'Edit', icon: <EditIcon /> },
            { key: 'save', content: 'Save message', icon: <BookmarkIcon /> },
            { key: 'delete', content: 'Delete', icon: <CloseIcon /> },
          ]}
          position="after"
          trigger={<Component {...props} />}
          {...(overflow && {
            flipBoundary: 'window',
            overflowBoundary: 'window',
          })}
        />
      ),
    },
  ];
  const actionMenu: ChatMessageProps['actionMenu'] = {
    iconOnly: true,
    items: actionItems.slice(-actionCount),
  };

  const items: ChatProps['items'] = [
    {
      attached: 'top',
      contentPosition: 'end',
      message: (
        <Chat.Message
          actionMenu={actionMenu}
          author="Cecil Folk"
          content="Hello"
          mine
          timestamp="Yesterday, 10:15 PM"
          unstable_overflow={overflow}
        />
      ),
      key: 'message-1',
    },
    {
      attached: 'bottom',
      contentPosition: 'end',
      key: 'message-2',
      message: (
        <Chat.Message
          actionMenu={actionMenu}
          author="Cecil Folk"
          content="I'm back!"
          mine
          timestamp="Yesterday, 10:15 PM"
          unstable_overflow={overflow}
        />
      ),
    },
    {
      gutter: <Avatar image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg" />,
      message: (
        <Chat.Message
          actionMenu={actionMenu}
          author="Robin Counts"
          content="Hi"
          timestamp="Yesterday, 10:15 PM"
          unstable_overflow={overflow}
        />
      ),
      key: 'message-3',
    },
    {
      attached: true,
      message: (
        <Chat.Message
          actionMenu={actionMenu}
          author="Robin Counts"
          content="How are you?"
          timestamp="Yesterday, 10:15 PM"
          unstable_overflow={overflow}
        />
      ),
      key: 'message-4',
    },
    {
      attached: 'bottom',
      message: (
        <Chat.Message
          actionMenu={actionMenu}
          author="Robin Counts"
          content="Do you want something?"
          timestamp="Yesterday, 10:15 PM"
          unstable_overflow={overflow}
        />
      ),
      key: 'message-5',
    },
    {
      attached: 'top',
      contentPosition: 'end',
      message: (
        <Chat.Message
          actionMenu={actionMenu}
          author="Robin Counts"
          content="Yes"
          mine
          timestamp="Yesterday, 10:16 PM"
          unstable_overflow={overflow}
        />
      ),
      key: 'message-6',
    },
    {
      attached: 'bottom',
      contentPosition: 'end',
      key: 'message-7',
      message: (
        <Chat.Message
          actionMenu={actionMenu}
          author="Cecil Folk"
          content={
            <>
              Please order a{' '}
              <span aria-label="pizza" role="img">
                🍕
              </span>{' '}
              for me
            </>
          }
          mine
          timestamp="Yesterday, 10:16 PM"
          unstable_overflow={overflow}
        />
      ),
    },
    {
      message: (
        <Chat.Message
          actionMenu={actionMenu}
          author="Robin Counts"
          content="Pepperoni?"
          timestamp="Yesterday, 10:17 PM"
          unstable_overflow={overflow}
        />
      ),
      key: 'message-8',
    },
  ];

  return (
    <>
      <div style={{ height, width, overflow: 'scroll', margin: 150, marginBottom: 0, marginLeft: 50 }}>
        <Chat items={items} styles={{ minHeight: '100%' }} />
      </div>

      <button id="actions-to-max" onClick={() => setActionCount(actionItems.length)}>
        Set action count to max
      </button>
    </>
  );
};

export default ChatExampleInScrollableShorthand;
