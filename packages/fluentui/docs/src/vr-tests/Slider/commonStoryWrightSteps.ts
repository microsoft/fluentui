import { Keys, Steps } from 'storywright';
import { sliderSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  input: `.${sliderSlotClassNames.input}`,
};

export const focusSliderSteps = new Steps().keys('body', Keys.tab).end();

export const rightArrowSteps = new Steps()
  .keys('body', Keys.tab)
  .keys(selectors.input, Keys.rightArrow)
  .keys(selectors.input, Keys.rightArrow)
  .keys(selectors.input, Keys.rightArrow)
  .keys(selectors.input, Keys.rightArrow)
  .keys(selectors.input, Keys.rightArrow)
  .snapshot('Navigates to the right with the right arrow key')
  .end();

export const upArrowSteps = new Steps()
  .keys('body', Keys.tab)
  .keys(selectors.input, Keys.upArrow)
  .keys(selectors.input, Keys.upArrow)
  .keys(selectors.input, Keys.upArrow)
  .keys(selectors.input, Keys.upArrow)
  .keys(selectors.input, Keys.upArrow)
  .snapshot('Navigates to the right with the up arrow key')
  .end();
