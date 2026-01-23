import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Button,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import story from './DialogBackdropAppearance.md';

export const BackdropAppearance = (): JSXElement => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <Button appearance="primary" onClick={() => setDrawerOpen(true)}>
        Open Drawer
      </Button>

      <OverlayDrawer open={drawerOpen} onOpenChange={(_, { open }) => setDrawerOpen(open)}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setDrawerOpen(false)}
              />
            }
          >
            Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <p>When you open a Dialog from here, it will show a dimmed backdrop.</p>
          <p>
            Without{' '}
            <code>
              backdrop={'{{'} appearance: &quot;dimmed&quot; {'}}'}
            </code>
            , the backdrop would be transparent since this Dialog is nested inside the Drawer (which internally uses
            Dialog).
          </p>
          <Dialog>
            <DialogTrigger disableButtonEnhancement>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogSurface backdrop={{ appearance: 'dimmed' }}>
              <DialogBody>
                <DialogTitle>Dialog with dimmed backdrop</DialogTitle>
                <DialogContent>
                  This dialog uses backdrop appearance on DialogSurface to force a dimmed backdrop, even though it's
                  rendered inside the OverlayDrawer component.
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="primary">Close</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </DrawerBody>
      </OverlayDrawer>
    </>
  );
};

BackdropAppearance.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
