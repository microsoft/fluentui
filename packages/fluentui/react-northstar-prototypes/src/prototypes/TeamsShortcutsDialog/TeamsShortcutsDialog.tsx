import * as React from 'react';
import { Provider, teamsTheme, Header, Button, Dialog, Text, Table } from '@fluentui/react-northstar';

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
          open={dialogOpened}
          onOpen={() => {
            setDialogOpened(true);
          }}
          onCancel={() => {
            setDialogOpened(false);
          }}
          header="Keyboard shortcuts"
          trigger={<Button content="Open keyboard shortcuts dialog" />}
          content={
            <div>
              <Button
                content="Close dialog"
                onClick={() => {
                  setDialogOpened(false);
                }}
              />
              <Text>Keyboard language is: English (United States).</Text>
              <Header as={'h3'} content="General" />
              <Table header={tableHeader} rows={generalTableRows} />
            </div>
          }
        />
      </div>
    </Provider>
  );
}; // End TeamsShortcutsDialog

export default TeamsShortcutsDialog;
