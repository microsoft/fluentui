import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const IdForColor = (props: Partial<AvatarProps>) => (
  <>
    <Avatar {...props} color="colorful" name="Robin Counts" />
    <Avatar {...props} color="colorful" name="Mona Kane" />
    <Avatar {...props} color="colorful" name="Kat Larsson" />
    <Avatar {...props} color="colorful" name="Ashley McCarthy" />
    <Avatar {...props} color="colorful" name="Johnie McConnell" />
    <br />
    <Avatar {...props} color="colorful" name="Robin Counts" idForColor="123" />
    <Avatar {...props} color="colorful" name="Mona Kane" idForColor="123" />
    <Avatar {...props} color="colorful" name="Kat Larsson" idForColor="123" />
    <Avatar {...props} color="colorful" name="Ashley McCarthy" idForColor="123" />
    <Avatar {...props} color="colorful" name="Johnie McConnell" idForColor="123" />
  </>
);

IdForColor.storyName = 'Color: by ID';
IdForColor.parameters = {
  docs: {
    description: {
      story: 'An avatar can generate stable colors from an ID.',
    },
  },
};
