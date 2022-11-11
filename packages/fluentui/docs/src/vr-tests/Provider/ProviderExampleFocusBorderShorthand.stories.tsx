import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Provider, buttonClassName } from '@fluentui/react-northstar';
import { keys } from '../utilities';
import ProviderExampleFocusBorderShorthand from '../../examples/components/Provider/Types/ProviderExampleFocusBorder.shorthand';

const button = `.${buttonClassName}`;

export default {
  component: Provider,
  title: 'Provider',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .click(button)
          .keys(button, keys.downArrow)
          .snapshot('Show overridden border focused styles')
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Provider>;

export { ProviderExampleFocusBorderShorthand };
