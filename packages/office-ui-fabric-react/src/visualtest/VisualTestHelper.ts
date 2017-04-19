import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
import { RunVisualTest } from './RunVisualTest';
import { idType, screenEvent, eventLayer } from './RunVisualTest';



declare var casper: Casper;


let componentIds = [];

let eventList = [screenEvent.DEFAULT, screenEvent.DOWN, screenEvent.HOVERED, screenEvent.DOUBLECLICK];
let component = new RunVisualTest(casper, 'ContextualButton', idType.ID, eventLayer.SINGLE, eventList, null);
componentIds.push(component);

eventList = [screenEvent.DEFAULT, screenEvent.DOWN, screenEvent.HOVERED, screenEvent.DOUBLECLICK];
component = new RunVisualTest(casper, 'ContextualButtonDisabled', idType.ID, eventLayer.SINGLE, eventList, null);
componentIds.push(component);

eventList = [screenEvent.DEFAULT];
var childComponent = new RunVisualTest(casper, 'ms-ContextualMenu-list', idType.CLASSNAME, eventLayer.SINGLE, eventList, null);
eventList = [screenEvent.CLICK];
component = new RunVisualTest(casper, 'ContextualButton', idType.ID, eventLayer.DOUBLE, eventList, childComponent);
componentIds.push(component);

/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'contextualButton').
  then(function () {
    componentIds.map(function (test) {
      switch (test.eventType) {
        case eventLayer.SINGLE:
          test.listEventScreenshot();
          break;

        case eventLayer.DOUBLE:
          test.runEvent(test.eventList[0]);
          var temp1: RunVisualTest;
          casper.then(function () {
            temp1 = test.secondLayer;
            temp1.listEventScreenshot();
          });

          break;
      }
    });
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */

