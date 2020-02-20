import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react'
import * as React from 'react'

const actionMenu = {
  iconOnly: true,
  items: [
    { key: 'like', icon: 'like', title: 'Like' },
    { key: 'more', icon: 'more', title: 'More actions' },
  ],
}

const items: ShorthandCollection<ChatItemProps> = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: (
      <Chat.Message
        actionMenu={actionMenu}
        content="Hello"
        author="John Doe"
        timestamp="Yesterday, 10:15 PM"
        mine
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
        content="I'm back!"
        author="John Doe"
        timestamp="Yesterday, 10:15 PM"
        mine
      />
    ),
  },
  {
    gutter: <Avatar image="public/images/avatar/small/ade.jpg" />,
    message: (
      <Chat.Message
        actionMenu={actionMenu}
        content="Hi"
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
      />
    ),
    key: 'message-3',
  },
]

const ChatExample = () => <Chat items={items} />

export default ChatExample
