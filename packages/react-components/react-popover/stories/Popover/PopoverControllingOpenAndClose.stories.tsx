import * as React from 'react';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger, Checkbox } from '@fluentui/react-components';
import type { CheckboxProps, PopoverProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
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

export const ControllingOpenAndClose = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: PopoverProps['onOpenChange'] = (e, data) => setOpen(data.open || false);

  const onChange: CheckboxProps['onChange'] = (e, { checked }) => {
    setOpen(checked as boolean);
  };

  return (
    <div className={styles.container}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Controlled trigger</Button>
        </PopoverTrigger>
        <PopoverSurface tabIndex={-1}>
          <ExampleContent />
        </PopoverSurface>
      </Popover>
      <Checkbox value="open" name="state" label="open" checked={open} onChange={onChange} />
    </div>
  );
};

ControllingOpenAndClose.parameters = {
  docs: {
    description: {
      story: [
        'The opening and close of the `Popover` can be controlled with your own state.',
        'The `onOpenChange` callback will provide the hints for the state and triggers based on the appropriate',
        'event.',
        '',
        '_When controlling the open state of the `Popover`, extra effort is required to ensure that interactions are_',
        '_still appropriate and that keyboard accessibility does not degrade._',
      ].join('\n'),
    },
  },
};
