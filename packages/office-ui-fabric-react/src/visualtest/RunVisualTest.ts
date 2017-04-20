
import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
import { Enum } from "typescript-string-enums";
import { IRunVisualTest } from './IRunVisualTest';
export const enum EventLayer { SINGLE = 0, DOUBLE = 1, };
export const IdType = Enum({ CLASSNAME: ".", ID: '#' });
export const enum ScreenEvent { DEFAULT = 0, HOVERED = 1, DOWN = 2, CLICK = 3, DOUBLECLICK = 4 };
export const FileExtn = Enum({ DEFAULT: "_default", HOVERED: "_hovered", DOWN: '_pressed', CLICK: '_clicked' });

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

export class RunVisualTest {
  private phanta: IPhantomCSS;
  private casps: Casper;
  private componentId: string;
  private componentIdType;
  private eventType: EventLayer;
  private eventList: ScreenEvent[];
  private secondLayer?: RunVisualTest;
  private componentExtnid;
  private fileName: string;
  private eventFunctions;
  constructor(props: IRunVisualTest) {

    this.casps = casper;
    this.phanta = phantomcss;
    this.componentId = props.componentId;
    this.componentIdType = props.componentIdType;
    this.eventType = props.eventType;
    this.eventList = props.eventList;
    this.secondLayer = props.secondLayer;
    this.fileName = props.componentId;
    this.componentExtnid = props.componentIdType + props.componentId;
    this.eventFunctions = props.eventFunctions;
  }

  /* tslint:disable:no-function-expression */
  public runCasper() {
    let self = this;

    switch (self.eventType) {
      case EventLayer.SINGLE:
        self.listEventScreenshot();
        break;
      case EventLayer.DOUBLE:
        self.runEvent(self.eventList[0]);
        casper.then(function () {
          let temp1: RunVisualTest;
          temp1 = self.secondLayer;
          temp1.listEventScreenshot();
        });
        break;
    }
  }

  /* tslint:enable:no-function-expression */

  public endTest() {
    this.casps.run(function () { this.casps.test.done(); });
  }


  public defaultScreenshotfn(casps, phanta, componentExtnid, fileName) {
    casps.then(function () {
      phanta.screenshot(componentExtnid, fileName);
    });
  }

  public defaultScreenshot() {
    let self = this;
    this.casps.then(function () {
      self.phanta.screenshot(self.componentExtnid, self.fileName + FileExtn.DEFAULT);
    });
  }

  public mouseMoveScreenshot() {
    let self = this;
    this.casps.then(function () {
      this.mouse.move(self.componentExtnid);
      self.phanta.screenshot(self.componentExtnid, self.fileName + FileExtn.HOVERED);
    });
  }

  public mouseDownScreenshot() {
    let self = this;
    this.casps.then(function () {
      this.mouse.down(self.componentExtnid);
      self.phanta.screenshot(self.componentExtnid, self.fileName + FileExtn.DOWN);
    });
  }

  public mouseDoubleClickedScreenshot() {
    let self = this;
    this.casps.then(function () {
      this.click(self.componentExtnid);
      self.phanta.screenshot(self.componentExtnid, self.fileName + FileExtn.CLICK);
      this.click(self.componentExtnid);
    });
  }

  public mouseClickedScreenshot() {
    let self = this;
    this.casps.then(function () {
      this.click(self.componentExtnid);
      self.phanta.screenshot(self.componentExtnid, self.fileName + FileExtn.CLICK);

    });
  }

  public listEventScreenshot() {
    let self = this;
    self.eventList.map(function (event) {
      self.runEvent(event);
    });

  }

  public runEvent(event) {
    switch (event) {
      case ScreenEvent.DOUBLECLICK:
        this.mouseDoubleClickedScreenshot();
        break;
      case ScreenEvent.CLICK:
        this.mouseClickedScreenshot();
        break;
      case ScreenEvent.DEFAULT:
        this.defaultScreenshot();
        break;
      case ScreenEvent.DOWN:
        this.mouseDownScreenshot();
        break;
      case ScreenEvent.HOVERED:
        this.mouseMoveScreenshot();
        break;
    }
  }
}

