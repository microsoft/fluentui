import * as React from 'react';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger, useId } from '@fluentui/react-components';
import type { PopoverProps } from '@fluentui/react-components';

const id = useId();

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

export const Default = (props: PopoverProps) => (
  <Popover {...props}>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    <PopoverSurface id={id} aria-labelledby={id}>
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);
