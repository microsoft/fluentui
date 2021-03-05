import { buttonClassName } from '@fluentui/react-northstar';
import { ScreenerSteps } from '@fluentui/scripts/screener';

const button = `.${buttonClassName}`;

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.hover(button).snapshot('Hovers the first button'),
  builder => builder.click(button).snapshot('Clicks the first button'),
  (builder, keys) => builder.keys(button, keys.tab).snapshot('Focuses on the second button'),
];

export default getScreenerSteps;
