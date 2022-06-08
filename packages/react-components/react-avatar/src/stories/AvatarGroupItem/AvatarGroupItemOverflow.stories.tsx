import * as React from 'react';
import { AvatarGroupItem, AvatarGroupItemProps } from '../../AvatarGroupItem';
import { AvatarGroupContext } from '../../contexts/AvatarGroupContext';

export const Overflow = (props: Partial<AvatarGroupItemProps>) => (
  <AvatarGroupContext.Provider value={{ isOverflow: true }}>
    <AvatarGroupItem name="Katri Athokas" {...props} />
  </AvatarGroupContext.Provider>
);
