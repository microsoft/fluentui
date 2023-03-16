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
      <InfoButton size="small">
        <>
          This is example content for a small InfoButton. <Link href="https://react.fluentui.dev">Learn more</Link>.
        </>
      </InfoButton>
      <InfoButton size="medium">
        <>
          This is example content for a medium InfoButton. <Link href="https://react.fluentui.dev">Learn more</Link>.
        </>
      </InfoButton>
      <InfoButton size="large">
        <>
          This is example content for a large InfoButton. <Link href="https://react.fluentui.dev">Learn more</Link>.
        </>
      </InfoButton>
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
