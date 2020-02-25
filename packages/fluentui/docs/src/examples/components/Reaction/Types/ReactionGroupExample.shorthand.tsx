import * as React from 'react';
import { Reaction } from '@fluentui/react';

const ReactionGroupExample = () => (
  <Reaction.Group
    items={[
      { icon: 'like', content: '2K', key: 'up' },
      { icon: 'emoji', content: 10, key: 'smile' }
    ]}
  />
);

export default ReactionGroupExample;
