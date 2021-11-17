import * as React from 'react';
import { Avatar, AvatarProps } from './index'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta

export const Shape = (props: Partial<AvatarProps>) => (
  <>
    <Avatar {...props} shape="circular" />
    <Avatar {...props} shape="square" />
  </>
);

Shape.parameters = {
  docs: {
    description: {
      story: 'An avatar can be circular or square. The default shape is circular.',
    },
  },
};
