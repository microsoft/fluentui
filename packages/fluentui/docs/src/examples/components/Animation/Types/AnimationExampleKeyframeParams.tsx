import * as React from 'react';
import { Animation, Flex, Provider, ThemeAnimation } from '@fluentui/react-northstar';
import { MentionIcon } from '@fluentui/react-icons-northstar';

const colorChanger: ThemeAnimation<{ fromColor: string; toColor: string }> = {
  keyframe: ({ fromColor, toColor }) => ({
    from: {
      color: fromColor,
    },
    to: {
      color: toColor,
    },
  }),
  keyframeParams: { fromColor: 'red', toColor: 'blue' },
  duration: '5s',
  iterationCount: 'infinite',
};

const AnimationExample = () => (
  <Provider theme={{ animations: { colorChanger } }}>
    <Flex gap="gap.smaller">
      <Animation name="colorChanger">
        <MentionIcon circular bordered />
      </Animation>
      <Animation name="colorChanger" keyframeParams={{ fromColor: 'green', toColor: 'yellow' }}>
        <MentionIcon circular bordered />
      </Animation>
      <Animation name="colorChanger" keyframeParams={{ toColor: 'black' }}>
        <MentionIcon circular bordered />
      </Animation>
    </Flex>
  </Provider>
);

export default AnimationExample;
