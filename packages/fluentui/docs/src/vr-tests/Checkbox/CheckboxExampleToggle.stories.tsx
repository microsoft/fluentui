import * as React from 'react';
import { StoryWright } from 'storywright';
import { Meta } from '@storybook/react';
import { Checkbox } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import CheckboxExampleToggle from '../../examples/components/Checkbox/Types/CheckboxExampleToggle.shorthand';

export default {
  component: Checkbox,
  title: 'Checkbox',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as Meta<typeof Checkbox>;

export { CheckboxExampleToggle };
