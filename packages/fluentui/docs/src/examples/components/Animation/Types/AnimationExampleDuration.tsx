import * as React from 'react';
import { Animation, Icon, Provider } from '@fluentui/react-northstar';

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
      <Icon name="mention" circular bordered />
    </Animation>
  </Provider>
);

export default AnimationExampleDuration;
