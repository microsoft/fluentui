import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { makeStyles } from '@griffel/react';
import { SampleCard } from './SampleCard.stories';

const useStyles = makeStyles({
  container: {
    width: '300px',
  },
});

export const Selectable = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <SampleCard selectable onCardSelect={action('onCardSelect')} />
    </div>
  );
};
