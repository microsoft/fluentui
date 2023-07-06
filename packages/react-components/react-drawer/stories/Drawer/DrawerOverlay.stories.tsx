import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, DrawerOverlay } from '@fluentui/react-drawer';
import { Button } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const Overlay = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <DrawerOverlay open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
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
      </DrawerOverlay>

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
        'DrawerOverlay contains supplementary content and are used for complex creation, edit, or management experiences.',
        'For example, viewing details about an item in a list or editing settings.',
        'By default, drawer is blocking and signifies that the users full attention is required when making configurations.',
      ].join('\n'),
    },
  },
};
