import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'FileTypeIcon',
  component: FileTypeIcon,
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof FileTypeIcon>;

export const Default = () => (
  <div>
    <FileTypeIcon extension="docx" />
    <FileTypeIcon extension="xlsx" size={20} />
    <FileTypeIcon extension="pptx" size={24} />
    <FileTypeIcon type={FileIconType.folder} size={32} imageFileType="png" />
    <FileTypeIcon extension="unknown" size={40} />
  </div>
);
Default.storyName = 'default';

export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
