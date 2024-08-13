import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, OverlayDrawer, Button } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const OverlayNoModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <OverlayDrawer modalType="non-modal" open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Overlay Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>

      <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </Button>
    </div>
  );
};

OverlayNoModal.parameters = {
  docs: {
    description: {
      story: [
        "An overlay is optional depending on whether or not interacting with the background content is beneficial to the user's context/scenario.",
        'By setting the `modalType` prop to `non-modal`, the Drawer will not be blocking and the user can interact with the background content.',
      ].join('\n'),
    },
  },
};
