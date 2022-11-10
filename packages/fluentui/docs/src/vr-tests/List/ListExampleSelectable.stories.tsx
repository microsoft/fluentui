import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { List, listItemClassName, listClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant, keys } from '../utilities';
import ListExampleSelectable from '../../examples/components/List/Types/ListExampleSelectable.shorthand';

const selectors = {
  list: `.${listClassName}`,
  item: (itemIndex: number) => `.${listClassName} .${listItemClassName}:nth-of-type(${itemIndex})`,
};

export default {
  component: List,
  title: 'List',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .hover(selectors.item(2))
          .snapshot('Highlights an item')
          .click(selectors.item(2))
          .snapshot('Selects an item')
          .hover(selectors.item(3))
          .snapshot('Highlights another item')
          .end()}
      >
        {story()}
      </Screener>
    ),
    story => <Screener steps={new Steps().keys('body', keys.tab).snapshot('Focuses item').end()}>{story()}</Screener>,
  ],
} as ComponentMeta<typeof List>;

const ListExampleSelectableTeams = getThemeStoryVariant(ListExampleSelectable, 'teamsV2');

const ListExampleSelectableTeamsDark = getThemeStoryVariant(ListExampleSelectable, 'teamsDarkV2');

const ListExampleSelectableTeamsHighContrast = getThemeStoryVariant(ListExampleSelectable, 'teamsHighContrast');

export {
  ListExampleSelectable,
  ListExampleSelectableTeams,
  ListExampleSelectableTeamsDark,
  ListExampleSelectableTeamsHighContrast,
};
