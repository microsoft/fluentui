/*
TODO:
 * Should we read the instruction message when navigated into tab list?
*/

import * as React from 'react';
import { EventListener } from '@fluentui/react-component-event-listener';
import { Header, Button, Dialog, Box, Text, Table, List } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const tablistInstruction = 'To navigate use the arrow keys';

let timeout;
const narrate = (message, priority = 'polite') => {
  const element = document.createElement('div');
  element.setAttribute(
    'style',
    'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;',
  );
  element.setAttribute('aria-live', priority);
  document.body.appendChild(element);

  timeout = setTimeout(() => {
    element.innerText = message;
  }, 1000); // End setTimeout 1

  setTimeout(() => {
    document.body.removeChild(element);
  }, 1300); // End setTimeout 1
}; // End narrate

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
  defaultPanel: string;
  triggerText: string;
}

const ContextualHelpDialog: React.FunctionComponent<ContextualHelpDialogProps> = (props: ContextualHelpDialogProps) => {
  const { defaultPanel, triggerText } = props;

  const [panel, setPanel] = React.useState(defaultPanel);
  const [tabs, setTabs] = React.useState<HTMLElement[]>(null);
  const [focusedTabIndex, setFocusedTabIndex] = React.useState(0);

  const handleKeyDown = React.useCallback(
    event => {
      if (tabs === null) {
        // Begin if 1
        return;
      } // End if 1
      switch (
        event.code // Begin switch 1
      ) {
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'ArrowDown':
          // Set tabindex="-1" on the previously focused tab
          tabs[focusedTabIndex].setAttribute('tabindex', '-1');

          // Compute and set the new focused item index
          setFocusedTabIndex(prevIndex => {
            const tempIndex = prevIndex + (['ArrowRight', 'ArrowDown'].includes(event.code) ? 1 : -1);
            const newIndex = tempIndex >= tabs.length ? 0 : tempIndex < 0 ? tabs.length - 1 : tempIndex;

            // Set tabindex="0" on the newly focused tab and focus it
            tabs[newIndex].setAttribute('tabindex', '0');
            tabs[newIndex].focus();
            return newIndex;
          });
          break;
        default:
          break;
      } // End switch 1
    },
    [tabs, focusedTabIndex],
  ); // End handleKeyDown

  const handleTablistFocus = React.useCallback(event => {
    // If focus moves into the tablist from the outside...
    if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) {
      // Begin if 1
      // Narrate the instruction message
      const instruction = event.currentTarget.getAttribute('data-instruction');
      narrate(instruction);

      // Determine and save the current tabs
      const newTabs = event.currentTarget.querySelectorAll('[role="tab"]');
      setTabs(newTabs);

      // Find the tab with tabindex="0" and set the focused tab index accordingly
      Array.from(newTabs).forEach((tab: HTMLElement, index) => {
        // Begin forEach 1
        const tabindex = tab.getAttribute('tabindex');
        if (tabindex === '0') {
          // Begin if 2
          setFocusedTabIndex(index);
        } // End if 2
      }); // End forEach 1
    } // End if 1
  }, []); // End handleTablistFocus

  const handleTablistBlur = React.useCallback(event => {
    // If focus moves into the outside of the tablist, clear the timeout and reset tabs
    if (!event.currentTarget.contains(event.relatedTarget)) {
      // Begin if 1
      clearTimeout(timeout);
      setTabs(null);
    } // End if 1
  }, []); // End handleTablistBlur

  const handleTabClick = React.useCallback(panelName => {
    setPanel(panelName);
  }, []); // End handleTabClick

  const [dialogOpened, setDialogOpened] = React.useState(false);

  const panels = {
    chatsList: (
      <Box id="chatsList-tabpanel">
        <Header as="h3" tabIndex={0} content="Contextual help for chats list" />
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
      </Box>
    ),
    messagesList: (
      <Box id="messagesList-tabpanel">
        <Header as="h3" tabIndex={0} content="Contextual help for messages list" />
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
      </Box>
    ),
    composeField: (
      <Box id="composeField-tabpanel">
        <Header as="h3" tabIndex={0} content="Contextual help for message compose field" />
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
      </Box>
    ),
    global: (
      <Box id="global-tabpanel">
        <Text tabIndex={0}>Keyboard language is: English (United States).</Text>

        <Header as="h3" content="Global keyboard shortcuts" />
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
      </Box>
    ),
  };

  return (
    <>
      <EventListener type="keydown" listener={handleKeyDown} target={document} />

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
          <Box>
            <Box>
              <Box
                role="tablist"
                aria-label="Choose keyboard shortcuts help context"
                data-instruction={tablistInstruction}
                onFocus={handleTablistFocus}
                onBlur={handleTablistBlur}
              >
                <Button
                  className="first-focusable"
                  role="tab"
                  tabIndex={panel === 'chatsList' ? 0 : -1}
                  aria-selected={panel === 'chatsList' ? 'true' : 'false'}
                  aria-controls="chatsList-tabpanel"
                  content="Chats list"
                  onClick={() => handleTabClick('chatsList')}
                />
                <Button
                  role="tab"
                  tabIndex={panel === 'messagesList' ? 0 : -1}
                  aria-selected={panel === 'messagesList' ? 'true' : 'false'}
                  aria-controls="messagesList-tabpanel"
                  content="Messages list"
                  onClick={() => handleTabClick('messagesList')}
                />
                <Button
                  role="tab"
                  tabIndex={panel === 'composeField' ? 0 : -1}
                  aria-selected={panel === 'composeField' ? 'true' : 'false'}
                  aria-controls="composeField-tabpanel"
                  content="Message compose field"
                  onClick={() => handleTabClick('composeField')}
                />
                <Button
                  role="tab"
                  tabIndex={panel === 'global' ? 0 : -1}
                  aria-selected={panel === 'global' ? 'true' : 'false'}
                  aria-controls="global-tabpanel"
                  content="Global"
                  onClick={() => handleTabClick('global')}
                />
              </Box>
            </Box>
            <Box>{panels[panel]}</Box>
          </Box>
        }
      />
    </>
  );
}; // End ContextualHelpDialog

export default ContextualHelpDialog;
