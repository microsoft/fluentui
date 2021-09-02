import * as React from 'react';
import { Provider, teamsTheme, Header } from '@fluentui/react-northstar';
import { ContextualHelpDialog1, ContextualHelpDialog2 } from './ContextualHelpDialog';

const TeamsContextualHelp: React.FunctionComponent = () => {
  return (
    <Provider theme={teamsTheme}>
      <Header as="h1" content="Teams Contextual Help Prototypes" />
      <Header as="h2" content="Version 1" />
      <ContextualHelpDialog1 defaultPanelIndex={0} triggerText="Open chats list help" />
      <ContextualHelpDialog1 defaultPanelIndex={1} triggerText="Open messages list help" />
      <ContextualHelpDialog1 defaultPanelIndex={2} triggerText="Open message compose field help" />
      <ContextualHelpDialog1 defaultPanelIndex={3} triggerText="Open keyboard shortcuts help" />

      <Header as="h2" content="Version 2" />
      <ContextualHelpDialog2 defaultPage={0} triggerText="Open chats list help" />
      <ContextualHelpDialog2 defaultPage={1} triggerText="Open messages list help" />
      <ContextualHelpDialog2 defaultPage={2} triggerText="Open message compose field help" />
      <ContextualHelpDialog2 defaultPage="shortcuts" triggerText="Open keyboard shortcuts help" />
    </Provider>
  );
}; // End TeamsContextualHelp

export default TeamsContextualHelp;
