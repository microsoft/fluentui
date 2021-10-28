import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const ColorNeutralBrand = (props: Partial<AvatarProps>) => (
  <>
    <Avatar {...props} color="neutral" />
    <Avatar {...props} color="brand" />
  </>
);

ColorNeutralBrand.storyName = 'Color: neutral, brand';
