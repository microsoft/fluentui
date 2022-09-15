import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { SampleCard, Title } from './SampleCard.stories';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('30px'),
  },
});

export const Size = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Title title="'small'" />
        <SampleCard size="small" />
      </div>
      <div>
        <Title title="'medium' (Default)" />
        <SampleCard />
      </div>
      <div>
        <Title title="'large'" />
        <SampleCard size="large" />
      </div>
    </div>
  );
};
