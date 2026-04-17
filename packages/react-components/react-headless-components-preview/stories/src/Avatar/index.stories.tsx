import { Avatar } from '@fluentui/react-headless-components-preview';

import descriptionMd from './AvatarDescription.md';

export { Default } from './AvatarDefault.stories';

export default {
  title: 'Headless Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
