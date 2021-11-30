import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const ColorColorful = (props: Partial<AvatarProps>) => (
  <>
    <Avatar {...props} color="colorful" name="Carole Poland" />
    <Avatar {...props} color="colorful" name="Carlos Slattery" />
    <Avatar {...props} color="colorful" name="Robert Tolbert" />
    <Avatar {...props} color="colorful" name="Kevin Sturgis" />
    <Avatar {...props} color="colorful" name="Charlotte Waltson" />
  </>
);

ColorColorful.storyName = 'Color: colorful';
ColorColorful.parameters = {
  docs: {
    description: {
      story: 'An avatar can have the color be automatically generated from the name.',
    },
  },
};
