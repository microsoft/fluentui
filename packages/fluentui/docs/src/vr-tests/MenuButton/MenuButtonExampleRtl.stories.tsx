import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { MenuButton, buttonClassName } from '@fluentui/react-northstar';
import MenuButtonExampleRtl from '../../examples/components/MenuButton/Rtl/MenuButtonExample.rtl';

export default {
  component: MenuButton,
  title: 'MenuButton',
  decorators: [
    story => (
      <Screener steps={new Steps().click(`.${buttonClassName}`).snapshot('RTL: Shows menuButton').end()}>
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof MenuButton>;

export { MenuButtonExampleRtl };
