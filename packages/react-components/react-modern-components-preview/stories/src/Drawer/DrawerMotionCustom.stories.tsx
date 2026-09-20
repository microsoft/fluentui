import * as React from 'react';
import { Button } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
} from '@fluentui/react-modern-components-preview/drawer';
import { Slide } from '@fluentui/react-motion-components-preview';

export const MotionCustom = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(value => !value)}>Toggle drawer</Button>
      <InlineDrawer
        open={open}
        surfaceMotion={{
          children: (_, motionProps) => <Slide {...motionProps} duration={600} outX="-100%" />,
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle>Drawer with custom motion</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>The surface uses a custom Slide component.</DrawerBody>
      </InlineDrawer>
    </>
  );
};

MotionCustom.parameters = {
  docs: {
    description: {
      story: 'Customize Drawer animation through the `surfaceMotion` slot.',
    },
  },
};
