import * as React from 'react';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger, tokens } from '@fluentui/react-components';
import type { PopoverProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const useLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalMNudge,
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

export const Appearance = (props: PopoverProps) => {
  const layoutStyles = useLayoutStyles();

  return (
    <div className={layoutStyles.root}>
      <Popover {...props}>
        <PopoverTrigger>
          <Button>Default appearance Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>

      <Popover {...props} appearance="brand">
        <PopoverTrigger>
          <Button>Brand appearance Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>

      <Popover {...props} appearance="inverted">
        <PopoverTrigger>
          <Button>Inverted appearance Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>
    </div>
  );
};
