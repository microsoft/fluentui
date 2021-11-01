import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const ColorBrand = (props: Partial<AvatarProps>) => (
  <>
    <Avatar color="brand" name="Lydia Bauer" badge={{ status: 'doNotDisturb' }} {...props} />
    <Avatar color="brand" badge={{ status: 'available' }} {...props} />
  </>
);

ColorBrand.storyName = 'Color: neutral, brand';
