import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, DrawerOverlay } from '@fluentui/react-drawer';
import { Button, Label, useId, tokens, makeStyles, Input } from '@fluentui/react-components';
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
  const labelId = useId('size-label');
  const inputId = useId('custom-size-label');

  const [open, setOpen] = React.useState(false);
  const [customSize, setCustomSize] = React.useState(600);

  return (
    <div>
      <DrawerOverlay
        open={open}
        position="right"
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
      </DrawerOverlay>

      <div className={styles.main}>
        <Button appearance="primary" onClick={() => setOpen(true)}>
          Toggle Drawer
        </Button>

        <div className={styles.field}>
          <Label id={labelId}>Size</Label>
          <Input
            pattern="[0-9]*"
            value={customSize.toString()}
            onChange={(_, data) => setCustomSize(data.value ? parseInt(data.value, 10) : 0)}
            id={inputId}
          />
        </div>
      </div>
    </div>
  );
};
