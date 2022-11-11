import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Tree, treeItemClassName, treeTitleClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import TreeTitleCustomizationExample from '../../examples/components/Tree/Usage/TreeTitleCustomizationExample.shorthand';

const selectors = {
  treeTitle: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleClassName}`,
};

export default {
  component: Tree,
  title: 'Tree',
  decorators: [
    story => (
      <Screener
        steps={new Steps().click(selectors.treeTitle(1)).click(selectors.treeTitle(2)).snapshot('Exapanded').end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Tree>;

const TreeTitleCustomizationExampleTeams = getThemeStoryVariant(TreeTitleCustomizationExample, 'teamsV2');

const TreeTitleCustomizationExampleTeamsDark = getThemeStoryVariant(TreeTitleCustomizationExample, 'teamsDarkV2');

const TreeTitleCustomizationExampleTeamsHighContrast = getThemeStoryVariant(
  TreeTitleCustomizationExample,
  'teamsHighContrast',
);

export {
  TreeTitleCustomizationExample,
  TreeTitleCustomizationExampleTeams,
  TreeTitleCustomizationExampleTeamsDark,
  TreeTitleCustomizationExampleTeamsHighContrast,
};
