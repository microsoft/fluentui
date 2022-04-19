import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';
import { treeItemClassName, treeTitleClassName } from '@fluentui/react-northstar';

const selectors = {
  treeTitle: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleClassName}`,
};

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [(builder, keys) => builder.click(selectors.treeTitle(1)).click(selectors.treeTitle(2)).snapshot('Exapanded')],
};

export default config;
