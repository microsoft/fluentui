import * as React from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerTitle } from '@fluentui/react-drawer';
import { Button } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const Default = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Drawer position="left" open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
        <DrawerHeader
          header={
            <DrawerTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsOpen(false)}
                />
              }
            >
              Title goes here
            </DrawerTitle>
          }
        />

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>

      <Button appearance="primary" onClick={() => setIsOpen(true)}>
        Toggle
      </Button>
    </div>
  );
};
