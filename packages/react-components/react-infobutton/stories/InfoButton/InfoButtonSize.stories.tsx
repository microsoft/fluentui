import * as React from 'react';
import { InfoButton } from '@fluentui/react-infobutton';
import { Link, makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    alignItems: 'start',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('80px'),
    ...shorthands.padding('20px'),
  },
});

export const Size = () => {
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <InfoButton
        size="small"
        info={
          <>
            This is example information for a small InfoButton.{' '}
            <Link href="https://react.fluentui.dev">Learn more</Link>.
          </>
        }
      />

      <InfoButton
        size="medium"
        info={
          <>
            This is example information for a medium InfoButton.{' '}
            <Link href="https://react.fluentui.dev">Learn more</Link>.
          </>
        }
      />

      <InfoButton
        size="large"
        info={
          <>
            This is example information for a large InfoButton.{' '}
            <Link href="https://react.fluentui.dev">Learn more</Link>.
          </>
        }
      />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'An InfoButton supports a range of sizes from small to large. The default is medium.',
    },
  },
};
