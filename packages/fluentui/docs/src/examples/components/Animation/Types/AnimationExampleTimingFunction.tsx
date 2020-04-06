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

const AnimationExampleTimingFunction = () => (
  <Provider theme={{ animations: { spinner } }}>
    <Grid columns={6}>
      <Text content="Ease" />
      <Text content="Linear" />
      <Text content="Ease in" />
      <Text content="Ease out" />
      <Text content="Ease in out" />
      <Text content="Cubic bezier" />
      <div>
        <Animation name="spinner" timingFunction="ease">
          <MentionIcon circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="spinner" timingFunction="linear">
          <MentionIcon circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="spinner" timingFunction="ease-in">
          <MentionIcon circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="spinner" timingFunction="ease-out">
          <MentionIcon circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="spinner" timingFunction="ease-in-out">
          <MentionIcon circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="spinner" timingFunction="cubic-bezier(0.1, 0.5, 0.1, 0.5)">
          <MentionIcon circular bordered />
        </Animation>
      </div>
    </Grid>
  </Provider>
);

export default AnimationExampleTimingFunction;
