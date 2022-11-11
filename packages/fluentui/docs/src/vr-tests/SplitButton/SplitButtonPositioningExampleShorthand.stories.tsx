import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { SplitButton, splitButtonToggleClassName } from '@fluentui/react-northstar';
import SplitButtonPositioningExampleShorthand from '../../examples/components/SplitButton/Usage/SplitButtonPositioningExampleShorthand.shorthand';

const selectors = {
  triggerButton: `.${splitButtonToggleClassName}`,
};

export default {
  component: SplitButton,
  title: 'SplitButton',
  decorators: [
    story => (
      <Screener steps={new Steps().click(selectors.triggerButton).snapshot('Open menu').end()}>{story()}</Screener>
    ),
  ],
} as ComponentMeta<typeof SplitButton>;

export { SplitButtonPositioningExampleShorthand };
