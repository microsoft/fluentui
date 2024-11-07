import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Meta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import MenuExamplePositioningShorthand from '../../examples/components/Menu/Visual/MenuExamplePositioning.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click('#set-open')
          .snapshot('Default positioning')
          .click('#above')
          .snapshot('Sets positions to above')
          .click('#before')
          .snapshot('Sets positions to before')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as Meta<typeof Menu>;

export { MenuExamplePositioningShorthand };
