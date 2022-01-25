import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { makeStyles } from '@griffel/react';

import { Popover, PopoverTrigger, PopoverSurface } from '../index';

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

export const TrappingFocus = () => (
  <Popover trapFocus>
    <PopoverTrigger>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    <PopoverSurface>
      <ExampleContent />

      <div>
        <Button>Action</Button>
        <Button>Action</Button>
      </div>
    </PopoverSurface>
  </Popover>
);

TrappingFocus.parameters = {
  docs: {
    description: {
      story: [
        'When a `Popover` contains focusable elements, the modal dialog pattern will apply. By using the `trapFocus`',
        'prop, the component sets `aria-hidden`appropriately to parent elements in the document so that elements',
        'not contained in the focus trap are hidden to screen reader users. This focus trap is automatically removed',
        'when the `Popover` is closed.',
      ].join('\n'),
    },
  },
};
