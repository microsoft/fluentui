import { Button } from '@fluentui/react-future';

const button = `.${Button.className}`;

const getScreenerSteps = (): ScreenerSteps => [builder => builder.click(button).snapshot('Clicks the trigger button')];

export default getScreenerSteps;
