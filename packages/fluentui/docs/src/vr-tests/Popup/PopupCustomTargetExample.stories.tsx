import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Popup, buttonClassName } from '@fluentui/react-northstar';
import PopupCustomTargetExample from '../../examples/components/Popup/Types/PopupCustomTargetExample.shorthand';

export default {
  component: Popup,
  title: 'Popup',
  decorators: [
    story => (
      <Screener steps={new Steps().click(`.${buttonClassName}`).snapshot('Shows popup').end()}>{story()}</Screener>
    ),
  ],
} as ComponentMeta<typeof Popup>;

export { PopupCustomTargetExample };
