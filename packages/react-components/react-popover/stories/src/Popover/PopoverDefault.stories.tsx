import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PopoverProps } from '@fluentui/react-components';

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

// style={{ width: 1500, height: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
export const Default = (props: PopoverProps): JSXElement => (
  <div>
    <Popover {...props} open={true}>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover trigger</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <ExampleContent />
      </PopoverSurface>
    </Popover>
  </div>
);
