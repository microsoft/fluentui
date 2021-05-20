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
    items: ['Show keyboard shortcuts', 'Ctrl+. (period)'],
  },
]; // End generalTableRows

const TeamsShortcutsDialog: React.FunctionComponent = () => {
  const [dialogOpened, setDialogOpened] = React.useState(false);

  return (
    <Provider theme={teamsTheme}>
      <div>
        <Header content="Microsoft Teams Keyboard Shortcuts Dialog Prototype" />
        <Dialog
          trapFocus={{ firstFocusableSelector: '#first-text' }}
          open={dialogOpened}
          onOpen={() => setDialogOpened(true)}
          onCancel={() => setDialogOpened(false)}
          header="Keyboard shortcuts"
          headerAction={{ icon: <CloseIcon />, title: 'Close dialog', onClick: () => setDialogOpened(false) }}
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
            <div>
              <Text id="first-text" tabIndex={-1}>
                Keyboard language is: English (United States).
              </Text>
              <Header as="h3" content="General" />
              <Table header={tableHeader} rows={generalTableRows} />
            </div>
          }
        />
      </div>
    </Provider>
  );
}; // End TeamsShortcutsDialog

export default TeamsShortcutsDialog;
