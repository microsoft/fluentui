import * as React from 'react';

import ChatPaneLayout from './chatPaneLayout';
import { getChatMock } from './services';

const chatMock = getChatMock({ msgCount: 40, userCount: 6 });

export default () => <ChatPaneLayout chat={chatMock.chat} />;
