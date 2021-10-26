import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const IdForColor = (props: Partial<AvatarProps>) => {
  return (
    <>
      <Avatar {...props} color="colorful" name="Miguel Garcia" />
      <Avatar {...props} color="colorful" name="Wanda Howard" />
      <Avatar {...props} color="colorful" name="Mona Kane" />
      <Avatar {...props} color="colorful" name="Kat Larsson" />
      <Avatar {...props} color="colorful" name="Ashley McCarthy" />
      <Avatar {...props} color="colorful" idForColor="Johnie McConnell" />
      <Avatar {...props} color="colorful" idForColor="Allan Munger" />
      <Avatar {...props} color="colorful" idForColor="Erik Nason" />
      <Avatar {...props} color="colorful" idForColor="Kristin Patterson" />
      <Avatar {...props} color="colorful" idForColor="Daisy Phillips" />
    </>
  );
};
