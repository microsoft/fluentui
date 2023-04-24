import * as React from 'react';
import { Drawer } from '@fluentui/react-drawer';
import { Button } from '@fluentui/react-components';

export const Position = () => {
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);

  return (
    <div>
      <Drawer position="left" open={leftOpen} onOpenChange={(_, { open }) => setLeftOpen(open)}>
        <Button appearance="outline" onClick={() => setLeftOpen(false)}>
          Close
        </Button>
        <p>Left Drawer</p>
      </Drawer>

      <Button appearance="primary" onClick={() => setLeftOpen(true)}>
        Toggle left
      </Button>

      <Button appearance="primary" onClick={() => setRightOpen(true)}>
        Toggle right
      </Button>

      <Drawer position="right" open={rightOpen} onOpenChange={(_, { open }) => setRightOpen(open)}>
        <Button appearance="outline" onClick={() => setRightOpen(false)}>
          Close
        </Button>
        <p>Right Drawer</p>
      </Drawer>
    </div>
  );
};
