import * as React from 'react';
import { Avatar, AvatarProps } from './index'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta

export const ColorBrand = (props: Partial<AvatarProps>) => <Avatar {...props} color="brand" />;

ColorBrand.storyName = 'Color: brand';

ColorBrand.parameters = {
  docs: {
    description: {
      story: 'An avatar can have a branded color.',
    },
  },
};
