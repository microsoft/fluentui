import * as React from 'react';
import { Header, Button, Dialog, Text, Table, List, Accordion, Menu } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

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
    title: 'Chats list',
    content: (
      <>
        <Header as="h4" content="Navigation" />
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
    title: 'Messages list',
    content: (
      <>
        <Header as="h4" content="Navigation" />
        <List>
          <List.Item index={0} content="To move to the compose field, press Alt + Shift + C, or Ctrl + Shift + R." />
          <List.Item index={1} content="To move to the chats list, press Escape, or Ctrl + L." />
        </List>

        <Header as="h4" content="Interaction" />
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
    title: 'Message compose field',
    content: (
      <>
        <Header as="h4" content="Navigation" />
        <List>
          <List.Item index={0} content="To move to the messages list, press Escape." />
          <List.Item index={1} content="To move to the chats list, press Ctrl + L." />
        </List>

        <Header as="h4" content="Interaction" />
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
    title: 'Global keyboard shortcuts',
    content: (
      <>
        <Text>Keyboard language is: English (United States).</Text>
        <Header as="h4" content="General" />
        <Table header={tableHeader} rows={generalTableRows} />

        <Header as="h4" content="Navigation" />
        <Table header={tableHeader} rows={generalTableRows} />

        <Header as="h4" content="Messaging" />
        <Table header={tableHeader} rows={generalTableRows} />

        <Header as="h4" content="Meetings, Calls and Calendar" />
        <Table header={tableHeader} rows={generalTableRows} />

        <Header as="h4" content="Debug" />
        <Table header={tableHeader} rows={generalTableRows} />
      </>
    ),
  },
]; // End panels

const menuItems = [
  { key: 'chatsList', content: 'Chats list' },
  { key: 'messagesList', content: 'Messages list' },
  { key: 'composeField', content: 'Message compose field' },
  { key: 'global', content: 'Global keyboard shortcuts' },
]; // End menuItems

interface ContextualHelpDialogProps {
  defaultPanelIndex: number;
  triggerText: string;
}

const ContextualHelpDialog: React.FunctionComponent<ContextualHelpDialogProps> = (props: ContextualHelpDialogProps) => {
  const { defaultPanelIndex, triggerText } = props;

  //const [panelIndex, setPanelIndex] = React.useState(defaultPanelIndex);
  const [dialogOpened, setDialogOpened] = React.useState(false);

  return (
    <>
      <Dialog
        trapFocus={{ firstFocusableSelector: '[data-aa-class="AccordionTitle__content]"' }}
        open={dialogOpened}
        onOpen={() => {
          setDialogOpened(true);
          //setPanelIndex(defaultPanelIndex);
        }}
        onCancel={() => setDialogOpened(false)}
        header="Keyboard shortcuts help"
        headerAction={{ icon: <CloseIcon />, title: 'Close', onClick: () => setDialogOpened(false) }}
        footer={{
          children: (Component, props) => (
            <>
              <Menu
                defaultActiveIndex={defaultPanelIndex}
                items={menuItems}
                primary
                underlined
                aria-label="Choose keyboard shortcuts help context"
                onItemClick={(event, props) => {
                  //setPanelIndex(props.index);
                }}
              />
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
            <Accordion exclusive={true} defaultActiveIndex={defaultPanelIndex} panels={panels} />
          </>
        }
      />
    </>
  );
}; // End ContextualHelpDialog

export default ContextualHelpDialog;
