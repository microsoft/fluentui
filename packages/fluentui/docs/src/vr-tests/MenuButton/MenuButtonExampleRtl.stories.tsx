import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { MenuButton, buttonClassName } from '@fluentui/react-northstar';
import MenuButtonExampleRtl from '../../examples/components/MenuButton/Rtl/MenuButtonExample.rtl';

export default {
  component: MenuButton,
  title: 'MenuButton',
  decorators: [
    story => (
      <StoryWright steps={new Steps().click(`.${buttonClassName}`).snapshot('RTL: Shows menuButton').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof MenuButton>;

export { MenuButtonExampleRtl };
