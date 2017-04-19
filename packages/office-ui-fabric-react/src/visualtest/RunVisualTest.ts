
import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
import { Enum } from "typescript-string-enums";
export const enum EventLayer { SINGLE = 0, DOUBLE = 1, };
export const IdType = Enum({ CLASSNAME: ".", ID: '#' });
export const enum ScreenEvent { DEFAULT = 0, HOVERED = 1, DOWN = 2, CLICK = 3, DOUBLECLICK = 4 };

const fileExtn = Enum({ DEFAULT: "_default", HOVERED: "_hovered", DOWN: "_pressed", CLICK: "_clicked" });
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

export class RunVisualTest {
  private componentId: string;
  private componentIdType;
  private eventType: EventLayer;
  private eventList: [ScreenEvent];
  private secondLayer: RunVisualTest;
  private componentExtnid;
  private casps: Casper;
  private fileName: string;
  private phanta: IPhantomCSS;

  constructor(componentId, componentIdType, eventType, eventList, secondLayer) {
    this.casps = casper;
    this.phanta = phantomcss;
    this.componentId = componentId;
    this.componentIdType = componentIdType;
    this.eventType = eventType;
    this.eventList = eventList;
    this.secondLayer = secondLayer;
    this.fileName = componentId;
    this.componentExtnid = componentIdType + componentId;

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
        let temp1: RunVisualTest;
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

  public defaultScreenshot() {
    let self = this;
    this.casps.then(function () {
      self.phanta.screenshot(self.componentExtnid, self.fileName + fileExtn.DEFAULT);
    });
  }

  public mouseMoveScreenshot() {
    let self = this;
    this.casps.then(function () {
      this.mouse.move(self.componentExtnid);
      self.phanta.screenshot(self.componentExtnid, self.fileName + fileExtn.HOVERED);
    });
  }

  public mouseDownScreenshot() {
    let self = this;
    this.casps.then(function () {
      this.mouse.down(self.componentExtnid);
      self.phanta.screenshot(self.componentExtnid, self.fileName + fileExtn.DOWN);
    });
  }

  public mouseDoubleClickedScreenshot() {
    let self = this;
    this.casps.then(function () {
      this.click(self.componentExtnid);
      self.phanta.screenshot(self.componentExtnid, self.fileName + fileExtn.CLICK);
      this.click(self.componentExtnid);
    });
  }

  public mouseClickedScreenshot() {
    let self = this;
    this.casps.then(function () {
      this.click(self.componentExtnid);
      self.phanta.screenshot(self.componentExtnid, self.fileName + fileExtn.CLICK);

    });
  }

  public listEventScreenshot() {
    let self = this;
    self.eventList.map(function (event) {
      self.runEvent(event);
    });

  }

  public runEvent(event) {
    let self = this;
    switch (event) {
      case ScreenEvent.DOUBLECLICK:
        self.mouseDoubleClickedScreenshot();
        break;
      case ScreenEvent.CLICK:
        self.mouseClickedScreenshot();
        break;
      case ScreenEvent.DEFAULT:
        self.defaultScreenshot();
        break;
      case ScreenEvent.DOWN:
        self.mouseDownScreenshot();
        break;
      case ScreenEvent.HOVERED:
        self.mouseMoveScreenshot();
        break;
    }
  }
}


export interface IRunVisualTest {
  componentId: string;
  componentIdType;
  eventType: EventLayer;
  eventList: [ScreenEvent];
  componentExtnid;
  casps: Casper;
  fileName: string;
  phanta: IPhantomCSS;
}
