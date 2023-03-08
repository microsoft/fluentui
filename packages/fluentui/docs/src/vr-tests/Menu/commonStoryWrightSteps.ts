import { Keys, Steps } from 'storywright';
import { menuClassName } from '@fluentui/react-northstar';

export const selectors = {
  menu: `.${menuClassName}`,
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
};

const getStoryWrightSteps = ({ vertical = false, startItem = 2, endItem = 3 }) =>
  new Steps()
    .hover(selectors.item(startItem))
    .snapshot('Hovers 2nd item (hover state styles)')
    .click(selectors.item(startItem))
    .snapshot('Clicks on 2nd item (active state styles)')
    .keys(selectors.item(startItem), vertical ? Keys.downArrow : Keys.rightArrow)
    .snapshot('Navigates to next item (focus state styles)')
    .keys(selectors.item(endItem), vertical ? Keys.upArrow : Keys.leftArrow)
    .snapshot('Navigates to previous item (active and focus state styles)')
    .end();

export default getStoryWrightSteps;
