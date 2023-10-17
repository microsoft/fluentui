import * as React from 'react';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PopoverTriggerChildProps } from '@fluentui/react-components';
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

const CustomPopoverTrigger = React.forwardRef<HTMLButtonElement, Partial<PopoverTriggerChildProps>>((props, ref) => {
  return (
    <Button {...props} ref={ref}>
      Custom Trigger
    </Button>
  );
});

export const CustomTrigger = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <CustomPopoverTrigger />
      </PopoverTrigger>
      <PopoverSurface tabIndex={-1}>
        <ExampleContent />
      </PopoverSurface>
    </Popover>
  );
};

CustomTrigger.parameters = {
  docs: {
    description: {
      story: [
        'Native elements and Fluent components have first class support as children of `PopoverTrigger`',
        'so they will be injected automatically with the correct props for interactions and accessibility attributes.',
        '',
        'It is possible to use your own custom React component as a child of `PopoverTrigger`. These components should',
        'use ref forwarding with [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)',
      ].join('\n'),
    },
  },
};
