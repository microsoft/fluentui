import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { RunVisualTest } from '../../visualtest/RunVisualTest';
import { IdType, ScreenEvent, EventLayer } from '../../visualtest/RunVisualTest';

declare var casper: Casper;

let componentIds = [];
let pngEventList = [ScreenEvent.DEFAULT, ScreenEvent.DOWN, ScreenEvent.HOVERED, ScreenEvent.DOUBLECLICK];
componentIds.push(new RunVisualTest({
  componentId: 'ContextualButton',
  componentIdType: IdType.ID,
  eventType: EventLayer.SINGLE,
  eventList: pngEventList
}));

componentIds.push(new RunVisualTest({
  componentId: 'ContextualButtonDisabled',
  componentIdType: IdType.ID,
  eventType: EventLayer.SINGLE,
  eventList: pngEventList
}));

let pngEventList2 = [ScreenEvent.DEFAULT];
let childComponent = new RunVisualTest({
  componentId: 'ms-ContextualMenu-list',
  componentIdType: IdType.CLASSNAME,
  eventType: EventLayer.SINGLE,
  eventList: pngEventList2
});

let pngEventList3 = [ScreenEvent.CLICK];
componentIds.push(new RunVisualTest({
  componentId: 'ContextualButton',
  componentIdType: IdType.ID,
  eventType: EventLayer.DOUBLE,
  eventList: pngEventList3,
  secondLayer: childComponent,
}));

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

