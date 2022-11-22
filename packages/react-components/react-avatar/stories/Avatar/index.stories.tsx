import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import { Meta } from '@storybook/react';

export { Default } from './AvatarDefault.stories';
export { Name } from './AvatarName.stories';
export { Image } from './AvatarImage.stories';
export { Icon } from './AvatarIcon.stories';
export { Badge } from './AvatarBadge.stories';
export { BadgeIcon } from './AvatarBadgeIcon.stories';
export { Square } from './AvatarSquare.stories';
export { ColorBrand } from './AvatarColorBrand.stories';
export { ColorColorful } from './AvatarColorColorful.stories';
export { ColorPalette } from './AvatarColorPalette.stories';
export { Active } from './AvatarActive.stories';
export { ActiveAppearance } from './AvatarActiveAppearance.stories';
export { Initials } from './AvatarInitials.stories';
export { Size } from './AvatarSize.stories';

import descriptionMd from './AvatarDescription.md';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
