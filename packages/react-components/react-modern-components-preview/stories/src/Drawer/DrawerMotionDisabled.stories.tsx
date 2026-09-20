import * as React from 'react';
import { Button } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
} from '@fluentui/react-modern-components-preview/drawer';

export const MotionDisabled = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(value => !value)}>Toggle drawer</Button>
      <InlineDrawer open={open} surfaceMotion={null}>
        <DrawerHeader>
          <DrawerHeaderTitle>Drawer without motion</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>The surface appears and disappears without animation.</DrawerBody>
      </InlineDrawer>
    </>
  );
};

MotionDisabled.parameters = {
  docs: {
    description: {
      story: 'Set `surfaceMotion` to `null` to disable the Drawer animation.',
    },
  },
};
