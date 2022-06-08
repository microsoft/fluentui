import * as React from 'react';
import { AvatarGroup } from '../../AvatarGroup';
import { AvatarGroupItem } from '../../AvatarGroupItem';

export const Layout = () => {
  return (
    <>
      <div>
        <AvatarGroup layout="spread">
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
      </div>
      <div>
        <AvatarGroup layout="stack">
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
      </div>
      <div>
        <AvatarGroup layout="pie">
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
      </div>
    </>
  );
};
