import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
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

export const WithArrow = (): JSXElement => (
  <Popover withArrow>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    {/* Use this labelling technique for very short popovers. Otherwise label by the heading if setting focus to the popover surface. */}
    <PopoverSurface tabIndex={-1} id="popover-surface" aria-labelledby="popover-surface">
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
