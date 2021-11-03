import { Avatar } from './index';

export { Default } from './AvatarDefault.stories';
export { Active } from './AvatarActive.stories';
export { ActiveAppearance } from './AvatarActiveAppearance.stories';
export { Badge } from './AvatarBadge.stories';
export { Color } from './AvatarColor.stories';
export { ColorBrand } from './AvatarColorBrand.stories';
export { ColorNeutral } from './AvatarColorNeutral.stories';
export { ColorColorful } from './AvatarColorColorful.stories';
export { GetInitials } from './AvatarGetInitials.stories';
export { Icon } from './AvatarIcon.stories';
export { IdForColor } from './AvatarIdForColor.stories';
export { Image } from './AvatarImage.stories';
export { Name } from './AvatarName.stories';
export { Shape } from './AvatarShape.stories';
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
};
