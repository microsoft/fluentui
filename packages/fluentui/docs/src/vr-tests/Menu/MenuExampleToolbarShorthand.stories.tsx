import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Menu, menuClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import MenuExampleToolbarShorthand from '../../examples/components/Menu/Usage/MenuExampleToolbar.shorthand';

const selectors = {
  menu: `.${menuClassName}`,
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
  lastItem: `.${menuClassName} li:last-child a`,
};

export default {
  component: Menu,
  title: 'Menu',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .hover(selectors.item(2))
          .snapshot('Hovers 2nd item (hover state styles)')
          .click(selectors.item(2))
          .snapshot('Clicks on 2nd item (active state styles)')
          .keys(selectors.item(2), Keys.rightArrow)
          .snapshot('Navigates to next item (focus state styles)')
          .keys(selectors.item(5), Keys.leftArrow)
          .snapshot('Navigates to previous item (active and focus state styles)')
          .click(selectors.lastItem)
          .snapshot('Clicks on the last item and opens submenu')
          .keys(selectors.lastItem, Keys.downArrow)
          .snapshot('Focuses on the first element in the submenu')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Menu>;

const MenuExampleToolbarShorthandTeams = getThemeStoryVariant(MenuExampleToolbarShorthand, 'teamsV2');

const MenuExampleToolbarShorthandTeamsDark = getThemeStoryVariant(MenuExampleToolbarShorthand, 'teamsDarkV2');

const MenuExampleToolbarShorthandTeamsHighContrast = getThemeStoryVariant(
  MenuExampleToolbarShorthand,
  'teamsHighContrast',
);

export {
  MenuExampleToolbarShorthand,
  MenuExampleToolbarShorthandTeams,
  MenuExampleToolbarShorthandTeamsDark,
  MenuExampleToolbarShorthandTeamsHighContrast,
};
