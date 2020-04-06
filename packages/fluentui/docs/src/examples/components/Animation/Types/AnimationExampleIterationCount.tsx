import * as React from 'react';
import { Animation, Grid, Text, Provider } from '@fluentui/react-northstar';
import { MentionIcon } from '@fluentui/react-icons-northstar';

const spinner = {
  keyframe: {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  duration: '5s',
  iterationCount: 'infinite',
};

const AnimationExampleIterationCount = () => (
  <Provider theme={{ animations: { spinner } }}>
    <Grid columns={4}>
      <Text content="1 iteration" />
      <Text content="2 iterations" />
      <Text content="5 iterations" />
      <Text content="Infinite" />
      <div>
        <Animation name="spinner" iterationCount="1">
          <MentionIcon circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="spinner" iterationCount="2">
          <MentionIcon circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="spinner" iterationCount="5">
          <MentionIcon circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="spinner" iterationCount="infinite">
          <MentionIcon circular bordered />
        </Animation>
      </div>
    </Grid>
  </Provider>
);

export default AnimationExampleIterationCount;
