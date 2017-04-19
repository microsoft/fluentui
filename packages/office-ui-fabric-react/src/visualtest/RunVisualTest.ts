
import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
declare var phantomcss: IPhantomCSS;

import { Enum } from "typescript-string-enums";

export const enum eventLayer {
  SINGLE = 0,
  DOUBLE = 1,
};

const fileExtn = Enum({
  DEFAULT: "_default",
  HOVERED: "_hovered",
  DOWN: "_pressed",
  CLICK: "_clicked"
});

export const enum screenEvent {
  DEFAULT = 0,
  HOVERED = 1,
  DOWN = 2,
  CLICK = 3,
  DOUBLECLICK = 4

};

export const idType = Enum({
  CLASSNAME: ".",
  ID: '#'
});


export class RunVisualTest {

  private componentId: string;
  private componentIdType;
  private eventType: [eventLayer];
  private eventList: [screenEvent];
  private secondLayer: RunVisualTest;
  private componentExtnid;
  private casps: Casper;
  private fileName: string;
  private phanta: IPhantomCSS;

  constructor(casper, componentId, componentIdType, eventType, eventList, secondLayer) {
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
      case screenEvent.DOUBLECLICK:
        self.mouseDoubleClickedScreenshot();
        break;
      case screenEvent.CLICK:
        self.mouseClickedScreenshot();
        break;
      case screenEvent.DEFAULT:
        self.defaultScreenshot();
        break;
      case screenEvent.DOWN:
        self.mouseDownScreenshot();
        break;
      case screenEvent.HOVERED:
        self.mouseMoveScreenshot();
        break;
    }
  }
}
