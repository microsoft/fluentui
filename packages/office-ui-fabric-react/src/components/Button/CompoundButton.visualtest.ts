import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { RunVisualTest } from '../../visualtest/RunVisualTest';
import { IdType, ScreenEvent, EventLayer } from '../../visualtest/RunVisualTest';

declare var casper: Casper;

let componentIds = [];
let eventList = [ScreenEvent.DEFAULT, ScreenEvent.DOWN, ScreenEvent.HOVERED, ScreenEvent.DOUBLECLICK];

let component = new RunVisualTest('CompoundButton', IdType.ID, EventLayer.SINGLE, eventList, null);
componentIds.push(component);


component = new RunVisualTest('CompoundButtonDisabled', IdType.ID, EventLayer.SINGLE, eventList, null);
componentIds.push(component);

// /* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'compoundButton').
  then(function () {
    componentIds.map(function (test) {
      test.runCasper();
    });
  });

casper.run(function () { casper.test.done(); });
// /* tslint:enable:no-function-expression */