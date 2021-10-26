import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const Color = (props: Partial<AvatarProps>) => {
  const colors: AvatarProps['color'][] = [
    'darkRed',
    'cranberry',
    'red',
    'pumpkin',
    'peach',
    'marigold',
    'gold',
    'brass',
    'brown',
    'forest',
    'seafoam',
    'darkGreen',
    'lightTeal',
    'teal',
    'steel',
    'blue',
    'royalBlue',
    'cornflower',
    'navy',
    'lavender',
    'purple',
    'grape',
    'lilac',
    'pink',
    'magenta',
    'plum',
    'beige',
    'mink',
    'platinum',
    'anchor',
  ];

  return (
    <div>
      <>
        <Avatar {...props} color="neutral" />
        <code>neutral</code>
      </>
      <>
        <Avatar {...props} color="brand" />
        <code>brand</code>
      </>
      <>
        <Avatar {...props} color="colorful" />
        <code>colorful</code>
      </>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 130px)',
        }}
      >
        {colors.map(color => (
          <div key={color}>
            <Avatar {...props} color={color} />
            <code>{color}</code>
          </div>
        ))}
      </div>
    </div>
  );
};
