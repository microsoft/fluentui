import * as React from 'react';
import { Header, Button, Dialog, Breadcrumb, Text, Table, List, Accordion } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const dialogCSS: React.CSSProperties = {
  height: '90vh',
};

const srOnlyCSS: React.CSSProperties = {
  position: 'absolute',
  left: '-10000px',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
}; // End srOnlyCss

const navigateTo = (page, setPage, event) => {
  event.preventDefault();
  setPage(page);
}; // End navigateTo

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

const getPanels = count => [
  {
    key: 'chatsList',
    title: {
      as: 'h2',
      className: 'firstFocusable',
      tabIndex: -1,
      content: (
        <>
          <Text>Chats list</Text>
          <Text style={srOnlyCSS}>, 1 of {count}</Text>
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
          <Text style={srOnlyCSS}>, 2 of {count}</Text>
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
          <Text style={srOnlyCSS}>, 3 of {count}</Text>
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
          <Text style={srOnlyCSS}>, 4 of {count}</Text>
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
]; // End getPanels

const fourPanels = getPanels(4);
const panels1 = [fourPanels[0], fourPanels[1], fourPanels[2], fourPanels[3]]; // End panels1

const threePanels = getPanels(3);
const panels2 = [threePanels[0], threePanels[1], threePanels[2]]; // End panels2

interface ContextualHelpDialog1Props {
  defaultPanelIndex: number;
  triggerText: string;
}

export const ContextualHelpDialog1: React.FunctionComponent<ContextualHelpDialog1Props> = (
  props: ContextualHelpDialog1Props,
) => {
  const { defaultPanelIndex, triggerText } = props;

  const [dialogOpened, setDialogOpened] = React.useState(false);

  return (
    <Dialog
      style={dialogCSS}
      trapFocus={{ firstFocusableSelector: '[aria-expanded="true"][data-aa-class="AccordionTitle__content"]' }}
      open={dialogOpened}
      onOpen={() => {
        setDialogOpened(true);
      }}
      onCancel={() => {
        setDialogOpened(false);
      }}
      header={<Header as="h1" content="Chats keyboard help" />}
      headerAction={{
        icon: <CloseIcon />,
        title: 'Close',
        onClick: () => {
          setDialogOpened(false);
        },
      }}
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
      content={<Accordion panels={panels1} defaultActiveIndex={defaultPanelIndex} exclusive={true} />}
    />
  );
}; // End ContextualHelpDialog1

interface ContextualHelpDialog2Props {
  defaultPage: number | string;
  triggerText: string;
}

export const ContextualHelpDialog2: React.FunctionComponent<ContextualHelpDialog2Props> = (
  props: ContextualHelpDialog2Props,
) => {
  const { defaultPage, triggerText } = props;

  const [dialogOpened, setDialogOpened] = React.useState(false);
  const [page, setPage] = React.useState('contexts');

  React.useEffect(() => {
    if (typeof defaultPage === 'string') {
      setPage(defaultPage);
    }
  }, [defaultPage]); // End useEffect

  React.useEffect(() => {
    const first = document.querySelector('.firstFocusable');
    if (first) {
      (first as HTMLElement).focus();
    }
  }, [page]); // End useEffect

  let header;
  let content;
  if (page === 'shortcuts') {
    header = <Header as="h1" content="Keyboard shortcuts" className="firstFocusable" tabIndex={-1} />;
    content = fourPanels[3].content;
  } else if (page === 'contexts') {
    header = (
      <Breadcrumb aria-label="Breadcrumb">
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#shortcuts" onClick={event => navigateTo('shortcuts', setPage, event)}>
            Keyboard shortcuts
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item aria-current="page">Contextual keyboard help</Breadcrumb.Item>
      </Breadcrumb>
    );
    content = <Accordion panels={panels2} defaultActiveIndex={defaultPage as number} exclusive={true} />;
  }

  return (
    <Dialog
      style={dialogCSS}
      aria-labelledby=""
      aria-label="Keyboard shortcuts"
      trapFocus={{
        firstFocusableSelector:
          page === 'contexts' ? '[aria-expanded="true"][data-aa-class="AccordionTitle__content"]' : '.firstFocusable',
      }}
      open={dialogOpened}
      onOpen={() => {
        setDialogOpened(true);
      }}
      onCancel={() => {
        setDialogOpened(false);
      }}
      header={header}
      headerAction={{
        icon: <CloseIcon />,
        title: 'Close',
        onClick: () => {
          setDialogOpened(false);
        },
      }}
      footer={{
        children: (Component, props) => (
          <>
            <Text as="a" href="">
              See shortcuts for all platforms
            </Text>
            <Text as="a" href="">
              Office Accessibility Center
            </Text>
            {page === 'shortcuts' && (
              <Text as="a" href="#contexts" onClick={event => navigateTo('contexts', setPage, event)}>
                See chats contextual keyboard help
              </Text>
            )}
          </>
        ),
      }}
      trigger={<Button content={triggerText} />}
      content={content}
    />
  );
}; // End ContextualHelpDialog2

// export default ContextualHelpDialog;
