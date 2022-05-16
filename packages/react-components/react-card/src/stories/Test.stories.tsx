import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { Button } from '@fluentui/react-components';
import { SampleCard, Title } from './SampleCard.stories';
import { Card } from '../Card';
import { CardHeader } from '../CardHeader';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.gap('16px'),
  },
  card: {
    height: '200px',
  },
});

export const Test = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Card className={styles.card} tabIndex={1}>
        <Button tabIndex={1}>Button</Button>
      </Card>
      <Card className={styles.card} tabIndex={1}>
        <Button tabIndex={1}>Button</Button>
      </Card>
    </div>
  );
};
