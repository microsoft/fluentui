
import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { IRunVisualTest } from './IRunVisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

export function defaultScreenshot(params: IRunVisualTest) {
  casper.then(() => {
    phantomcss.screenshot(params.componentExtnid, params.fileName + '_default');
  });
  if (params.childParam) {
    params.childParam.command.forEach(commandList => {
      commandList(params.childParam);
    });
  }
}

export function mouseMoveScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    this.mouse.move(params.componentExtnid);
    phantomcss.screenshot(params.componentExtnid, params.fileName + '_mouseMove');
  });
  if (params.childParam) {
    params.childParam.command.forEach(commandList => {
      commandList(params.childParam);
    });
  }
}

export function mouseDownScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    this.mouse.down(params.componentExtnid);
    phantomcss.screenshot(params.componentExtnid, params.fileName + '_mouseDown');
  });
  if (params.childParam) {
    params.childParam.command.forEach(commandList => {
      commandList(params.childParam);
    });
  }
}
export function mouseClickScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    this.click(params.componentExtnid);
    phantomcss.screenshot(params.componentExtnid, params.fileName + '_mouseClick');
    this.click(params.componentExtnid);
  });
  if (params.childParam) {
    params.childParam.command.forEach(commandList => {
      commandList(params.childParam);
    });
  }
}
export function mouseSingleClickScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    this.click(params.componentExtnid);
    phantomcss.screenshot(params.componentExtnid, params.fileName + '_mouseSingleClick');
  });
  if (params.childParam) {
    params.childParam.command.forEach(commandList => {
      commandList(params.childParam);
    });
  }
}
