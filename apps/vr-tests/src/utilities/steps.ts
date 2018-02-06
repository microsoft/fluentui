import { Steps as OriginalSteps } from 'screener-storybook/src/screener';

OriginalSteps.prototype.RTL = function (code, isAsync) {
  var step = {
    type: 'executeScript',
    code: 'document.documentElement.setAttribute("dir", "rtl")',
    isAsync: false
  };
  if (isAsync === true) {
    step.isAsync = true;
  }
  this.steps.push(step);
  return this;
};

OriginalSteps.prototype.LTR = function (code, isAsync) {
  var step = {
    type: 'executeScript',
    code: 'document.documentElement.setAttribute("dir", "ltr")',
    isAsync: false
  };
  if (isAsync === true) {
    step.isAsync = true;
  }
  this.steps.push(step);
  return this;
};

export const Steps = OriginalSteps;
