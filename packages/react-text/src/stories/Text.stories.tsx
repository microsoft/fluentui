import { Meta } from '@storybook/react';
import { Text } from '../Text';
import textDescriptionMd from './TextDescription.md';

export { Default } from './Default.stories';

export default {
  title: 'Components/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: [textDescriptionMd].join('\n'),
      },
    },
  },
} as Meta;
