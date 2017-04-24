
import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { IRunVisualTest } from './IRunVisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

export function defaultScreenshot(params: IRunVisualTest) {
  casper.then(() => {
    phantomcss.screenshot(params.selector, params.fileName + '_default');
  });
  if (params.childParams) {
    params.childParams.commands.forEach(commandList => {
      commandList(params.childParams);
    });
  }
}

export function mouseMoveScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    this.mouse.move(params.selector);
    phantomcss.screenshot(params.selector, params.fileName + '_mouseMove');
  });
  if (params.childParams) {
    params.childParams.commands.forEach(commandList => {
      commandList(params.childParams);
    });
  }
}

export function mouseDownScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    this.mouse.down(params.selector);
    phantomcss.screenshot(params.selector, params.fileName + '_mouseDown');
  });
  if (params.childParams) {
    params.childParams.commands.forEach(commandList => {
      commandList(params.childParams);
    });
  }
}
export function mouseClickScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    this.click(params.selector);
    phantomcss.screenshot(params.selector, params.fileName + '_mouseClick');
    this.click(params.selector);
  });
  if (params.childParams) {
    params.childParams.commands.forEach(commandList => {
      commandList(params.childParams);
    });
  }
}
export function mouseSingleClickScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    this.click(params.selector);
    phantomcss.screenshot(params.selector, params.fileName + '_mouseSingleClick');
  });
  if (params.childParams) {
    params.childParams.commands.forEach(commandList => {
      commandList(params.childParams);
    });
  }
}
