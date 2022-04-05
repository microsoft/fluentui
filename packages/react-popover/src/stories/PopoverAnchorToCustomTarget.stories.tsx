import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { makeStyles, shorthands } from '@griffel/react';

import { Popover, PopoverTrigger, PopoverSurface } from '../index';
import { PopperRefHandle } from '@fluentui/react-positioning';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap('10px'),
  },

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

export const AnchorToCustomTarget = () => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const popperRef = React.useRef<PopperRefHandle>(null);
  const styles = useStyles();

  React.useEffect(() => {
    if (buttonRef.current) {
      popperRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, popperRef]);

  return (
    <div className={styles.container}>
      <Popover positioning={{ popperRef }}>
        <PopoverTrigger>
          <Button>Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>

      <Button ref={buttonRef}>Custom target</Button>
    </div>
  );
};

AnchorToCustomTarget.parameters = {
  docs: {
    description: {
      story: [
        'A Popover can be used without a trigger and anchored to any DOM element. This can be useful if',
        'a Popover instance needs to be reused in different places.',
        '',
        '_Not using a PopoverTrigger will require more work to make sure your scenario is accessible,_',
        '_such as, implementing accessible markup and keyboard interactions for your trigger._',
      ].join('\n'),
    },
  },
};
