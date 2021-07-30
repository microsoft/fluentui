import * as React from 'react';
import { Provider, teamsTheme, Header, Button, Dialog, Text, Table } from '@fluentui/react-northstar';
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

const TeamsContextualHelp: React.FunctionComponent = () => {
  const [dialogOpened, setDialogOpened] = React.useState(false);

  return (
    <Provider theme={teamsTheme}>
      <div>
        <Header content="Microsoft Teams Keyboard Shortcuts Dialog Prototype" />
        <div>
          <Dialog
            trapFocus={{ firstFocusableSelector: '#first-text' }}
            open={dialogOpened}
            onOpen={() => setDialogOpened(true)}
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
            trigger={<Button content="Open keyboard shortcuts dialog" />}
            content={
              <div role="document">
                <Text id="first-text" tabIndex={0}>
                  Keyboard language is: English (United States).
                </Text>

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
              </div>
            }
          />
        </div>
      </div>
    </Provider>
  );
}; // End TeamsContextualHelp

export default TeamsContextualHelp;
