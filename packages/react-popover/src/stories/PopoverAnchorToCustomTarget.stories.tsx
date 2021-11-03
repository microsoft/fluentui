import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '10px',
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
  const [target, setTarget] = React.useState<HTMLElement | null>();
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Popover positioning={{ target }}>
        <PopoverTrigger>
          <Button>Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>

      <Button ref={setTarget}>Custom target</Button>
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
