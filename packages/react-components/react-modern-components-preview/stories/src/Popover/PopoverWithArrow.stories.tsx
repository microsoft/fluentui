import * as React from 'react';
import { Button, makeStyles } from '@fluentui/react-components';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-modern-components-preview/popover';

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

      <div>This popover has an arrow pointing to its target</div>
      <Button>Action</Button>
    </div>
  );
};

export const WithArrow = (): React.ReactNode => (
  <Popover withArrow>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    <PopoverSurface>
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);

WithArrow.parameters = {
  docs: {
    description: {
      story: 'The `withArrow` prop can be used to display an arrow pointing to the target.',
    },
  },
};
