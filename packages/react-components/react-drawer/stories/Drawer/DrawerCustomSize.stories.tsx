import * as React from 'react';
import { Drawer } from '@fluentui/react-drawer';
import { Button, Label, useId, tokens, makeStyles, Input } from '@fluentui/react-components';

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
  const [customSize, setCustomSize] = React.useState(0);

  const drawerSize = React.useMemo(() => {
    if (!customSize) {
      return 'small';
    }

    return customSize;
  }, [customSize]);

  return (
    <div>
      <Drawer size={drawerSize} open={open} onOpenChange={(_, state) => setOpen(state.open)}>
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
