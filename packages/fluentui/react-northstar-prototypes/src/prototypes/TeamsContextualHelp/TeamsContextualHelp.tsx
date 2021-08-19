import * as React from 'react';
import { Provider, teamsTheme, Header } from '@fluentui/react-northstar';
import ContextualHelpDialog from './ContextualHelpDialog';

const TeamsContextualHelp: React.FunctionComponent = () => {
  return (
    <Provider theme={teamsTheme}>
      <Header as="h1" content="Teams Contextual Help Prototype" />
      <ContextualHelpDialog defaultPanelIndex={0} triggerText="Open chats list help" />
      <ContextualHelpDialog defaultPanelIndex={1} triggerText="Open messages list help" />
      <ContextualHelpDialog defaultPanelIndex={2} triggerText="Open message compose field help" />
      <ContextualHelpDialog defaultPanelIndex={3} triggerText="Open global keyboard shortcuts help" />
    </Provider>
  );
}; // End TeamsContextualHelp

export default TeamsContextualHelp;
