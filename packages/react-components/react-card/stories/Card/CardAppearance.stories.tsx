import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { makeStyles, shorthands, Subtitle1 } from '@fluentui/react-components';
import { SampleCard } from './SampleCard.stories';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  themeContainer: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding('16px'),
    ...shorthands.gap('16px'),
  },
  header: {
    marginBottom: '12px',
  },
});

const Title = (props: { children: React.ReactNode }) => {
  const styles = useStyles();

  return (
    <Subtitle1 as="h4" block className={styles.header}>
      {props.children}
    </Subtitle1>
  );
};

export const Appearance = () => {
  const styles = useStyles();

  return (
    <div className={styles.themeContainer}>
      <div>
        <Title>Filled (default)</Title>
        <SampleCard appearance="filled" />
      </div>
      <div>
        <Title>Filled - Interactive</Title>
        <SampleCard onClick={action('Filled Card clicked')} appearance="filled" />
      </div>
      <div>
        <Title>Filled Alternative</Title>
        <SampleCard appearance="filled-alternative" />
      </div>
      <div>
        <Title>Filled Alternative - Interactive</Title>
        <SampleCard onClick={action('Filled Alternative Card clicked')} appearance="filled-alternative" />
      </div>
      <div>
        <Title>Outline</Title>
        <SampleCard appearance="outline" />
      </div>
      <div>
        <Title>Outline - Interactive</Title>
        <SampleCard onClick={action('Outline Card clicked')} appearance="outline" />
      </div>
      <div>
        <Title>Subtle</Title>
        <SampleCard appearance="subtle" />
      </div>
      <div>
        <Title>Subtle - Interactive</Title>
        <SampleCard onClick={action('Subtle Card clicked')} appearance="subtle" />
      </div>
    </div>
  );
};
