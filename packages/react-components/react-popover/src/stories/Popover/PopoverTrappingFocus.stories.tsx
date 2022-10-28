import * as React from 'react';
import { makeStyles, useId, Button, Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

export const TrappingFocus = () => {
  const styles = useStyles();
  const id = useId();

  return (
    <Popover trapFocus>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover trigger</Button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={id}>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>

        <div>
          <Button>Action</Button>
          <Button>Action</Button>
        </div>
      </PopoverSurface>
    </Popover>
  );
};

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
