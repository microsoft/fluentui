import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { makeStyles } from '@griffel/react';

import { Popover, PopoverTrigger, PopoverSurface } from '../index';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const FirstNestedPopover = () => {
  const styles = useStyles();
  const id = 'first';
  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <Button>First nested trigger</Button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={id}>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>
        <Button>First nested button</Button>
        <SecondNestedPopover />
        <SecondNestedPopover />
      </PopoverSurface>
    </Popover>
  );
};

const SecondNestedPopover = () => {
  const styles = useStyles();
  const id = 'second';
  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <Button>Second nested trigger</Button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={id}>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>
        <Button>Second nested button</Button>
      </PopoverSurface>
    </Popover>
  );
};

export const NestedPopovers = () => {
  const id = 'root';
  const styles = useStyles();
  return (
    <Popover trapFocus>
      <PopoverTrigger>
        <Button>Root trigger</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>
        <Button>Root button</Button>
        <FirstNestedPopover />
      </PopoverSurface>
    </Popover>
  );
};

NestedPopovers.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'Popovers can be nested within each other. Too much nesting can result in',
        'extra accessibility considerations and are generally not a great user experience,',
        '',
        'Since nested popovers will generally have an interactive `PopoverTrigger` to control',
        'the nested popover, make sure to combine their usage with the `trapFocus` prop for correct',
        'screen reader and keyboard accessibility.',
        '',
        '- Try and limit nesting to 2 levels.',
        '- Make sure to use `trapFocus` when nesting.',
        '- Creating nested popovers as separate components will result in more maintainable code.',
      ].join('\n'),
    },
  },
};
