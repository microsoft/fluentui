import * as React from 'react';
import { DrawerOverlay, DrawerBody, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-drawer';
import { Button } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const PreventClose = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <DrawerOverlay position="right" open={open} modalType="alert">
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            Prevent close with Esc or outside click
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>This drawer cannot be closed when clicking outside nor using the "ESC" key</p>
        </DrawerBody>
      </DrawerOverlay>

      <Button appearance="primary" onClick={() => setOpen(true)}>
        Toggle
      </Button>
    </div>
  );
};
