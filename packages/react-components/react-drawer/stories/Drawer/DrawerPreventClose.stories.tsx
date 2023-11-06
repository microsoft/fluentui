import * as React from 'react';
import { OverlayDrawer, DrawerBody, DrawerHeader, DrawerHeaderTitle, Button } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const PreventClose = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <OverlayDrawer position="end" open={open} modalType="alert">
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
      </OverlayDrawer>

      <Button appearance="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
    </div>
  );
};

PreventClose.parameters = {
  docs: {
    description: {
      story: [
        'By setting the `modalType` prop to `alert` and not providing an onOpenChange handler, the Drawer will not be closable by clicking outside nor using the "ESC" key.',
        'This is useful for scenarios where the user must interact with the Drawer before continuing, when opening a Drawer is a critical action or when multiple Drawers are open at the same time.',
      ].join('\n'),
    },
  },
};
