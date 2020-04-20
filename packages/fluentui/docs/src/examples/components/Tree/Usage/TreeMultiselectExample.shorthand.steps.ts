import { TreeItem, TreeTitle } from '@fluentui/react-northstar';

const selectors = {
  treeTitle: (itemIndex: number) =>
    `.${TreeItem.deprecated_className}:nth-of-type(${itemIndex}) .${TreeTitle.deprecated_className}`,
  selectionIndicator: (itemIndex: number) =>
    `.${TreeItem.deprecated_className}:nth-of-type(${itemIndex}) .${TreeTitle.slotClassNames.indicator}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
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
        .snapshot('selected, when clicked on tree title')
        .click(selectors.selectionIndicator(2))
        .snapshot('all children selected')
        .keys(selectors.treeTitle(7), keys.space)
        .snapshot('selected, when space pressed'),
  ],
};

export default config;
