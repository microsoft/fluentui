import { treeItemClassName, treeTitleClassName, treeTitleSlotClassNames } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const selectors = {
  treeTitle: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleClassName}`,
  treeItem: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex})`,
  selectionIndicator: (itemIndex: number) =>
    `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleSlotClassNames.indicator}`,
};

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    (builder, keys) =>
      builder
        .hover(selectors.treeTitle(1))
        .snapshot('hover first, indicator visible for first item')
        .hover(selectors.treeTitle(2))
        .snapshot('hover second, indicator visible for second item')
        .click(selectors.treeTitle(2))
        .snapshot('second expanded, indicator always visible')
        .click(selectors.selectionIndicator(2))
        .snapshot('second group all selected')
        .click(selectors.treeTitle(2))
        .snapshot('second collapsed, indicator visible when has children item selected')
        .click(selectors.treeTitle(1))
        .click(selectors.treeTitle(2))
        .click(selectors.selectionIndicator(3))
        .snapshot('first group expanded and partially selected')
        .click(selectors.treeTitle(1))
        .snapshot('first group collapsed and partially selected'),
  ],
};

export default config;
