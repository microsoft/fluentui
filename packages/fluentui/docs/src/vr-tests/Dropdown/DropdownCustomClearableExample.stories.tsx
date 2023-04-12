import { ComponentMeta } from '@storybook/react';
import { Dropdown } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DropdownCustomClearableExample from '../../examples/components/Dropdown/Visual/DropdownExampleCustomClearable.shorthand';

export default {
  component: Dropdown,
  title: 'Dropdown',
} as ComponentMeta<typeof Dropdown>;

const DropdownCustomClearableExampleTeams = getThemeStoryVariant(DropdownCustomClearableExample, 'teamsV2');

const DropdownCustomClearableExampleTeamsDark = getThemeStoryVariant(DropdownCustomClearableExample, 'teamsDarkV2');

const DropdownCustomClearableExampleTeamsHighContrast = getThemeStoryVariant(
  DropdownCustomClearableExample,
  'teamsHighContrast',
);

export {
  DropdownCustomClearableExample,
  DropdownCustomClearableExampleTeams,
  DropdownCustomClearableExampleTeamsDark,
  DropdownCustomClearableExampleTeamsHighContrast,
};
