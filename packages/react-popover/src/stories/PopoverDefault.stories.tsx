import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Popover, PopoverTrigger, PopoverSurface, PopoverProps } from '@fluentui/react-popover';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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

export const Default = (props: PopoverProps) => (
  <Popover {...props}>
    <PopoverTrigger>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    <PopoverSurface>
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);

Default.argTypes = {
  positioning: {
    control: {
      disable: true,
    },
  },
  defaultOpen: {
    control: {
      disable: true,
    },
  },
  mountNode: {
    control: {
      disable: true,
    },
  },
};
