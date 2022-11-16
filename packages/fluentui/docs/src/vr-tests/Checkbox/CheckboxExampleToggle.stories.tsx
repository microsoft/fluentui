import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryWright } from 'storywright';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Checkbox } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import CheckboxExampleToggle from '../../examples/components/Checkbox/Types/CheckboxExampleToggle.shorthand';

export default {
  component: Checkbox,
  title: 'Checkbox',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Checkbox>;

export { CheckboxExampleToggle };
