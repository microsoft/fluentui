import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, OverlayDrawer, Button } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const Overlay = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <OverlayDrawer as="aside" open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
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

      <Button appearance="primary" onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
    </div>
  );
};

Overlay.parameters = {
  docs: {
    description: {
      story: [
        'OverlayDrawer contains supplementary content and is used for complex creation, edit, or management experiences.',
        'For example, viewing details about an item in a list or editing settings.',
        "By default, drawer is blocking and signifies that the user's full attention is required when making configurations.",
      ].join('\n'),
    },
  },
};
