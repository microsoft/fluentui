import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import MenuExamplePositioningUpdateShorthand from '../../examples/components/Menu/Visual/MenuExamplePositioningUpdate.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click('#set-open')
          .snapshot('Default positioning')
          .click('#set-height')
          .snapshot('Updates height to collide with top edge')
          .click('#reposition')
          .snapshot('Repositions properly')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Menu>;

export { MenuExamplePositioningUpdateShorthand };
