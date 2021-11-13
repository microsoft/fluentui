import * as React from 'react';
import { Avatar, AvatarProps } from './index'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta

export const ColorNeutral = (props: Partial<AvatarProps>) => <Avatar color="neutral" />;

ColorNeutral.storyName = 'Color: neutral';

ColorNeutral.parameters = {
  docs: {
    description: {
      story: 'An avatar can have a neutral color.',
    },
  },
};
