import { listItemClassName, listClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const selectors = {
  list: `.${listClassName}`,
  item: (itemIndex: number) => `.${listClassName} .${listItemClassName}:nth-of-type(${itemIndex})`,
};

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    (builder, keys) =>
      builder
        .hover(selectors.item(2))
        .snapshot('Highlights an item')
        .click(selectors.item(2))
        .snapshot('Clicks on an item')
        .hover(selectors.item(3))
        .snapshot('Highlights another item')
        .keys(selectors.item(2), keys.downArrow)
        .snapshot('Focuses last item using keyboard'),
    (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses item'),
  ],
};

export default config;
