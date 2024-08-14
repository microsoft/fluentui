import * as React from 'react';
import { StoryWright } from 'storywright';
import { Meta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getStoryWrightSteps from './commonStoryWrightSteps';
import MenuExampleWithSubMenu from '../../examples/components/Menu/Usage/MenuExampleWithSubmenu.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <StoryWright steps={getStoryWrightSteps({})}>{story()}</StoryWright>],
} as Meta<typeof Menu>;

export { MenuExampleWithSubMenu };
