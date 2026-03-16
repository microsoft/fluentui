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
  Label,
  RadioGroup,
  Radio,
  useId,
  tokens,
  makeStyles,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import story from './DialogBackdropAppearance.md';

const useStyles = makeStyles({
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalL,
  },
});

type BackdropAppearanceOption = 'dimmed' | 'transparent';

export const BackdropAppearance = (): JSXElement => {
  const styles = useStyles();
  const labelId = useId('backdrop-appearance-label');

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [backdropAppearance, setBackdropAppearance] = React.useState<BackdropAppearanceOption>();
  const backdropProp = backdropAppearance ? { appearance: backdropAppearance } : undefined;

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
          <div className={styles.field}>
            <Label id={labelId}>Backdrop appearance</Label>
            <RadioGroup
              value={backdropAppearance}
              onChange={(_, data) => setBackdropAppearance(data.value as BackdropAppearanceOption)}
              aria-labelledby={labelId}
            >
              <Radio value="dimmed" label="Dimmed" />
              <Radio value="transparent" label="Transparent" />
            </RadioGroup>
          </div>

          <Dialog>
            <DialogTrigger disableButtonEnhancement>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogSurface backdrop={backdropProp}>
              <DialogBody>
                <DialogTitle>Dialog</DialogTitle>
                <DialogContent>
                  This Dialog is rendered inside an OverlayDrawer, which internally uses Dialog. By default, nested
                  dialogs have a backdrop applied based on inner context. Use the <code>backdrop</code> prop to override
                  this behavior.
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
