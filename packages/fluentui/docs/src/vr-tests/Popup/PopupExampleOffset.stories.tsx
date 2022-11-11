import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Popup, buttonClassName } from '@fluentui/react-northstar';
import PopupExampleOffset from '../../examples/components/Popup/Variations/PopupExampleOffset.shorthand';

const selectors = {
  trigger: `.${buttonClassName}`,
};

export default {
  component: Popup,
  title: 'Popup',
  decorators: [
    story => (
      <Screener steps={new Steps().click(selectors.trigger).snapshot('Opens a popup').end()}>{story()}</Screener>
    ),
  ],
} as ComponentMeta<typeof Popup>;

export { PopupExampleOffset };
