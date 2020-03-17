import { Button, Dialog } from '@fluentui/react-future';
import * as React from 'react';

const DialogExample: React.FC = () => (
  <Dialog cancelButton="Cancel" confirmButton="Confirm" header="Action confirmation" trigger={<Button content="Open a dialog" />} />
);

export default DialogExample;
