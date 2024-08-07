import * as React from 'react';
import { StoryWright } from 'storywright';
import { Meta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import DialogExampleFullWidth from '../../examples/components/Dialog/Content/DialogExampleFullWidth.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as Meta<typeof Dialog>;

export { DialogExampleFullWidth };
