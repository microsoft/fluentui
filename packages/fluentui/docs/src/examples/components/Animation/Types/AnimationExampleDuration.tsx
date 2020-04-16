import * as React from 'react';
import { Animation, Provider } from '@fluentui/react-northstar';
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

const AnimationExampleDuration = () => (
  <Provider theme={{ animations: { spinner } }}>
    <Animation name="spinner" duration="1s">
      <MentionIcon circular bordered />
    </Animation>
  </Provider>
);

export default AnimationExampleDuration;
