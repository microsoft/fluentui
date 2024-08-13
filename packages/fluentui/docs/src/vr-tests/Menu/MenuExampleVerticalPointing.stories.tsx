import * as React from 'react';
import { StoryWright } from 'storywright';
import { Meta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getStoryWrightSteps from './commonStoryWrightSteps';
import MenuExampleVerticalPointing from '../../examples/components/Menu/Variations/MenuExampleVerticalPointing.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <StoryWright steps={getStoryWrightSteps({ vertical: true })}>{story()}</StoryWright>],
} as Meta<typeof Menu>;

export { MenuExampleVerticalPointing };
