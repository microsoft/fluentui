import { Avatar } from '@fluentui/react-headless-components-preview/avatar';

import descriptionMd from './AvatarDescription.md';
import avatarCss from '../../../../../../bebop/components/avatar.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'avatar.module.css', source: avatarCss }),
  },
};
