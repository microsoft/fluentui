import { Button, Dialog } from '@fluentui/react-northstar';
import * as React from 'react';

const DialogExampleContent: React.FC = () => (
  <Dialog
    cancelButton="Cancel"
    confirmButton="Confirm"
    content="Are you sure you want to confirm this action?"
    header="Action confirmation"
    trigger={<Button content="Open a dialog" />}
  />
);

export default DialogExampleContent;
