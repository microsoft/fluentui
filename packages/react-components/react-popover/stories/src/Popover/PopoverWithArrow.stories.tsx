import * as React from 'react';
import { makeStyles, Button, Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-components';

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
    </div>
  );
};

export const WithArrow = () => (
  <Popover withArrow>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    <PopoverSurface tabIndex={-1}>
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
