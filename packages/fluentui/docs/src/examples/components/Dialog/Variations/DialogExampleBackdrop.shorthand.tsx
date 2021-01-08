import { useBooleanKnob } from '@fluentui/docs-components';
import { Button, Dialog } from '@fluentui/react-northstar';
import * as React from 'react';

const DialogExampleBackdrop = () => {
  const [backdrop] = useBooleanKnob({ name: 'backdrop', initialValue: true });
  const [open, setOpen] = useBooleanKnob({ name: 'open' });

  return (
    <Dialog
      backdrop={backdrop}
      content={
        <>
          <p>
            <code>Dialog</code> has <code>backdrop={backdrop.toString()}</code> now.
          </p>
        </>
      }
      open={open}
      onOpen={() => setOpen(true)}
      trigger={<Button content="Open a dialog" />}
      cancelButton="Close Dialog"
      onCancel={() => setOpen(false)}
    />
  );
};

export default DialogExampleBackdrop;
