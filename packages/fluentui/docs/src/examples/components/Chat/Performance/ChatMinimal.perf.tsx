import { Chat } from '@fluentui/react-future';
import * as React from 'react';

const ChatMinimalPerf = () => <Chat />;

ChatMinimalPerf.iterations = 5000;
ChatMinimalPerf.filename = 'ChatMinimal.perf.tsx';

export default ChatMinimalPerf;
