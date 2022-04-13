import { treeTitleClassName, treeItemClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const selectors = {
  treeItem: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex})`,
  treeTitle: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleClassName}`,
};

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
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
