import { Meta } from '@storybook/react';
import { Text } from '../Text';
import textDescriptionMd from './TextDescription.md';
import textBestPractices from './TextBestPractices.md';

export { Default } from './Default.stories';
export { Typography } from './TextTypography.stories';
export { Italic } from './TextItalic.stories';
export { Underline } from './TextUnderline.stories';
export { StrikeThrough } from './TextStrikeThrough.stories';
export { Weight } from './TextWeight.stories';
export { Size } from './TextSize.stories';
export { Truncate } from './TextTruncate.stories';
export { Font } from './TextFont.stories';

export default {
  title: 'Components/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: [textDescriptionMd, textBestPractices].join('\n'),
      },
    },
  },
} as Meta;
