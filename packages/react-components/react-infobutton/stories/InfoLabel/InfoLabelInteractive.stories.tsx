import * as React from 'react';

import { Link, makeStyles } from '@fluentui/react-components';
import { InfoLabel } from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },
});

export const Interactive = () => {
  const styles = useStyles();

  const interactiveContent = (
    <>
      This is example information for an InfoButton. <Link href="https://react.fluentui.dev">Learn more</Link>
    </>
  );

  return (
    <div className={styles.wrapper}>
      <InfoLabel interactive info={interactiveContent}>
        Interative InfoLabel
      </InfoLabel>
      <InfoLabel interactive={false} info="This is non-interactive information">
        Non-interactive InfoLabel
      </InfoLabel>
    </div>
  );
};
