import { Steps as OriginalSteps } from 'screener-storybook/src/screener';

OriginalSteps.prototype.setRTL = function (isRTL: boolean = false) {

  var step = {
    type: 'executeScript',
    code: `document.documentElement.setAttribute("dir", ${isRTL ? '"rtl"' : '"ltr"'})`
  };

  this.steps.push(step);
  return this;
};

export const Steps = OriginalSteps;
