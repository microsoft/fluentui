import * as React from 'react';
import { AvatarGroup } from '../../AvatarGroup';
import { AvatarGroupItem } from '../../AvatarGroupItem';
import type { AvatarGroupProps } from '../../AvatarGroup';

export const Default = (props: Partial<AvatarGroupProps>) => {
  return (
    <AvatarGroup {...props}>
      <AvatarGroupItem name="Katri Athokas" />
      <AvatarGroupItem name="Elvia Atkins" />
      <AvatarGroupItem name="Cameron Evans" />
      <AvatarGroupItem name="Wanda Howard" />
      <AvatarGroupItem name="Mona Kane" />
      <AvatarGroupItem name="Allan Munger" />
      <AvatarGroupItem name="Daisy Phillips" />
      <AvatarGroupItem name="Robert Tolbert" />
      <AvatarGroupItem name="Kevin Sturgis" />
    </AvatarGroup>
  );
};
