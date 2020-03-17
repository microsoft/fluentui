import { Checkbox } from '@fluentui/react-future';

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.click(`.${Checkbox.className}`).snapshot('Checks checkbox'),
  (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses checkbox')
];

export default getScreenerSteps;
