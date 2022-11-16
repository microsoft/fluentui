// eslint-disable-next-line import/no-extraneous-dependencies
import { Steps } from 'storywright';
import { alertDismissActionClassName } from '@fluentui/react-northstar';
import { keys } from '../utilities/utils';

const selectors = {
  dismissAction: `.${alertDismissActionClassName}`,
};

export const getFocusStoryWrightSteps = new Steps()
  .keys('body', keys.tab)
  .snapshot('Focuses the action button')
  .hover(selectors.dismissAction)
  .snapshot('Hovers the focused action button')
  .end();

export const getHoverStoryWrightSteps = new Steps()
  .hover(selectors.dismissAction)
  .snapshot('Hovers the action button')
  .end();
