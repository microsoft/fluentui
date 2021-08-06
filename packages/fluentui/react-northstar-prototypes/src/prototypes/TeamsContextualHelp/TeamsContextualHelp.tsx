import * as React from 'react';
import { Provider, teamsTheme, Header } from '@fluentui/react-northstar';
import ContextualHelpDialog from './ContextualHelpDialog';

const TeamsContextualHelp: React.FunctionComponent = () => {
  return (
    <Provider theme={teamsTheme}>
      <Header as="h1" content="Teams Contextual Help Prototype" />
      <ContextualHelpDialog defaultPanel="chatsList" triggerText="Open chats list help" />
      <ContextualHelpDialog defaultPanel="messagesList" triggerText="Open messages list help" />
      <ContextualHelpDialog defaultPanel="composeField" triggerText="Open message compose field help" />
      <ContextualHelpDialog defaultPanel="global" triggerText="Open global keyboard shortcuts help" />
    </Provider>
  );
}; // End TeamsContextualHelp

export default TeamsContextualHelp;
