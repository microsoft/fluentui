import * as React from 'react';
import { Reaction } from '@fluentui/react-northstar';
import { EmojiIcon, LikeIcon } from '@fluentui/react-icons-northstar';

const ReactionGroupExample = () => (
  <Reaction.Group
    items={[
      { icon: <LikeIcon />, content: '2K', key: 'up' },
      { icon: <EmojiIcon />, content: 10, key: 'smile' },
    ]}
  />
);

export default ReactionGroupExample;
