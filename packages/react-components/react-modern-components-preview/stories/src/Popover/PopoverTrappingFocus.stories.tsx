import * as React from 'react';
import { Button, makeStyles, useId } from '@fluentui/react-components';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-modern-components-preview/popover';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

export const TrappingFocus = (): React.ReactNode => {
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
        'prop, the native dialog surface opens modally, making the rest of the page inert and trapping focus inside',
        'the `Popover`. The browser removes the focus trap when the `Popover` is closed.',
      ].join('\n'),
    },
  },
};
