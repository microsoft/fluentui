import { TreeItem, TreeTitle } from '@fluentui/react-northstar';

const selectors = {
  treeItem: (itemIndex: number) => `.${TreeItem.className}:nth-of-type(${itemIndex})`,
  treeTitle: (itemIndex: number) => `.${TreeItem.className}:nth-of-type(${itemIndex}) .${TreeTitle.className}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(selectors.treeTitle(1))
        .snapshot('Focus on click subtree')
        .keys(selectors.treeItem(2), keys.downArrow)
        .snapshot('Focus on keyboard subtree')
        .click(selectors.treeTitle(2))
        .keys(selectors.treeItem(2), keys.downArrow)
        .snapshot('Focus on keyboard leaf')
        .click(selectors.treeTitle(4))
        .snapshot('Focus on click leaf'),
  ],
};

export default config;
