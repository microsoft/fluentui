import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Tree, treeItemClassName, treeTitleClassName, treeTitleSlotClassNames } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import TreeMultiselectExample from '../../examples/components/Tree/Usage/TreeMultiselectExample.shorthand';

const selectors = {
  treeTitle: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleClassName}`,
  treeItem: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex})`,
  selectionIndicator: (itemIndex: number) =>
    `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleSlotClassNames.indicator}`,
};

export default {
  component: Tree,
  title: 'Tree',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(selectors.treeTitle(1))
          .snapshot('first expanded, not custom checkbox visible')
          .click(selectors.treeTitle(2))
          .click(selectors.treeTitle(6))
          .click(selectors.treeTitle(10))
          .click(selectors.treeTitle(11))
          .snapshot('default selected states')
          .click(selectors.selectionIndicator(12))
          .snapshot('selected, when clicked on selection indicator')
          .click(selectors.treeTitle(13))
          .snapshot('selected, when clicked on selection indicator')
          .click(selectors.treeTitle(4))
          .snapshot('selected, when group partially selected')
          .click(selectors.selectionIndicator(2))
          .snapshot('all children selected')
          .keys(selectors.treeTitle(7), Keys.space)
          .snapshot('selected, when space pressed')
          .click(selectors.treeTitle(15))
          .click(selectors.selectionIndicator(15))
          .snapshot('group fully selected, when it has non selectable children')
          .click(selectors.selectionIndicator(15))
          .keys(selectors.treeTitle(16), Keys.space)
          .keys(selectors.treeTitle(17), Keys.space)
          .snapshot('selected, when group has non selectable item')
          .keys(selectors.treeItem(15), Keys.space)
          .snapshot('toggle group selected')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Tree>;

const TreeMultiselectExampleTeams = getThemeStoryVariant(TreeMultiselectExample, 'teamsV2');

const TreeMultiselectExampleTeamsDark = getThemeStoryVariant(TreeMultiselectExample, 'teamsDarkV2');

const TreeMultiselectExampleTeamsHighContrast = getThemeStoryVariant(TreeMultiselectExample, 'teamsHighContrast');

export {
  TreeMultiselectExample,
  TreeMultiselectExampleTeams,
  TreeMultiselectExampleTeamsDark,
  TreeMultiselectExampleTeamsHighContrast,
};
