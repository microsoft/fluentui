import { useBooleanKnob, useRangeKnob } from '@fluentui/docs-components';
import { Avatar, Chat, ChatMessageProps, ChatProps, MenuButton } from '@fluentui/react-northstar';
import * as React from 'react';

const ChatExampleInScrollableShorthand = () => {
  const [actionCount] = useRangeKnob({ name: 'actionCount', initialValue: 7, min: 1, max: 10 });
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
    { key: 'add', icon: 'add', title: 'Add' },
    { key: 'ban', icon: 'ban', title: 'Ban' },
    { key: 'bookmark', icon: 'bookmark', title: 'Bookmark' },
    { key: 'broadcast', icon: 'broadcast', title: 'Broadcast' },
    { key: 'calendar', icon: 'calendar', title: 'Calendar' },
    { key: 'like', icon: 'like', title: 'Like' },
    { key: 'star', icon: 'star', title: 'Star' },
    { key: 'edit', icon: 'edit', title: 'Edit' },
    { key: 'lock', icon: 'lock', title: 'Lock' },
    {
      key: 'more',
      icon: 'more',
      title: 'More actions',
      children: (Component, props) => (
        <MenuButton
          menu={[
            { key: 'reply', content: 'Reply', icon: 'reply' },
            { key: 'edit', content: 'Edit', icon: 'edit' },
            { key: 'save', content: 'Save message', icon: 'bookmark' },
            { key: 'delete', content: 'Delete', icon: 'icon-close' },
          ]}
          position="above"
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
          author="John Doe"
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
          author="John Doe"
          content="I'm back!"
          mine
          timestamp="Yesterday, 10:15 PM"
          unstable_overflow={overflow}
        />
      ),
    },
    {
      gutter: <Avatar image="public/images/avatar/small/ade.jpg" />,
      message: (
        <Chat.Message
          actionMenu={actionMenu}
          author="Jane Doe"
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
          author="Jane Doe"
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
          author="Jane Doe"
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
          author="Jane Doe"
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
          author="John Doe"
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
          author="Jane Doe"
          content="Pepperoni?"
          timestamp="Yesterday, 10:17 PM"
          unstable_overflow={overflow}
        />
      ),
      key: 'message-8',
    },
  ];

  return (
    <div style={{ height, width, overflow: 'scroll', margin: 150, marginLeft: 0 }}>
      <Chat items={items} styles={{ minHeight: '100%' }} />
    </div>
  );
};

export default ChatExampleInScrollableShorthand;
