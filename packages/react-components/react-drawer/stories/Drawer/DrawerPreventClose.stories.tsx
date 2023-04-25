import * as React from 'react';
import { Drawer } from '@fluentui/react-drawer';
import { Button } from '@fluentui/react-components';

export const PreventClose = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Drawer position="right" open={open} lightDismiss={false}>
        <Button appearance="outline" onClick={() => setOpen(false)}>
          Close
        </Button>
        <p>This drawer cannot be closed when clicking outside nor using the "ESC" key</p>
      </Drawer>

      <Button appearance="primary" onClick={() => setOpen(true)}>
        Toggle
      </Button>
    </div>
  );
};
