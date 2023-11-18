import * as React from 'react';
import descriptionMd from './Description.md';
import { Segment, Provider, teamsTheme } from '@fluentui/react-northstar';
import { makeStyles } from '@fluentui/react-components';
import { Segment as SegmentShim } from '@fluentui/react-migration-v0-v9';

const useStyles = makeStyles({
  root: {
    width: 'fit-content',
  },
});

export const Default = () => {
  const styles = useStyles();

  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Segment>Segment</Segment>
      </div>

      <div>
        <h3>shim</h3>
        <SegmentShim>Segment</SegmentShim>
      </div>
    </Provider>
  );
};

export default {
  title: 'Migration Shims/V0/SegmentShim',
  component: SegmentShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
