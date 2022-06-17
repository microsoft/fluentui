import * as React from 'react';
import { AvatarGroup } from '../../AvatarGroup';
import { AvatarGroupItem } from '../../AvatarGroupItem';

export const Color = () => {
  return (
    <AvatarGroup>
      <AvatarGroupItem name="Wanda Howard" />
      <AvatarGroupItem name="Mona Kane" />
      <AvatarGroupItem name="Allan Munger" />
      <AvatarGroupItem name="Daisy Phillips" />
      <AvatarGroupItem name="Robert Tolbert" />
      <AvatarGroupItem name="Kevin Sturgis" />
      <AvatarGroupItem color="blue" name="Cameron Evans" />
      <AvatarGroupItem color="forest" name="Elvia Atkins" />
      <AvatarGroupItem color="red" name="Katri Athokas" />
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
