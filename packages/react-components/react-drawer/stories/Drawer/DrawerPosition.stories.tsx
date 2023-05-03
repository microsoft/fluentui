import * as React from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-drawer';
import { Button } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const Position = () => {
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);

  return (
    <div>
      <Drawer position="left" open={leftOpen} onOpenChange={(_, { open }) => setLeftOpen(open)}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setLeftOpen(false)}
              />
            }
          >
            Left Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>

      <Button appearance="primary" onClick={() => setLeftOpen(true)}>
        Toggle left
      </Button>

      <Button appearance="primary" onClick={() => setRightOpen(true)}>
        Toggle right
      </Button>

      <Drawer position="right" open={rightOpen} onOpenChange={(_, { open }) => setRightOpen(open)}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setRightOpen(false)}
              />
            }
          >
            Right Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>
    </div>
  );
};
