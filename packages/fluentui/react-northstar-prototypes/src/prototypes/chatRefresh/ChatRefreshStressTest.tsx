import * as React from 'react';
import { AcceptIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';

const items: ShorthandCollection<ChatItemProps> = [
  {
    unstable_layout: 'refresh',
    contentPosition: 'start',
    gutter: (
      <Avatar
        image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg"
        status={{ color: 'green', icon: <AcceptIcon /> }}
      />
    ),
    message: (
      <Chat.Message
        unstable_layout="refresh"
        content={`This is a really long message. It has a lot of content so that we can see how a chat message looks when it has a lot of content. You get the point? Lots of content to test lots of content. Here's even more content on top of the already long amount of content that we already had. This is a really long message. It has a lot of content so that we can see how a chat message looks when it has a lot of content. You get the point? Lots of content to test lots of content. Here's even more content on top of the already long amount of content that we already had. This is a really long message. It has a lot of content so that we can see how a chat message looks when it has a lot of content. You get the point? Lots of content to test lots of content. Here's even more content on top of the already long amount of content that we already had.`}
        author="Tim Deboer"
        timestamp="10:15 PM"
      />
    ),
    key: 'message-id-2',
  },
  {
    unstable_layout: 'refresh',
    contentPosition: 'end',
    message: (
      <Chat.Message
        unstable_layout="refresh"
        mine
        content={`contentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespacecontentwithnowhitespace`}
        author="Tim Deboer"
        timestamp="10:15 PM"
      />
    ),
    key: 'message-id-2',
  },
];

export const ChatRefreshStressTest = () => <Chat items={items} />;
