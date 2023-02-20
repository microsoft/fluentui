import * as React from 'react';
import { makeStyles, Button } from '@fluentui/react-components';

const useStyles = makeStyles({
  innerWrapper: {
    columnGap: '15px',
    display: 'flex',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
});

export const Disabled = () => {
  const styles = useStyles();

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <Button>Enabled state</Button>
        <Button disabled>Disabled state</Button>
        <Button disabledFocusable>Disabled focusable state</Button>
      </div>
      <div className={styles.innerWrapper}>
        <Button appearance="primary">Enabled state</Button>
        <Button appearance="primary" disabled>
          Disabled state
        </Button>
        <Button appearance="primary" disabledFocusable>
          Disabled focusable state
        </Button>
      </div>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: `A button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};
