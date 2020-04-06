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

const AnimationExampleDirection = () => (
  <Provider theme={{ animations: { spinner } }}>
    <Grid columns={4}>
      <Text content="Normal" />
      <Text content="Reverse" />
      <Text content="Alternate" />
      <Text content="Alternate reverse" />
      <div>
        <Animation name="spinner">
          <MentionIcon circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="spinner" direction="reverse">
          <MentionIcon circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="spinner" direction="alternate">
          <MentionIcon circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="spinner" direction="alternate-reverse">
          <MentionIcon circular bordered />
        </Animation>
      </div>
    </Grid>
  </Provider>
);

export default AnimationExampleDirection;
