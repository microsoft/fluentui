import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getStoryWrightSteps from './commonStoryWrightSteps';
import MenuExampleWithIcons from '../../examples/components/Menu/Slots/MenuExampleWithIcons.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <StoryWright steps={getStoryWrightSteps({})}>{story()}</StoryWright>],
} as ComponentMeta<typeof Menu>;

export { MenuExampleWithIcons };
