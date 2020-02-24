import * as React from 'react';
import { Animation, Flex, Icon, Provider, ThemeAnimation } from '@fluentui/react';

const colorChanger: ThemeAnimation<{ fromColor: string; toColor: string }> = {
  keyframe: ({ fromColor, toColor }) => ({
    from: {
      color: fromColor
    },
    to: {
      color: toColor
    }
  }),
  keyframeParams: { fromColor: 'red', toColor: 'blue' },
  duration: '5s',
  iterationCount: 'infinite'
};

const AnimationExample = () => (
  <Provider theme={{ animations: { colorChanger } }}>
    <Flex gap="gap.smaller">
      <Animation name="colorChanger">
        <Icon name="mention" circular bordered />
      </Animation>
      <Animation name="colorChanger" keyframeParams={{ fromColor: 'green', toColor: 'yellow' }}>
        <Icon name="mention" circular bordered />
      </Animation>
      <Animation name="colorChanger" keyframeParams={{ toColor: 'black' }}>
        <Icon name="mention" circular bordered />
      </Animation>
    </Flex>
  </Provider>
);

export default AnimationExample;
