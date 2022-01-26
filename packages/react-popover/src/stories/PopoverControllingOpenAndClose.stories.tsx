import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { makeStyles } from '@griffel/react';

import { PopoverProps, Popover, PopoverTrigger, PopoverSurface } from '../index';

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

export const ControllingOpenAndClose = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: PopoverProps['onOpenChange'] = (e, data) => setOpen(data.open || false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(e.target.checked);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <Button>Controlled trigger</Button>
        </PopoverTrigger>
        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>

      <label style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
        open
        <input type="checkbox" name="state" value="open" checked={open} onChange={onChange} />
      </label>
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
