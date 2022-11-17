/* eslint-disable import/no-extraneous-dependencies */
import { Steps } from 'storywright';
import { attachmentClassName, attachmentActionClassName } from '@fluentui/react-northstar';
import { keys } from '../utilities/utils';

const selectors = {
  root: `.${attachmentClassName}`,
  action: `.${attachmentActionClassName}`,
};

const StoryWrightSteps = new Steps()
  .hover(selectors.root)
  .snapshot('Hovers root')
  .keys('body', keys.tab)
  .snapshot('Focuses root')
  .hover(selectors.action)
  .snapshot('Hovers action')
  .keys('body', keys.tab)
  .keys('body', keys.tab)
  .snapshot('Focuses action')
  .end();

export default StoryWrightSteps;
