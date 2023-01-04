import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { List, listItemClassName, listClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ListExampleNavigable from '../../examples/components/List/Types/ListExampleNavigable.shorthand';

const selectors = {
  list: `.${listClassName}`,
  item: (itemIndex: number) => `.${listClassName} .${listItemClassName}:nth-of-type(${itemIndex})`,
};

export default {
  component: List,
  title: 'List',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .hover(selectors.item(2))
          .snapshot('Highlights an item')
          .click(selectors.item(2))
          .snapshot('Clicks on an item')
          .hover(selectors.item(3))
          .snapshot('Highlights another item')
          .keys(selectors.item(2), Keys.downArrow)
          .snapshot('Focuses last item using keyboard')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
    story => (
      <StoryWright steps={new Steps().keys('body', Keys.tab).snapshot('Focuses item').end()}>{story()}</StoryWright>
    ),
  ],
} as ComponentMeta<typeof List>;

const ListExampleNavigableTeams = getThemeStoryVariant(ListExampleNavigable, 'teamsV2');

const ListExampleNavigableTeamsDark = getThemeStoryVariant(ListExampleNavigable, 'teamsDarkV2');

const ListExampleNavigableTeamsHighContrast = getThemeStoryVariant(ListExampleNavigable, 'teamsHighContrast');

export {
  ListExampleNavigable,
  ListExampleNavigableTeams,
  ListExampleNavigableTeamsDark,
  ListExampleNavigableTeamsHighContrast,
};
