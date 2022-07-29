import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupOverflow } from '@fluentui/react-avatar';

export const Color = () => {
  return (
    <AvatarGroup>
      <AvatarGroupItem name="Katri Athokas" />
      <AvatarGroupItem color="seafoam" name="Elvia Atkins" />
      <AvatarGroupItem color="red" name="Cameron Evans" />
      <AvatarGroupItem color="forest" name="Wanda Howard" />
      <AvatarGroupOverflow indicator="count">
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroupOverflow>
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
