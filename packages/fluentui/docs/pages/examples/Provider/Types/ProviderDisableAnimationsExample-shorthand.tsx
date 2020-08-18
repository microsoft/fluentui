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

const AnimatedIcon = () => (
  <Animation name="spinner">
    <MentionIcon circular bordered />
  </Animation>
);

const ProviderExampleAnimation = () => (
  <Provider theme={{ animations: { spinner } }}>
    {'This icon will be animated'}
    <br />
    <AnimatedIcon />
    <Provider disableAnimations>
      {'This icon will not be animated, as animations are disabled in this tree'}
      <br />
      <AnimatedIcon />
    </Provider>
  </Provider>
);

export default ProviderExampleAnimation;
