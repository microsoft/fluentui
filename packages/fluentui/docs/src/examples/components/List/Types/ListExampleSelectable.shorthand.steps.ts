import { List, listClassName } from '@fluentui/react-northstar';

const selectors = {
  list: `.${listClassName}`,
  item: (itemIndex: number) =>
    `.${List.deprecated_className} .${List.Item.deprecated_className}:nth-of-type(${itemIndex})`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .hover(selectors.item(2))
        .snapshot('Highlights an item')
        .click(selectors.item(2))
        .snapshot('Selects an item')
        .hover(selectors.item(3))
        .snapshot('Highlights another item'),
    (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses item'),
  ],
};

export default config;
