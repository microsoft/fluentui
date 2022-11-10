// eslint-disable-next-line import/no-extraneous-dependencies
import { Steps } from 'screener-storybook/src/screener';
import { buttonClassName } from '@fluentui/react-northstar';

const button = `.${buttonClassName}`;

const screenerSteps = new Steps().click(button).snapshot('Clicks the trigger button').end();

export default screenerSteps;
