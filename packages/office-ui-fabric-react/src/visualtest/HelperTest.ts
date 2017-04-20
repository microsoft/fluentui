import { Casper } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
import { RunVisualTest } from './RunVisualTest';
import { IdType, ScreenEvent, EventLayer } from './RunVisualTest';


declare var casper: Casper;

let componentIds = [];
let pngEventList = [ScreenEvent.DEFAULT, ScreenEvent.DOWN, ScreenEvent.HOVERED, ScreenEvent.DOUBLECLICK];

let comp = new RunVisualTest({
  componentId: 'DefaultButton',
  componentIdType: IdType.ID,
  eventType: EventLayer.SINGLE,
  eventList: pngEventList
});

let functionList = [comp.defaultScreenshotfn];



componentIds.push(new RunVisualTest({
  componentId: 'DefaultButton',
  componentIdType: IdType.ID,
  eventType: EventLayer.SINGLE,
  eventList: pngEventList
}));


componentIds.push(new RunVisualTest({
  componentId: 'DefaultButtonDisabled',
  componentIdType: IdType.ID,
  eventType: EventLayer.SINGLE,
  eventList: pngEventList
}));

// /* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'defaultButton').
  then(function () {
    console.log("in step");
    for (let i = 0; i < functionList.length; i++) {
      functionList[i]();
    }
  });

casper.run(function () { casper.test.done(); });
// /* tslint:enable:no-function-expression */
