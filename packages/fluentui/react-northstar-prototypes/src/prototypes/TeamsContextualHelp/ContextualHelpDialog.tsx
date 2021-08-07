/*
TODO:
* How to implement aria-controls for the tabs?
*/
import * as React from 'react';
import { Header, Button, Dialog, Box, Text, Table, List, Menu, tabListBehavior } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const tabItems = [
  { key: 'chatsList', content: 'Chats list' },
  { key: 'messagesList', content: 'Messages list' },
  { key: 'composeField', content: 'Message compose field' },
  { key: 'global', content: 'Global shortcuts' },
];

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

interface ContextualHelpDialogProps {
  defaultPanel: number;
  triggerText: string;
}

const ContextualHelpDialog: React.FunctionComponent<ContextualHelpDialogProps> = (props: ContextualHelpDialogProps) => {
  const { defaultPanel, triggerText } = props;

  const [panel, setPanel] = React.useState(defaultPanel);
  const [dialogOpened, setDialogOpened] = React.useState(false);

  const panels = [
    <Box id="chatsList-tabpanel">
      <Header as="h3" tabIndex={0} content="Help for chats list" />
      <Header as="h4" content="Navigation" />
      <List>
        <List.Item
          index={0}
          content="To move to the compose field, press Enter, or Alt + Shift + C, or Ctrl + Shift + R."
        />
        <List.Item index={1} content="To Move to the messages list for the currently selected chat, press Space bar." />
      </List>
    </Box>,
    <Box id="messagesList-tabpanel">
      <Header as="h3" tabIndex={0} content="Help for messages list" />
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
    </Box>,
    <Box id="composeField-tabpanel">
      <Header as="h3" tabIndex={0} content="Help for message compose field" />
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
    </Box>,
    <Box id="global-tabpanel">
      <Header as="h3" tabIndex={0} content="Global keyboard shortcuts" />
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
    </Box>,
  ];

  return (
    <>
      <Dialog
        /* trapFocus={{ firstFocusableSelector: '.first-focusable' }} */
        open={dialogOpened}
        onOpen={() => {
          setDialogOpened(true);
          setPanel(defaultPanel);
        }}
        onCancel={() => setDialogOpened(false)}
        header="Keyboard shortcuts help"
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
            <Menu
              defaultActiveIndex={defaultPanel}
              items={tabItems}
              primary
              underlined
              accessibility={tabListBehavior}
              aria-label="Choose keyboard shortcuts help context"
              onItemClick={(event, props) => {
                setPanel(props.index);
              }}
            />

            <Box>{panels[panel]}</Box>
          </>
        }
      />
    </>
  );
}; // End ContextualHelpDialog

export default ContextualHelpDialog;
