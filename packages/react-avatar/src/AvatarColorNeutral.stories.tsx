import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const ColorNeutral = (props: Partial<AvatarProps>) => (
  <>
    <Avatar color="neutral" />
    <Avatar color="neutral" name="Katri Athokas" />
  </>
);

ColorNeutral.storyName = 'Color: neutral, brand';
