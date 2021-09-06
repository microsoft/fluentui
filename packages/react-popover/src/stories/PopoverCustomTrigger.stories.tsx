import * as React from 'react';
import { Popover, PopoverSurface } from '@fluentui/react-popover';
import type { PopoverProps } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';
import { makeStyles } from '@fluentui/react-make-styles';

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

export const CustomTrigger = () => {
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  const onClick = () => setOpen(s => !s);
  const onOpenChange: PopoverProps['onOpenChange'] = (e, data) => {
    // handle custom trigger interactions separately
    if (e.target !== target) {
      setOpen(data.open);
    }
  };

  return (
    <>
      <Button aria-haspopup ref={setTarget} onClick={onClick}>
        Custom trigger
      </Button>
      <Popover positioning={{ target }} open={open} onOpenChange={onOpenChange}>
        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>
    </>
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
