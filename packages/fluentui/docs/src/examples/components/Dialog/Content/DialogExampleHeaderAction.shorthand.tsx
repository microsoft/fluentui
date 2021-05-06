import * as React from 'react';
import { Button, Dialog } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const DialogExampleHeaderAction: React.FC = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' });
  return (
    <Dialog
      open={open}
      onOpen={() => setOpen(true)}
      onCancel={() => setOpen(false)}
      onConfirm={() => setOpen(false)}
      confirmButton="Confirm"
      content="Are you sure you want to confirm this action?"
      header="Action confirmation"
      headerAction={{ icon: <CloseIcon />, title: 'Close', onClick: () => setOpen(false) }}
      trigger={<Button content="Open a dialog" />}
    />
  );
};

export default DialogExampleHeaderAction;
