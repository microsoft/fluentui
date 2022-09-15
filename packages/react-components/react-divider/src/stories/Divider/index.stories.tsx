import { Meta } from '@storybook/react';
import { Divider } from '@fluentui/react-components';
import descriptionMd from './DividerDescription.md';
export { Default } from './DividerDefault.stories';
export { Vertical } from './DividerVertical.stories';
export { Appearance } from './DividerAppearance.stories';
export { Inset } from './DividerInset.stories';
export { AlignContent } from './DividerAlignContent.stories';
export { CustomStyles } from './DividerCustomStyles.stories';

export default {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} as Meta;
