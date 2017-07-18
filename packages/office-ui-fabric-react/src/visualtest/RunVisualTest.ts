
import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { IRunVisualTest } from './IRunVisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

export function defaultScreenshot(params: IRunVisualTest) {
  let imageSelector = params.imageSelector || params.selector;

  casper.then(() => {
    phantomcss.screenshot(imageSelector, params.fileName + '_default');
  });
  if (params.childParams) {
    params.childParams.commands.forEach(commandList => {
      commandList(params.childParams!);
    });
  }
}

export function mouseMoveScreenshot(params: IRunVisualTest) {
  let imageSelector = params.imageSelector || params.selector;

  casper.then(function () {
    this.mouse.move(params.selector);
    phantomcss.screenshot(imageSelector, params.fileName + '_mouseMove');
  });
  if (params.childParams) {
    params.childParams.commands.forEach(commandList => {
      commandList(params.childParams!);
    });
  }
}

export function mouseDownScreenshot(params: IRunVisualTest) {
  let imageSelector = params.imageSelector || params.selector;

  casper.then(function () {
    this.mouse.down(params.selector);
    phantomcss.screenshot(imageSelector, params.fileName + '_mouseDown');
  });
  if (params.childParams) {
    params.childParams.commands.forEach(commandList => {
      commandList(params.childParams!);
    });
  }
}
export function mouseClickScreenshot(params: IRunVisualTest) {
  let imageSelector = params.imageSelector || params.selector;

  casper.then(function () {
    this.click(params.selector);
    phantomcss.screenshot(imageSelector, params.fileName + '_mouseClick');
  });
  casper.then(function () {
    this.click(params.selector);
  });
  if (params.childParams) {
    params.childParams.commands.forEach(commandList => {
      commandList(params.childParams!);
    });
  }
}

export function mouseSingleClickScreenshot(params: IRunVisualTest) {
  params.imageSelector = params.imageSelector || params.selector;

  casper.then(function () {
    this.click(params.selector);
  });
  if (params.childParams) {
    params.childParams.commands.forEach(commandList => {
      commandList(params.childParams!);
    });
  }
}
export function testRunner(componentIds: IRunVisualTest[]) {
  componentIds.forEach(element => {
    element.commands.forEach(command => {
      command(element);
    });
  });
}