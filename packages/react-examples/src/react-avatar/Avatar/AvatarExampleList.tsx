import * as React from 'react';
import { Avatar, AvatarProps } from '@fluentui/react-avatar';
import { Stack } from '@fluentui/react';
import { avatarExamples as examples } from './avatarExamples';

export type AvatarExampleListProps = AvatarProps & {
  exampleIndex?: number;
};

/**
 * Generate a list of Avatars with sample properties
 */
export const AvatarExampleList: React.FC<AvatarExampleListProps> = props => {
  const { exampleIndex = 0 } = props;
  const offset = exampleIndex * examples.size.length;

  return (
    <Stack wrap horizontal tokens={{ childrenGap: 24 }}>
      {examples.size.map((size, i) => (
        <Avatar
          key={size}
          size={size}
          name={examples.name[(i + offset) % examples.name.length]}
          image={examples.image[(i + offset) % examples.image.length]}
          badge={examples.badge[(i + offset) % examples.badge.length]}
          icon={examples.icon[(i + offset) % examples.icon.length]}
          {...props}
        />
      ))}
    </Stack>
  );
};

/**
 * Generate a list of Avatars with sample properties, using custom sizes
 */
export const AvatarCustomSizeExampleList: React.FC<AvatarExampleListProps> = props => {
  const { exampleIndex = 0 } = props;
  const offset = exampleIndex * examples.customSize.length;

  return (
    <Stack wrap horizontal tokens={{ childrenGap: 24 }}>
      {examples.customSize.map((customSize, i) => (
        <Avatar
          key={customSize}
          customSize={customSize}
          name={examples.name[(examples.name.length - i + offset) % examples.name.length]}
          image={examples.image[(examples.image.length - i + offset) % examples.image.length]}
          badge={examples.badge[(examples.badge.length - i + offset) % examples.badge.length]}
          icon={examples.icon[(examples.icon.length - i + offset) % examples.icon.length]}
          {...props}
        />
      ))}
    </Stack>
  );
};
