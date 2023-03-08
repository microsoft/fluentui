import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import DialogExampleRtl from '../../examples/components/Dialog/Rtl/DialogExample.rtl';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Dialog>;

export { DialogExampleRtl };
