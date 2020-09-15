import { ScreenerRunnerStep, ScreenerRunnerKeys, ScreenerStepBuilder, ScreenerThemeName } from './screener.types';

export const keys: ScreenerRunnerKeys = {
  alt: '\uE00A',
  control: '\uE009',
  enter: '\uE007',
  escape: '\uE00C',
  return: '\uE006',
  shift: '\uE008',
  tab: '\uE004',
  leftArrow: '\uE012',
  upArrow: '\uE013',
  rightArrow: '\uE014',
  downArrow: '\uE015',
  backSpace: '\uE003',
  space: '\uE00D',
  pageUp: '\uE00E',
  pageDown: '\uE00F',
  end: '\uE010',
  home: '\uE011',
  insert: '\uE016',
  delete: '\uE017',
  command: '\uE03D',
};

export class Steps implements ScreenerStepBuilder {
  steps: ScreenerRunnerStep[] = [];

  url = (url: string) => {
    this.steps.push({
      type: 'url',
      url: url,
    });

    return this;
  };

  /** This will capture a visual snapshot. */
  snapshot = (name: string) => {
    this.steps.push({
      type: 'saveScreenshot',
      name: name,
    });

    return this;
  };

  /** This will click on the first element matching the provided css selector. */
  click = (selector: string) => {
    this.steps.push({
      type: 'clickElement',
      locator: {
        type: 'css selector',
        value: selector,
      },
    });

    return this;
  };

  /** This will move the mouse over the first element matching the provided css selector. */
  hover = (selector: string) => {
    this.steps.push({
      type: 'moveTo',
      locator: {
        type: 'css selector',
        value: selector,
      },
    });

    return this;
  };

  /** This will press and hold the mouse button over the first element matching the provided css selector. */
  mouseDown = (selector: string) => {
    this.steps.push({
      type: 'clickAndHoldElement',
      locator: {
        type: 'css selector',
        value: selector,
      },
    });

    return this;
  };

  /** This will release the mouse button. selector is optional. */
  mouseUp = (selector: string) => {
    this.steps.push({
      type: 'releaseElement',
      locator: {
        type: 'css selector',
        value: selector,
      },
    });

    return this;
  };

  /** This will set the value of the input field matching the provided css selector. */
  setValue = (selector: string, text: string) => {
    this.steps.push({
      type: 'setElementText',
      locator: {
        type: 'css selector',
        value: selector,
      },
      text: text,
    });

    return this;
  };

  /** This will send the provided keys to the first element matching the provided css selector. */
  keys = (selector: string, keys: string) => {
    this.steps.push({
      type: 'sendKeys',
      locator: {
        type: 'css selector',
        value: selector,
      },
      keys: keys,
    });
    return this;
  };

  /** This will set cursor focus on the first element matching the provided css selector. */
  focus = (selector: string) => {
    return this.keys(selector, '');
  };

  /** This executes custom JS code against the client browser the test is running in. */
  executeScript = code => {
    this.steps.push({
      type: 'executeScript',
      code: code,
    });

    return this;
  };

  /** This will pause execution for the specified number of ms. */
  wait = (ms: number) => {
    this.steps.push({
      type: 'pause',
      waitTime: ms,
    });

    return this;
  };

  /** This will set the current UI state to right-to-left direction. */
  rtl = () => {
    this.steps.push({
      type: 'executeScript',
      code: 'document.documentElement.dir = "rtl";',
    });

    return this;
  };

  /** This will set the current UI state to left-to-right direction. */
  ltr = () => {
    this.steps.push({
      type: 'executeScript',
      code: 'document.documentElement.dir = "ltr";',
    });

    return this;
  };

  /** This will override the global cssAnimations option for the current UI state. Set to true to enable CSS Animations, and set to false to disable. */
  cssAnimations = isEnabled => {
    this.steps.push({
      type: 'cssAnimations',
      isEnabled: isEnabled,
    });

    return this;
  };

  /** This will return the steps to be run. */
  end = () => {
    return this.steps;
  };

  /** This will reset the layout. */
  resetExternalLayout = () => {
    return this.executeScript(`window.resetExternalLayout()`);
  };

  /** This will switch the theme. */
  switchTheme = (themeName: ScreenerThemeName) => {
    return this.executeScript(`window.switchTheme("${themeName}")`);
  };
}
