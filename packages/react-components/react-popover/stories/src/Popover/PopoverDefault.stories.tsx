import * as React from 'react';
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
    <div
      style={{
        backgroundColor: 'cornflowerblue',

        width: 300,
      }}
    >
      <h3>Popover content</h3>

      {new Array(8).fill(0).map((_, i) => (
        <div key={i} style={{ height: 50, backgroundColor: 'lavender' }}>
          {i} This is some popover content
        </div>
      ))}
    </div>
  );
};

export const Default = () => (
  <Popover positioning={{ coverTarget: 'overflow', autoSize: true }}>
    <PopoverTrigger disableButtonEnhancement>
      <Button style={{ marginTop: 300 }}>Popover trigger</Button>
    </PopoverTrigger>

    <PopoverSurface
      tabIndex={-1}
      style={{
        backgroundColor: 'salmon',
      }}
    >
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);
