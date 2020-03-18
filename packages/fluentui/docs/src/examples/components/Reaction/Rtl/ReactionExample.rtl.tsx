import * as React from 'react';
import { Reaction } from '@fluentui/react-northstar';

const ReactionGroupExampleRtl = () => (
  <Reaction.Group
    items={[
      { icon: 'like', content: '2 الإعجابات', key: 'up' },
      { icon: 'emoji', content: '10 ابتسامة', key: 'smile' }
    ]}
  />
);

export default ReactionGroupExampleRtl;
