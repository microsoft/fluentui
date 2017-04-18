
import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
declare var phantomcss: IPhantomCSS;

import { Enum } from "typescript-string-enums";

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
  CLICK = 3

};

export const idType = Enum({
  CLASSNAME: ".",
  ID: '#'
});

export class RunVisualTest {
  private casps: Casper;
  private id: string;
  private events;
  private fileName: string;
  private phanta: IPhantomCSS;

  constructor(casper, id, idExtn) {
    this.casps = casper;
    this.phanta = phantomcss;
    this.fileName = id.key;
    this.events = id.value;
    this.id = idExtn + id.key;

  }

  public endTest() {
    this.casps.run(function () { this.casps.test.done(); });
  }

  public defaultScreenshot() {
    let self = this;
    this.casps.then(function () {
      self.phanta.screenshot(self.id, self.fileName + fileExtn.DEFAULT);
    });
  }

  public mouseMoveScreenshot() {
    let self = this;
    this.casps.then(function () {
      this.mouse.move(self.id);
      self.phanta.screenshot(self.id, self.fileName + fileExtn.HOVERED);
    });
  }

  public mouseDownScreenshot() {
    let self = this;
    this.casps.then(function () {
      this.mouse.down(self.id);
      self.phanta.screenshot(self.id, self.fileName + fileExtn.DOWN);
    });
  }

  public mouseClickedScreenshot() {
    let self = this;
    this.casps.then(function () {
      this.click(self.id);
      self.phanta.screenshot(self.id, self.fileName + fileExtn.CLICK);
      this.click(self.id);
    });
  }

  public listEventScreenshot() {

    let self = this;
    self.events.map(function (event) {
      switch (event) {
        case screenEvent.CLICK:
          self.casps.then(function () {
            this.click(self.id);
            self.phanta.screenshot(self.id, self.fileName + fileExtn.CLICK);
            this.click(self.id);
          });
          break;
        case screenEvent.DEFAULT:
          self.casps.then(function () {
            self.phanta.screenshot(self.id, self.fileName + fileExtn.DEFAULT);
          });
          break;
        case screenEvent.DOWN:
          self.casps.then(function () {
            this.mouse.down(self.id);
            self.phanta.screenshot(self.id, self.fileName + fileExtn.DOWN);
          });
          break;
        case screenEvent.HOVERED:
          self.casps.then(function () {
            this.mouse.move(self.id);
            self.phanta.screenshot(self.id, self.fileName + fileExtn.HOVERED);
          });
          break;
      }
    });

  }
}