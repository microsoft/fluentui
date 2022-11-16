import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryWright } from 'storywright';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getStoryWrightSteps from './commonStoryWrightSteps';
import MenuExampleWithSubMenu from '../../examples/components/Menu/Usage/MenuExampleWithSubmenu.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <StoryWright steps={getStoryWrightSteps({})}>{story()}</StoryWright>],
} as ComponentMeta<typeof Menu>;

export { MenuExampleWithSubMenu };
