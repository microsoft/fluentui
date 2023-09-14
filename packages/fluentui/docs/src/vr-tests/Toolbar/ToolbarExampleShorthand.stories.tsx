import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Toolbar, toolbarClassName, toolbarItemClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ToolbarExampleShorthand from '../../examples/components/Toolbar/Usage/ToolbarExampleWithTooltip.shorthand';

const selectors = {
  item: (itemIndex: number) => `.${toolbarClassName} .${toolbarItemClassName}:nth-child(${itemIndex})`,
};

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .hover(selectors.item(1))
          .snapshot('Hovers 1st item (show tooltip)')
          .click(selectors.item(1))
          .keys(selectors.item(1), Keys.rightArrow)
          .snapshot('Navigates to next item (shows tooltip)')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

const ToolbarExampleShorthandTeams = getThemeStoryVariant(ToolbarExampleShorthand, 'teamsV2');

const ToolbarExampleShorthandTeamsDark = getThemeStoryVariant(ToolbarExampleShorthand, 'teamsDarkV2');

const ToolbarExampleShorthandTeamsHighContrast = getThemeStoryVariant(ToolbarExampleShorthand, 'teamsHighContrast');

export {
  ToolbarExampleShorthand,
  ToolbarExampleShorthandTeams,
  ToolbarExampleShorthandTeamsDark,
  ToolbarExampleShorthandTeamsHighContrast,
};
