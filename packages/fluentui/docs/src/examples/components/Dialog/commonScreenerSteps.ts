import { buttonClassName } from '@fluentui/react-northstar';

const button = `.${buttonClassName}`;

const getScreenerSteps = (): ScreenerSteps => [builder => builder.click(button).snapshot('Clicks the trigger button')];

export default getScreenerSteps;
