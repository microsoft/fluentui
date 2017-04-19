import { Casper } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
import { RunVisualTest } from './RunVisualTest';
import { IdType, ScreenEvent, EventLayer } from './RunVisualTest';

declare var casper: Casper;

let componentIds = [];
let eventList = [ScreenEvent.DEFAULT, ScreenEvent.DOWN, ScreenEvent.HOVERED, ScreenEvent.DOUBLECLICK];
let component = new RunVisualTest('ContextualButton', IdType.ID, EventLayer.SINGLE, eventList, null);
componentIds.push(component);

eventList = [ScreenEvent.DEFAULT, ScreenEvent.DOWN, ScreenEvent.HOVERED, ScreenEvent.DOUBLECLICK];
component = new RunVisualTest('ContextualButtonDisabled', IdType.ID, EventLayer.SINGLE, eventList, null);
componentIds.push(component);

eventList = [ScreenEvent.DEFAULT];
var childComponent = new RunVisualTest('ms-ContextualMenu-list', IdType.CLASSNAME, EventLayer.SINGLE, eventList, null);
eventList = [ScreenEvent.CLICK];
component = new RunVisualTest('ContextualButton', IdType.ID, EventLayer.DOUBLE, eventList, childComponent);
componentIds.push(component);


// /* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'contextualButton').
  then(function () {
    componentIds.map(function (test) {
      test.runCasper();
    });
  });

casper.run(function () { casper.test.done(); });
// /* tslint:enable:no-function-expression */

