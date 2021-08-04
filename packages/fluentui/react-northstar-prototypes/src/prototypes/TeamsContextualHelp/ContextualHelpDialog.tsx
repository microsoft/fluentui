/*
TODO:
* How to automatically switch to the application mode when tabbing into tab?
 * Should we read the instruction message when navigated into tab list?
*/

import * as React from 'react';
import { EventListener } from '@fluentui/react-component-event-listener';
import { Header, Button, Dialog, Box, Text, Table } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const tablistInstruction = 'To navigate use the Left and Right arrow keys';

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
          // Set tabindex="-1" on the previously focused tab
          tabs[focusedTabIndex].setAttribute('tabindex', '-1');

          // Compute and set the new focused item index
          setFocusedTabIndex(prevIndex => {
            const tempIndex = prevIndex + (['ArrowRight'].includes(event.code) ? 1 : -1);
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
      // const instruction = event.currentTarget.getAttribute('data-instruction');
      // narrate(instruction);
      narrate('');

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
    chatsList: <Text tabIndex={0}>This is the chats panel.</Text>,
    messagesList: <Text tabIndex={0}>This is the messages panel.</Text>,

    global: (
      <Box id="global-tabpanel">
        <Text tabIndex={0}>Keyboard language is: English (United States).</Text>

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
      </Box>
    ),
  };

  return (
    <>
      <EventListener type="keydown" listener={handleKeyDown} target={document} />

      <Dialog
        trapFocus={{ firstFocusableSelector: '.first-focusable' }}
        open={dialogOpened}
        onOpen={() => {
          setDialogOpened(true);
          setPanel(defaultPanel);
        }}
        onCancel={() => setDialogOpened(false)}
        header="Keyboard shortcuts"
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
                aria-label="Keyboard shortcuts context"
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
