import * as React from 'react';
import { Provider, teamsTheme, Header } from '@fluentui/react-northstar';
import ContextualHelpDialog from './ContextualHelpDialog';

const TeamsContextualHelp: React.FunctionComponent = () => {
  return (
    <Provider theme={teamsTheme}>
      <Header as="h1" content="Teams Contextual Help Prototype" />
      <ContextualHelpDialog defaultPanel="chatsList" triggerText="Open chats list help" />
      <ContextualHelpDialog defaultPanel="messagesList" triggerText="Open messages list help" />
    </Provider>
  );
}; // End TeamsContextualHelp

export default TeamsContextualHelp;
