import * as React from 'react';
import { Animation, Icon, Provider } from '@fluentui/react-northstar';

const spinner = {
  keyframe: {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(360deg)'
    }
  },
  duration: '5s',
  iterationCount: 'infinite'
};

const AnimationExample = () => (
  <Provider theme={{ animations: { spinner } }}>
    <Animation name="spinner">
      <Icon name="mention" circular bordered />
    </Animation>
  </Provider>
);

export default AnimationExample;
