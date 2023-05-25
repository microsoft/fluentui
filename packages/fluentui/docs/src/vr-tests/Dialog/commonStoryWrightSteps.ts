import { Steps } from 'storywright';
import { buttonClassName } from '@fluentui/react-northstar';

const button = `.${buttonClassName}`;

const StoryWrightSteps = new Steps().click(button).snapshot('Clicks the trigger button').end();

export default StoryWrightSteps;
