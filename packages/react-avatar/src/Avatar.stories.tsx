import { Avatar } from './index';
import { Meta } from '@storybook/react';

export { Default } from './AvatarDefault.stories';
export { Icon } from './AvatarIcon.stories';
export { Name } from './AvatarName.stories';
export { Image } from './AvatarImage.stories';
export { Shape } from './AvatarShape.stories';
export { Badge } from './AvatarBadge.stories';
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
} as Meta;
