import * as React from 'react';
import { Header, Button, Dialog, Text, Table, List, Accordion } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const srOnlyCss: React.CSSProperties = {
  position: 'absolute',
  left: '-10000px',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
}; // End srOnlyCss

const tableHeader = {
  items: ['Action', 'Keys'],
}; // End tableHeader

const generalTableRows = [
  {
    key: 1,
    items: ['Start new chat', 'Ctrl+N'],
  },
  {
    key: 2,
    items: ['Pop out new chat', 'Ctrl+Shift+N'],
  },
  {
    key: 3,
    items: ['Open Settings', 'Ctrl+, (comma)'],
  },
  {
    key: 4,
    items: ['Open Help', 'F1'],
  },
  {
    key: 5,
    items: ['Close', 'Escape'],
  },
  {
    key: 6,
    items: ['Show keyboard shortcuts', 'Ctrl+. (period)'],
  },
  {
    key: 7,
    items: ['Go to Search', 'Ctrl+E'],
  },
  {
    key: 8,
    items: ['Show commands', 'Ctrl+/ (slash)'],
  },
]; // End generalTableRows

const panels = [
  {
    key: 'chatsList',
    title: {
      as: 'h2',
      content: (
        <>
          <Text>Chats list</Text>
          <Text style={srOnlyCss}>, 1 of 4</Text>
        </>
      ),
    },
    content: (
      <>
        <Header as="h3" content="Navigation" />
        <List>
          <List.Item
            index={0}
            content="To move to the compose field, press Enter, or Alt + Shift + C, or Ctrl + Shift + R."
          />
          <List.Item
            index={1}
            content="To Move to the messages list for the currently selected chat, press Space bar."
          />
        </List>
      </>
    ),
  },
  {
    key: 'messagesList',
    title: {
      as: 'h2',
      content: (
        <>
          <Text>Messages list</Text>
          <Text style={srOnlyCss}>, 2 of 4</Text>
        </>
      ),
    },
    content: (
      <>
        <Header as="h3" content="Navigation" />
        <List>
          <List.Item index={0} content="To move to the compose field, press Alt + Shift + C, or Ctrl + Shift + R." />
          <List.Item index={1} content="To move to the chats list, press Escape, or Ctrl + L." />
        </List>

        <Header as="h3" content="Interaction" />
        <List>
          <List.Item
            index={0}
            content="To react to a message, press Enter, then select the reaction (such as Like) using the Right or Left arrow keys.), and confirm with Enter."
          />
          <List.Item
            index={1}
            content="To reply to a message, press Shift + F10, then select Reply using the Down or Up arrow keys, and confirm with Enter."
          />
          <List.Item index={2} content="To copy a message, press Ctrl + C." />
        </List>
      </>
    ),
  },
  {
    key: 'composeField',
    title: {
      as: 'h2',
      content: (
        <>
          <Text>Message compose field</Text>
          <Text style={srOnlyCss}>, 3 of 4</Text>
        </>
      ),
    },
    content: (
      <>
        <Header as="h3" content="Navigation" />
        <List>
          <List.Item index={0} content="To move to the messages list, press Escape." />
          <List.Item index={1} content="To move to the chats list, press Ctrl + L." />
        </List>

        <Header as="h3" content="Interaction" />
        <List>
          <List.Item
            index={0}
            content="To attach a file, press Tab, then Right arrow key until you reach the Attach button, and confirm with Enter."
          />
          <List.Item index={1} content="" />
        </List>
      </>
    ),
  },
  {
    key: 'global',
    title: {
      as: 'h2',
      content: (
        <>
          <Text>Global keyboar shortcuts</Text>
          <Text style={srOnlyCss}>, 4 of 4</Text>
        </>
      ),
    },
    content: (
      <>
        <Text>Keyboard language is: English (United States).</Text>
        <Header as="h3" content="General" />
        <Table header={tableHeader} rows={generalTableRows} />

        <Header as="h3" content="Navigation" />
        <Table header={tableHeader} rows={generalTableRows} />

        <Header as="h3" content="Messaging" />
        <Table header={tableHeader} rows={generalTableRows} />

        <Header as="h3" content="Meetings, Calls and Calendar" />
        <Table header={tableHeader} rows={generalTableRows} />

        <Header as="h3" content="Debug" />
        <Table header={tableHeader} rows={generalTableRows} />
      </>
    ),
  },
]; // End panels

interface ContextualHelpDialogProps {
  defaultPanelIndex: number;
  triggerText: string;
}

const ContextualHelpDialog: React.FunctionComponent<ContextualHelpDialogProps> = (props: ContextualHelpDialogProps) => {
  const { defaultPanelIndex, triggerText } = props;

  const [dialogOpened, setDialogOpened] = React.useState(false);

  return (
    <>
      <Dialog
        trapFocus={{ firstFocusableSelector: '[data-aa-class="AccordionTitle__content"]' }}
        open={dialogOpened}
        onOpen={() => {
          setDialogOpened(true);
        }}
        onCancel={() => setDialogOpened(false)}
        header={<h1>Chats keyboard help</h1>}
        headerAction={{ icon: <CloseIcon />, title: 'Close', onClick: () => setDialogOpened(false) }}
        footer={{
          children: (Component, props) => (
            <>
              <Text as="a" href="">
                See shortcuts for all platforms
              </Text>
              <Text as="a" href="">
                Office Accessibility Center
              </Text>
            </>
          ),
        }}
        trigger={<Button content={triggerText} />}
        content={
          <>
            <Accordion panels={panels} defaultActiveIndex={defaultPanelIndex} exclusive={true} />
          </>
        }
      />
    </>
  );
}; // End ContextualHelpDialog

export default ContextualHelpDialog;
