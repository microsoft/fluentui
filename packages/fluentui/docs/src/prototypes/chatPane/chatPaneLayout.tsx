import * as React from 'react';
import { Flex, Props } from '@fluentui/react-northstar';
import { ChatData } from './services';

import ChatPaneHeader from './chatPaneHeader';
import ChatPaneContainer from './chatPaneContent';
import ComposeMessage from './composeMessage';

const ChatPaneLayout: React.FunctionComponent<Props<{ chat: ChatData }>> = ({ chat }) => (
  <Flex
    fill
    column
    styles={{
      backgroundColor: '#f3f2f1',
      width: '50%',
      position: 'absolute',
    }}
  >
    <ChatPaneHeader chat={chat} />
    <ChatPaneContainer chat={chat} />
    <ComposeMessage style={{ padding: '16px 32px' }} />
  </Flex>
);

export default ChatPaneLayout;
