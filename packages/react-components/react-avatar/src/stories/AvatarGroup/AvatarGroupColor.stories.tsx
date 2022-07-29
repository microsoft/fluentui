import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupOverflow,
  getPartitionedAvatarGroupItems,
} from '@fluentui/react-avatar';

export const Color = () => {
  const avatarGroupItems = [
    <AvatarGroupItem name="Mona Kane" key="Mona Kane" />,
    <AvatarGroupItem name="Allan Munger" key="Allan Munger" />,
    <AvatarGroupItem name="Daisy Phillips" key="Daisy Phillips" />,
    <AvatarGroupItem name="Robert Tolbert" key="Robert Tolbert" />,
    <AvatarGroupItem name="Kevin Sturgis" key="Kevin Sturgis" />,
    <AvatarGroupItem name="Katri Athokas" key="Katri Athokas" />,
    <AvatarGroupItem color="seafoam" name="Elvia Atkins" key="Elvia Atkins" />,
    <AvatarGroupItem color="red" name="Cameron Evans" key="Cameron Evans" />,
    <AvatarGroupItem color="forest" name="Wanda Howard" key="Wanda Howard" />,
  ];
  const { inlineItems, overflowItems } = getPartitionedAvatarGroupItems(avatarGroupItems);

  return (
    <AvatarGroup>
      {inlineItems}
      <AvatarGroupOverflow>{overflowItems}</AvatarGroupOverflow>
    </AvatarGroup>
  );
};

Color.parameters = {
  docs: {
    description: {
      story: 'An AvatarGroup allows AvatarGroupItems to override the default color.',
    },
  },
};
