import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { RunVisualTest } from '../../visualtest/RunVisualTest';
import { IdType, ScreenEvent, EventLayer } from '../../visualtest/RunVisualTest';

declare var casper: Casper;

let componentIds = [];
let eventList = [ScreenEvent.DEFAULT, ScreenEvent.DOWN, ScreenEvent.HOVERED, ScreenEvent.DOUBLECLICK];
let component = new RunVisualTest('CommandButton', IdType.ID, EventLayer.SINGLE, eventList, null);
componentIds.push(component);

eventList = [ScreenEvent.DEFAULT, ScreenEvent.DOWN, ScreenEvent.HOVERED, ScreenEvent.DOUBLECLICK];
component = new RunVisualTest('CommandButtonDisabled', IdType.ID, EventLayer.SINGLE, eventList, null);
componentIds.push(component);



// /* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'commandButton').
  then(function () {
    componentIds.map(function (test) {
      test.runCasper();
    });
  });

casper.run(function () { casper.test.done(); });
// /* tslint:enable:no-function-expression */
