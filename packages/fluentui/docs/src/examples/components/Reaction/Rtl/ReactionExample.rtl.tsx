import * as React from 'react';
import { Reaction } from '@fluentui/react-northstar';
import { EmojiIcon, LikeIcon } from '@fluentui/react-icons-northstar';

const ReactionGroupExampleRtl = () => (
  <Reaction.Group
    items={[
      { icon: <LikeIcon />, content: '2 الإعجابات', key: 'up' },
      { icon: <EmojiIcon />, content: '10 ابتسامة', key: 'smile' },
    ]}
  />
);

export default ReactionGroupExampleRtl;
