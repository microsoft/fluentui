// eslint-disable-next-line import/no-extraneous-dependencies
import { Steps } from 'storywright';
import { sliderSlotClassNames } from '@fluentui/react-northstar';
import { keys } from '../utilities';

const selectors = {
  input: `.${sliderSlotClassNames.input}`,
};

export const focusSliderSteps = new Steps().keys('body', keys.tab).end();

export const rightArrowSteps = new Steps()
  .keys('body', keys.tab)
  .keys(selectors.input, keys.rightArrow)
  .keys(selectors.input, keys.rightArrow)
  .keys(selectors.input, keys.rightArrow)
  .keys(selectors.input, keys.rightArrow)
  .keys(selectors.input, keys.rightArrow)
  .snapshot('Navigates to the right with the right arrow key')
  .end();

export const upArrowSteps = new Steps()
  .keys('body', keys.tab)
  .keys(selectors.input, keys.upArrow)
  .keys(selectors.input, keys.upArrow)
  .keys(selectors.input, keys.upArrow)
  .keys(selectors.input, keys.upArrow)
  .keys(selectors.input, keys.upArrow)
  .snapshot('Navigates to the right with the up arrow key')
  .end();
