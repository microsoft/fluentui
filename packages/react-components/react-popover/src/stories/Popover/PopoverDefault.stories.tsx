import * as React from 'react';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PopoverProps } from '@fluentui/react-components';

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

export const Default = (props: PopoverProps) => (
  <Popover {...props}>
    <PopoverTrigger>
      {props => {
        const { ref, ...rest } = props;
        return (
          <button {...rest} ref={ref}>
            Popover
          </button>
        );
      }}
    </PopoverTrigger>

    <PopoverSurface>
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);
