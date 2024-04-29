import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Popup, buttonClassName, dropdownSlotClassNames } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import PopupControlledExample from '../../examples/components/Popup/Usage/PopupExampleCloseButton.shorthand';

const selectors = {
  toggleIndicator: `.${dropdownSlotClassNames.toggleIndicator}`,
  item: (itemIndex: number) => `.${dropdownSlotClassNames.itemsList} li:nth-child(${itemIndex})`,
  popupTrigger: `.${buttonClassName}`,
};

export default {
  component: Popup,
  title: 'Popup',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(selectors.popupTrigger)
          .click(selectors.toggleIndicator)
          .hover(selectors.item(2))

          // A hack to load images properly in StoryWright
          .wait(500)

          .snapshot('Prepares to select item out of popup.')
          .click(selectors.item(2))
          .snapshot('Item should be selected.')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Popup>;

const PopupControlledExampleTeams = getThemeStoryVariant(PopupControlledExample, 'teamsV2');

const PopupControlledExampleTeamsDark = getThemeStoryVariant(PopupControlledExample, 'teamsDarkV2');

const PopupControlledExampleTeamsHighContrast = getThemeStoryVariant(PopupControlledExample, 'teamsHighContrast');

export {
  PopupControlledExample,
  PopupControlledExampleTeams,
  PopupControlledExampleTeamsDark,
  PopupControlledExampleTeamsHighContrast,
};
