import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
} from '@fluentui/react-headless-components-preview/avatar-group';

import descriptionMd from './AvatarGroupDescription.md';
export { Default } from './AvatarGroupDefault.stories';

export default {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  subcomponents: { AvatarGroupItem, AvatarGroupPopover },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
