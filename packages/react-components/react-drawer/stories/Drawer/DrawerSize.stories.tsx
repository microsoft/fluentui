import * as React from 'react';
import { Drawer, DrawerProps } from '@fluentui/react-drawer';
import { Button, Label, RadioGroup, Radio, useId, tokens, makeStyles } from '@fluentui/react-components';

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

export const Size = () => {
  const styles = useStyles();
  const labelId = useId('size-label');

  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState<DrawerProps['size']>('small');

  return (
    <div>
      <Drawer size={size} position="right" open={open} onOpenChange={(_, state) => setOpen(state.open)}>
        <Button appearance="outline" onClick={() => setOpen(false)}>
          Close
        </Button>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quod sint pariatur tempora assumenda
          fugit, veniam harum architecto quisquam iure laboriosam, eum hic rem ea provident magnam error. Eum, eveniet.
        </p>
      </Drawer>

      <div className={styles.main}>
        <Button appearance="primary" onClick={() => setOpen(true)}>
          Toggle Drawer
        </Button>

        <div className={styles.field}>
          <Label id={labelId}>Size</Label>
          <RadioGroup
            value={size}
            onChange={(_, data) => setSize(data.value as DrawerProps['size'])}
            aria-labelledby={labelId}
          >
            <Radio value="small" label="Small (Default)" />
            <Radio value="medium" label="Medium" />
            <Radio value="large" label="Large" />
            <Radio value="full" label="Full" />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
