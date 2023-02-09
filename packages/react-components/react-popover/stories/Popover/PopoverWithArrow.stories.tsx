import * as React from 'react';
import { makeStyles, Button, Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-components';

const supportsBackdropFilter = '@supports (backdrop-filter: blur(100px))';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
  surface: {
    backgroundColor: 'white',
    [supportsBackdropFilter]: {
      backdropFilter: 'blur(100px)',
      color: '#FF0000',
      backgroundColor: '#FFFFFF80',
    },
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <PopoverSurface className={styles.surface}>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This popover has an arrow pointing to its target</div>
    </PopoverSurface>
  );
};

export const WithArrow = () => (
  <Popover open withArrow>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    <ExampleContent />
  </Popover>
);

WithArrow.parameters = {
  docs: {
    description: {
      story: 'The `withArrow` prop can be used to display an arrow pointing to the target.',
    },
  },
};
