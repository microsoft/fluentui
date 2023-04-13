import * as React from 'react';
import { Drawer } from '@fluentui/react-drawer';
import { Button } from '@fluentui/react-components';

export const Default = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Drawer position="left" open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
        <Button appearance="outline" onClick={() => setIsOpen(false)}>
          Close
        </Button>

        <p>Drawer content</p>
      </Drawer>

      <Button appearance="primary" onClick={() => setIsOpen(true)}>
        Toggle
      </Button>
    </div>
  );
};
