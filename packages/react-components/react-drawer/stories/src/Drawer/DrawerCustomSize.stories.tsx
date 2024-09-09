import * as React from 'react';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
  Field,
  tokens,
  makeStyles,
  Input,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  main: {
    display: 'grid',
    justifyContent: 'flex-start',
    gridRowGap: tokens.spacingVerticalXXL,
  },

  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

export const CustomSize = () => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const [customSize, setCustomSize] = React.useState(600);

  return (
    <div>
      <OverlayDrawer
        open={open}
        position="end"
        onOpenChange={(_, state) => setOpen(state.open)}
        style={{ width: `${customSize}px` }}
      >
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
            Drawer with {customSize}px size
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>

      <div className={styles.main}>
        <Button appearance="primary" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>

        <div className={styles.field}>
          <Field label="Size">
            <Input
              pattern="[0-9]*"
              value={customSize.toString()}
              onChange={(_, data) => setCustomSize(data.value ? parseInt(data.value, 10) : 0)}
            />
          </Field>
        </div>
      </div>
    </div>
  );
};

CustomSize.parameters = {
  docs: {
    description: {
      story: 'The Drawer can be sized to any custom width, by overriding the `width` style property.',
    },
  },
};
