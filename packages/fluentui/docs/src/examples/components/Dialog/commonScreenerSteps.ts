import { buttonClassName } from '@fluentui/react-northstar';
import { ScreenerSteps } from '@fluentui/scripts/screener';

const button = `.${buttonClassName}`;

const getScreenerSteps = (): ScreenerSteps => [
  (builder) => builder.click(button).snapshot('Clicks the trigger button'),
];

export default getScreenerSteps;
