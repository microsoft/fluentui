import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Button,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import story from './DialogNestedDialogs.md';

export const NestedDialogs = (): JSXElement => {
  const [outerOpen, setOuterOpen] = React.useState(false);
  const [innerOpen, setInnerOpen] = React.useState(false);

  // Focus restoration for outer dialog
  const outerRestoreFocusSourceAttributes = useRestoreFocusSource();
  const outerRestoreFocusTargetAttributes = useRestoreFocusTarget();

  // Focus restoration for inner dialog
  const innerRestoreFocusSourceAttributes = useRestoreFocusSource();
  const innerRestoreFocusTargetAttributes = useRestoreFocusTarget();

  return (
    <div>
      {/* Outer Dialog */}
      <Dialog open={outerOpen} onOpenChange={(event, data) => setOuterOpen(data.open)}>
        <Button {...outerRestoreFocusTargetAttributes} appearance="primary" onClick={() => setOuterOpen(true)}>
          Open Outer Dialog
        </Button>

        <DialogSurface {...outerRestoreFocusSourceAttributes}>
          <DialogBody>
            <DialogTitle>Outer Dialog</DialogTitle>
            <DialogContent>This is the outer dialog. Click the button below to open a nested dialog.</DialogContent>
            <DialogActions>
              <Button {...innerRestoreFocusTargetAttributes} appearance="primary" onClick={() => setInnerOpen(true)}>
                Open Inner Dialog
              </Button>
              <Button appearance="secondary" onClick={() => setOuterOpen(false)}>
                Close Outer Dialog
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Inner Dialog */}
      <Dialog open={innerOpen} onOpenChange={(event, data) => setInnerOpen(data.open)}>
        <DialogSurface {...innerRestoreFocusSourceAttributes}>
          <DialogBody>
            <DialogTitle>Inner Dialog</DialogTitle>
            <DialogContent>
              This is a nested dialog inside the outer dialog. Focus will be restored to the outer dialog when this one
              closes.
            </DialogContent>
            <DialogActions>
              <Button appearance="primary">Confirm</Button>
              <Button appearance="secondary" onClick={() => setInnerOpen(false)}>
                Close Inner Dialog
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

NestedDialogs.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
