import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Button,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const PreventClose = (): JSXElement => {
  const [open, setOpen] = React.useState(false);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer {...restoreFocusSourceAttributes} position="end" open={open} modalType="alert">
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            Prevent close with Esc or outside click
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>This drawer cannot be closed when clicking outside nor using the "ESC" key</p>
        </DrawerBody>
      </OverlayDrawer>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
    </div>
  );
};

PreventClose.parameters = {
  docs: {
    description: {
      story: [
        'By setting the `modalType` prop to `alert` and not providing an onOpenChange handler, the Drawer will not be closable by clicking outside nor using the "ESC" key.',
        'This is useful for scenarios where the user must interact with the Drawer before continuing, when opening a Drawer is a critical action or when multiple Drawers are open at the same time.',
      ].join('\n'),
    },
  },
};
