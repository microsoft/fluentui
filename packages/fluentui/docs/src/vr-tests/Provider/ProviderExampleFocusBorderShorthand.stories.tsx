import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryWright, Steps } from 'storywright';
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
      <StoryWright
        steps={new Steps()
          .click(button)
          .keys(button, keys.downArrow)
          .snapshot('Show overridden border focused styles')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Provider>;

export { ProviderExampleFocusBorderShorthand };
