
import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
import { Enum } from "typescript-string-enums";
import { IRunVisualTest } from './IRunVisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

export class RunVisualTest {

  componentExtnid: string;
  fileName: string;

  constructor(props: IRunVisualTest) {
    this.componentExtnid = props.componentExtnid;
    this.fileName = props.fileName;
  }
}

export function defaultScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    phantomcss.screenshot(params.componentExtnid, params.fileName + '_default');
  });
}

export function mouseMoveScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    this.mouse.move(params.componentExtnid);
    phantomcss.screenshot(params.componentExtnid, params.fileName + '_mouseMove');
  });
}

export function mouseDownScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    this.mouse.down(params.componentExtnid);
    phantomcss.screenshot(params.componentExtnid, params.fileName + '_mouseDown');
  });
}
export function mouseClickScreenshot(params: IRunVisualTest) {
  casper.then(function () {
    this.click(params.componentExtnid);
    phantomcss.screenshot(params.componentExtnid, params.fileName + '_mouseClick');
    this.click(params.componentExtnid);
  });
}
