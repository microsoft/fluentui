import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Provider, buttonClassName } from '@fluentui/react-northstar';
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
          .keys(button, Keys.downArrow)
          .snapshot('Show overridden border focused styles')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Provider>;

export { ProviderExampleFocusBorderShorthand };
