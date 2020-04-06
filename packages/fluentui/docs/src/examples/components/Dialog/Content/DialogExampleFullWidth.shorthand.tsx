import { Button, Dialog, Input } from '@fluentui/react-northstar';
import * as React from 'react';

const DialogExampleFullWidth: React.FC = () => (
  <Dialog
    cancelButton="Cancel"
    confirmButton="Confirm"
    content={<Input fluid />}
    header="Full width content"
    trigger={<Button content="Open a dialog" />}
  />
);

export default DialogExampleFullWidth;
