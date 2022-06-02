import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { makeStyles, shorthands } from '@griffel/react';
import { SampleCard, Title } from './SampleCard.stories';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding('16px'),
    ...shorthands.gap('16px'),
  },
});

export const Selectable = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div>
        <Title title="Filled" />
        <SampleCard appearance="filled" selectable onCardSelect={action('onCardSelect - filled')} />
      </div>
      <div>
        <Title title="Filled Alternative" />
        <SampleCard
          appearance="filled-alternative"
          selectable
          onCardSelect={action('onCardSelect - filled-alternative')}
        />
      </div>
      <div>
        <Title title="Outline" />
        <SampleCard appearance="outline" selectable onCardSelect={action('onCardSelect - outline')} />
      </div>
      <div>
        <Title title="Subtle" />
        <SampleCard appearance="subtle" selectable onCardSelect={action('onCardSelect - subtle')} />
      </div>
    </div>
  );
};
